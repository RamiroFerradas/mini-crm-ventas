"use client";

import { useOpportunitiesStore } from "@/store/opportunities.store";

export function OpportunityStatusActions({
  id,
  status,
}: {
  id: string;
  status: "open" | "won" | "lost";
}) {
  const update = useOpportunitiesStore((s) => s.updatePartial);

  if (status === "open") {
    return (
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => update(id, { status: "won" })}
          className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-500"
        >
          Marcar como ganada
        </button>

        <button
          onClick={() => update(id, { status: "lost" })}
          className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-500"
        >
          Marcar como perdida
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => update(id, { status: "open" })}
        className="px-3 py-1 text-xs rounded bg-zinc-700 text-white hover:bg-zinc-600"
      >
        Reabrir oportunidad
      </button>
    </div>
  );
}
