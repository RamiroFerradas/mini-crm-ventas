import { fakeApi } from "@/lib";
import { getSocket } from "@/lib/socket";
import { useSyncStatusStore } from "@/store";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type EntityStoreState<T, CreateInput> = {
  byId: Record<string, T>;
  allIds: string[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addOne: (input: CreateInput) => void;
  updateOne: (item: T) => void;
  updatePartial: (id: string, patch: Partial<T>) => void;
  deleteOne: (id: string) => void;
  applyRemote: (item: T) => void;
};

export type CreateEntityStoreOptions<T, CreateInput, Ctx> = {
  entity: string;
  load: () => Promise<T[]>;
  save: (items: T[]) => Promise<void>;
  getContext: () => Ctx | null;
  create: (input: CreateInput, ctx: Ctx) => T;
};
export function createEntityStore<T extends { id: string }, CreateInput, Ctx>(
  options: CreateEntityStoreOptions<T, CreateInput, Ctx>,
) {
  let hydrating = false;

  return create<EntityStoreState<T, CreateInput>>()(
    subscribeWithSelector((set, get) => ({
      byId: {},
      allIds: [],
      hydrated: false,

      async hydrate() {
        if (get().hydrated || hydrating) return;
        if (typeof window === "undefined") return;

        hydrating = true;

        try {
          const items = await options.load();

          // Merge: DB aporta persistencia, memoria (socket) aporta frescura.
          // Items que ya están en memoria conservan la versión en memoria (más reciente).
          const current = get();
          const mergedById: Record<string, T> = {};
          const mergedAllIds: string[] = [];

          // Primero los items de la DB
          for (const item of items) {
            mergedById[item.id] = current.byId[item.id] ?? item;
            mergedAllIds.push(item.id);
          }

          // Luego los items que sólo están en memoria (llegaron por socket antes de hydrate)
          for (const id of current.allIds) {
            if (!mergedById[id]) {
              mergedById[id] = current.byId[id];
              mergedAllIds.push(id);
            }
          }

          set({
            byId: mergedById,
            allIds: mergedAllIds,
            hydrated: true,
          });
        } finally {
          hydrating = false;
        }
      },

      addOne(input) {
        const ctx = options.getContext();
        const entity = options.create(input, ctx!);

        const prevState = get();

        set({
          byId: { ...prevState.byId, [entity.id]: entity },
          allIds: [...prevState.allIds, entity.id],
        });

        const commit = async () => {
          try {
            await fakeApi(entity, useSyncStatusStore.getState().apiMode);

            getSocket().emit("opportunity:update", {
              id: entity.id,
              data: entity,
            });

            await options.save(Object.values(get().byId));
          } catch (err) {
            console.error("Rollback addOne:", err);

            set(prevState);
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("optimistic:rollback", {
                  detail: { type: "add", entity },
                }),
              );
            }
          }
        };

        void commit();
      },

      updateOne(item) {
        const { byId } = get();
        if (!byId[item.id]) return;

        set({
          byId: { ...byId, [item.id]: item },
        });

        void options.save(Object.values(get().byId));
      },

      deleteOne(id) {
        const prevState = get();
        if (!prevState.byId[id]) return;

        const next = { ...prevState.byId };
        delete next[id];

        set({
          byId: next,
          allIds: prevState.allIds.filter((x) => x !== id),
        });

        const commit = async () => {
          try {
            await fakeApi(id, useSyncStatusStore.getState().apiMode);

            await options.save(Object.values(next));
          } catch (err) {
            console.error("Rollback deleteOne:", err);

            set(prevState);
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("optimistic:rollback", {
                  detail: { type: "delete", id },
                }),
              );
            }
          }
        };

        void commit();
      },

      applyRemote(item) {
        const { byId, allIds } = get();
        const isNew = !byId[item.id];

        set({
          byId: { ...byId, [item.id]: item },
          allIds: isNew ? [...allIds, item.id] : allIds,
        });

        void options.save(Object.values(get().byId));
      },

      updatePartial(id, patch) {
        const { byId } = get();
        const current = byId[id];
        if (!current) return;

        const prev = current;

        const updated = {
          ...current,
          ...patch,
          updatedAt: new Date().toISOString(),
        };

        set({
          byId: { ...byId, [id]: updated },
        });

        const commit = async () => {
          try {
            await fakeApi(updated, useSyncStatusStore.getState().apiMode);

            getSocket().emit("opportunity:update", {
              id,
              data: updated,
            });

            await options.save(Object.values(get().byId));
          } catch (err) {
            console.error("Rollback updatePartial:", err);

            set({
              byId: { ...get().byId, [id]: prev },
            });
            if (typeof window !== "undefined") {
              window.dispatchEvent(
                new CustomEvent("optimistic:rollback", {
                  detail: { type: "update", id, prev },
                }),
              );
            }
          }
        };

        void commit();
      },
    })),
  );
}
