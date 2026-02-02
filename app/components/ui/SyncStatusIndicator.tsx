"use client";

import { useSyncStatusStore } from "@/store";
import clsx from "clsx";

export function SyncStatusIndicator() {
  const { online, syncing, pendingCount, lastError } = useSyncStatusStore();

  return (
    <div
      className={clsx(
        "flex items-center gap-2 rounded-md border px-3 py-1 text-xs font-medium",
        !online && "border-red-300 bg-red-50 text-red-700",
        online && syncing && "border-yellow-300 bg-yellow-50 text-yellow-700",
        online &&
          !syncing &&
          pendingCount === 0 &&
          "border-green-300 bg-green-50 text-green-700",
        pendingCount > 0 && "border-blue-300 bg-blue-50 text-blue-700",
      )}
    >
      {/* OFFLINE */}
      {!online && <span>● Offline</span>}

      {/* SYNCING */}
      {online && syncing && (
        <span className="animate-pulse">Sincronizando…</span>
      )}

      {/* SYNCED */}
      {online && !syncing && pendingCount === 0 && <span>✓ Sincronizado</span>}

      {/* PENDING */}
      {pendingCount > 0 && !syncing && (
        <span>
          {pendingCount} pendiente{pendingCount > 1 ? "s" : ""}
        </span>
      )}

      {/* ERROR */}
      {lastError && (
        <span className="ml-1 font-normal opacity-80">⚠ Error</span>
      )}
    </div>
  );
}
