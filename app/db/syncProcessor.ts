import { sendToApi } from "@/services";
import { useSyncStatusStore } from "@/store";
import {
  getPendingSyncItems,
  removeSyncItem,
  updateSyncItem,
} from "./syncQueueRepo";
import { fakeApi } from "@/lib";

export async function processSyncQueue() {
  const { setSyncing, setError, setPendingCount } =
    useSyncStatusStore.getState();

  setSyncing(true);
  setError(undefined); // limpiamos al arrancar

  try {
    const items = await getPendingSyncItems();
    setPendingCount(items.length);

    for (const item of items) {
      try {
        await fakeApi(item.payload, "fail"); // 👈 forzado para test
        await removeSyncItem(item.id);
      } catch (err) {
        await updateSyncItem({
          ...item,
          attempts: item.attempts + 1,
          lastError: String(err),
        });

        setError(String(err));
        break; // 👈 cortamos, queda en error
      }
    }
  } finally {
    const remaining = await getPendingSyncItems();
    setPendingCount(remaining.length);
    setSyncing(false);
  }
}
