"use client";

import { useOpportunitiesStore } from "@/store/opportunities.store";

export function OpportunityList() {
  const { byId, allIds } = useOpportunitiesStore();

  if (allIds.length === 0) {
    return <div className="text-gray-500">No hay oportunidades creadas.</div>;
  }

  return (
    <div className="grid gap-3">
      {allIds.map((id) => {
        const opp = byId[id];

        return (
          <div key={id} className="rounded border p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{opp.title}</h3>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  opp.status === "open"
                    ? "bg-blue-100 text-blue-700"
                    : opp.status === "won"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {opp.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 mt-1">
              Total: ${opp.totalAmount.toLocaleString()}
            </div>

            {opp.requiresApproval && (
              <div className="mt-1 text-xs text-orange-600">
                Requiere aprobación
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
