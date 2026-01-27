"use client";

import { useEffect } from "react";
import { useOpportunitiesStore } from "@/store/opportunities.store";
import { useShallow } from "zustand/react/shallow";
import { OpportunityForm } from "@/components";

export default function OpportunitiesPage() {
  const { hydrated, allIds, byId } = useOpportunitiesStore(
    useShallow((s) => ({
      hydrated: s.hydrated,
      allIds: s.allIds,
      byId: s.byId,
    })),
  );

  if (!hydrated) return <div>Cargando...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Oportunidades</h1>

      <OpportunityForm />

      <hr />

      {allIds.length === 0 ? (
        <p className="text-zinc-500">No hay oportunidades aún</p>
      ) : (
        <ul className="space-y-2">
          {allIds.map((id) => {
            const opp = byId[id];

            return (
              <li
                key={id}
                className="rounded-md border border-zinc-800 bg-zinc-900 p-3"
              >
                <div className="font-medium text-zinc-100">{opp.title}</div>
                <div className="text-sm text-zinc-400">
                  {opp.products.length} productos · ${opp.totalAmount}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
