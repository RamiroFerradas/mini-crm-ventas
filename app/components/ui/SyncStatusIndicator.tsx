"use client";

import { useSyncStatusStore } from "@/store";
import clsx from "clsx";

export function SyncStatusIndicator() {
  const { online, syncing, pendingCount, lastError, apiMode, setApiMode } =
    useSyncStatusStore();

  return (
    <div className="flex items-center gap-2">
      <label className="text-[11px] font-medium uppercase tracking-wide text-zinc-300">
        API
      </label>
      <select
        value={apiMode}
        onChange={(e) => setApiMode(e.target.value as typeof apiMode)}
        className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-100"
        aria-label="Modo de API fake"
      >
        <option value="random">Random</option>
        <option value="success">Success</option>
        <option value="fail">Fail</option>
      </select>

      <div
        aria-live="polite"
        aria-atomic="true"
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
        {!online && <span><span aria-hidden="true">● </span>Offline</span>}
        {online && syncing && (
          <span className="animate-pulse">Sincronizando…</span>
        )}
        {online && !syncing && pendingCount === 0 && (
          <span><span aria-hidden="true">✓ </span>Sincronizado</span>
        )}
        {pendingCount > 0 && !syncing && (
          <span>
            {pendingCount} pendiente{pendingCount > 1 ? "s" : ""}
          </span>
        )}
        {lastError && (
          <span className="ml-1 font-normal opacity-80"><span aria-hidden="true">⚠ </span>Error</span>
        )}
      </div>
    </div>
  );
}