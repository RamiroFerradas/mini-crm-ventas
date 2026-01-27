"use client";

import { useSyncStatusStore } from "@/store";
import clsx from "clsx";

export function SyncStatusIndicator() {
  const { online, syncing, pendingCount, lastError } = useSyncStatusStore();

  return (
    <div
      className={clsx(
        "flex items-center gap-2 text-xs px-3 py-1 rounded-md",
        "bg-zinc-100 text-zinc-800"
      )}
    >
      {!online && <span className="text-red-500">● Offline</span>}

      {online && syncing && (
        <span className="text-yellow-600 animate-pulse">Sincronizando…</span>
      )}

      {online && !syncing && pendingCount === 0 && (
        <span className="text-green-600">✓ Sincronizado</span>
      )}

      {pendingCount > 0 && (
        <span className="text-blue-600">
          {pendingCount} pendiente{pendingCount > 1 ? "s" : ""}
        </span>
      )}

      {lastError && <span className="text-red-600">⚠ Error</span>}
    </div>
  );
}
