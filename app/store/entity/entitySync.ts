import { addSyncItem } from "@/db/syncQueueRepo";
import { fakeApi } from "@/lib";
import { getSocket } from "@/lib/socket";
import { useSyncStatusStore } from "@/store";
import { SyncAction, SyncEntity } from "@/db";

type EntityWithId = { id: string };

export async function syncCreate<T extends EntityWithId>(
  entityName: string,
  entity: T,
) {
  if (!navigator.onLine) {
    await enqueue(entityName, "create", entity);
    return;
  }

  try {
    await fakeApi(entity, useSyncStatusStore.getState().apiMode);

    getSocket().emit("opportunity:update", {
      id: entity.id,
      data: entity,
    });
  } catch (err) {
    await enqueue(entityName, "create", entity, err);
    throw err;
  }
}

export async function syncUpdate<T extends EntityWithId>(
  entityName: string,
  entity: T,
) {
  if (!navigator.onLine) {
    await enqueue(entityName, "update", entity);
    return;
  }

  try {
    await fakeApi(entity, useSyncStatusStore.getState().apiMode);

    getSocket().emit("opportunity:update", {
      id: entity.id,
      data: entity,
    });
  } catch (err) {
    await enqueue(entityName, "update", entity, err);
    throw err;
  }
}

async function enqueue<T extends EntityWithId>(
  entity: string,
  action: SyncAction,
  payload: T,
  err?: unknown,
) {
  await addSyncItem({
    id: crypto.randomUUID(),
    entity: entity as SyncEntity,
    action,
    payload,
    attempts: 1,
    createdAt: Date.now().toString(),
    lastError: err ? String(err) : undefined,
  });
}
