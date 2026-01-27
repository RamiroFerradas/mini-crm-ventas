"use client";

import { useClientsStore } from "@/store/clients.store";
import { useOpportunitiesStore } from "@/store/opportunities.store";
import { useShallow } from "zustand/react/shallow";

export default function Dashboard() {
  const clientsCount = useClientsStore((s) => s.allIds.length);

  const { opportunitiesCount, totalRevenue } = useOpportunitiesStore(
    useShallow((s) => {
      const opportunities = s.allIds.map((id) => s.byId[id]);

      return {
        opportunitiesCount: opportunities.length,
        totalRevenue: opportunities
          .filter((o) => o.status === "won")
          .reduce((sum, o) => sum + o.totalAmount, 0),
      };
    }),
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-100">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">Clientes</p>
          <p className="text-2xl font-semibold text-zinc-100">{clientsCount}</p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">Oportunidades</p>
          <p className="text-2xl font-semibold text-zinc-100">
            {opportunitiesCount}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">Ingresos</p>
          <p className="text-2xl font-semibold text-zinc-100">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
