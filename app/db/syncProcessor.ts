import { sendToApi } from "@/services";
import { useSyncStatusStore } from "@/store";
import {
  getPendingSyncItems,
  removeSyncItem,
  updateSyncItem,
} from "./syncQueueRepo";

export async function processSyncQueue() {
  const { setSyncing, setError, setPendingCount } =
    useSyncStatusStore.getState();

  setSyncing(true);

  try {
    const items = await getPendingSyncItems();
    setPendingCount(items.length);

    for (const item of items) {
      try {
        await sendToApi(item.entity, item.action, item.payload);
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
