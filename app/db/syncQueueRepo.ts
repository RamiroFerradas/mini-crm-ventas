import { db, type SyncQueueItem } from "./indexedDb";

export async function addSyncItem(item: SyncQueueItem) {
  await db.syncQueue.put(item);
}

export async function getPendingSyncItems(): Promise<SyncQueueItem[]> {
  return db.syncQueue.toArray();
}

export async function removeSyncItem(id: string) {
  await db.syncQueue.delete(id);
}

export async function updateSyncItem(item: SyncQueueItem) {
  await db.syncQueue.put(item);
}
