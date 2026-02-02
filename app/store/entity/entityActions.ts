import { syncCreate, syncUpdate } from "./entitySync";
import { EntityStoreShape } from "./entityTypes";



type SetState<S> = (partial: Partial<S> | ((state: S) => Partial<S>)) => void;

type GetState<S> = () => S;

export function createEntityActions<T extends { id: string }>(
  entityName: string,
  set: SetState<EntityStoreShape<T>>,
  get: GetState<EntityStoreShape<T>>,
  save: (items: T[]) => Promise<void>,
) {
  return {
    async add(entity: T) {
      const prev = get();
      set({
        byId: { ...prev.byId, [entity.id]: entity },
        allIds: [...prev.allIds, entity.id],
      });

      try {
        await syncCreate(entityName, entity);
        await save(Object.values(get().byId));
      } catch {
        set(prev);
      }
    },

    async update(id: string, patch: Partial<T>) {
      const prev = get();
      const current = prev.byId[id];
      if (!current) return;

      const updated = { ...current, ...patch };

      set({
        byId: { ...prev.byId, [id]: updated },
      });

      try {
        await syncUpdate(entityName, updated);
        await save(Object.values(get().byId));
      } catch {
        set(prev);
      }
    },
  };
}
