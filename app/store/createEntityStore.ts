import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";


export type EntityStoreState<T, CreateInput> = {
  byId: Record<string, T>;
  allIds: string[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addOne: (input: CreateInput) => void;
  updateOne: (item: T) => void;
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
  return create<EntityStoreState<T, CreateInput>>()(
    subscribeWithSelector((set, get) => ({
      byId: {},
      allIds: [],
      hydrated: false,

      async hydrate() {
        if (get().hydrated) return;
        if (typeof window === "undefined") return;

        const items = await options.load();

        const byId: Record<string, T> = {};
        const allIds: string[] = [];

        for (const item of items) {
          byId[item.id] = item;
          allIds.push(item.id);
        }

        set({
          byId,
          allIds,
          hydrated: true,
        });
      },

      addOne(input) {
        const ctx = options.getContext();
        const entity = options.create(input, ctx!);

        const { byId, allIds } = get();
        if (byId[entity.id]) return;

        set({
          byId: { ...byId, [entity.id]: entity },
          allIds: [...allIds, entity.id],
        });

        void options.save(Object.values(get().byId));
      },

      updateOne(item) {
        const { byId } = get();
        if (!byId[item.id]) return;

        set({
          byId: { ...byId, [item.id]: item },
        });

        void options.save(Object.values(get().byId));
      },
    })),
  );
}
