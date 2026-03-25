import { useSyncStatusStore } from "@/store";
import {
  getPendingSyncItems,
  removeSyncItem,
  updateSyncItem,
} from "./syncQueueRepo";
import { fakeApi } from "@/lib";

export async function processSyncQueue() {
  const { setSyncing, setError, setPendingCount, apiMode } =
    useSyncStatusStore.getState();

  setSyncing(true);
  setError(undefined);

  try {
    const items = await getPendingSyncItems();
    setPendingCount(items.length);

    for (const item of items) {
      try {
        await fakeApi(item.payload, apiMode);
        await removeSyncItem(item.id);
      } catch (err) {
        await updateSyncItem({
          ...item,
          attempts: item.attempts + 1,
          lastError: String(err),
        });

        setError(String(err));
        break;
      }
    }
  } finally {
    const remaining = await getPendingSyncItems();
    setPendingCount(remaining.length);
    setSyncing(false);
  }
}
