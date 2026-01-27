import { addSyncItem } from "./syncQueueRepo";
import type { SyncEntity, SyncAction } from "./indexedDb";

export async function enqueueAction(
  entity: SyncEntity,
  action: SyncAction,
  payload: unknown
) {
  await addSyncItem({
    id: crypto.randomUUID(),
    entity,
    action,
    payload,
    createdAt: new Date().toISOString(),
    attempts: 0,
  });
}
