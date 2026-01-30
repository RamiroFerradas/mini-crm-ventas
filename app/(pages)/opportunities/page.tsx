"use client";

import { useEffect, useState } from "react";
import { useOpportunitiesStore } from "@/store/opportunities.store";
import { useShallow } from "zustand/react/shallow";
import {
  OpportunityForm,
  OpportunityStatusActions,
  OpportunityStatusBadge,
} from "@/components";
import { OpportunityEditForm } from "@/components/opportunity/OpportunityEditForm";

export default function OpportunitiesPage() {
  const { hydrated, hydrate, allIds, byId } = useOpportunitiesStore(
    useShallow((s) => ({
      hydrated: s.hydrated,
      hydrate: s.hydrate,
      allIds: s.allIds,
      byId: s.byId,
    })),
  );

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  if (!hydrated) return <div>Cargando...</div>;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-zinc-100">Oportunidades</h1>

      <OpportunityForm />

      <hr className="border-zinc-800" />

      {allIds.length === 0 ? (
        <p className="text-zinc-500">No hay oportunidades aún</p>
      ) : (
        <ul className="space-y-2">
          {allIds.map((id) => {
            const opp = byId[id];
            const isEditing = editingId === id;

            return (
              <li
                key={id}
                className="rounded-md border border-zinc-800 bg-zinc-900 p-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-zinc-100">{opp.title}</div>
                    <div className="text-sm text-zinc-400">
                      {opp.products.length} productos · ${opp.totalAmount}
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <OpportunityStatusBadge status={opp.status} />
                    <button
                      onClick={() => setEditingId(id)}
                      className="text-xs text-blue-400 hover:underline"
                    >
                      Editar
                    </button>
                  </div>
                </div>

                <OpportunityStatusActions id={id} status={opp.status} />

                {isEditing && (
                  <OpportunityEditForm
                    id={id}
                    initial={{
                      title: opp.title,
                      products: opp.products.map((p) => ({
                        productId: p.productId,
                        quantity: p.quantity,
                      })),
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
