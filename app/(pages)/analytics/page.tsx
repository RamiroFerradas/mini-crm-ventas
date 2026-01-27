"use client";

import { useClientsStore } from "@/store/clients.store";
import { useProductsStore } from "@/store/products.store";
import { useOpportunitiesStore } from "@/store/opportunities.store";
import { useShallow } from "zustand/react/shallow";
import { StatCard } from "@/components";

export default function AnalyticsPage() {
  const { clientIds } = useClientsStore(
    useShallow((s) => ({
      clientIds: s.allIds,
    })),
  );

  const { productIds } = useProductsStore(
    useShallow((s) => ({
      productIds: s.allIds,
    })),
  );

  const { oppIds, oppById } = useOpportunitiesStore(
    useShallow((s) => ({
      oppIds: s.allIds,
      oppById: s.byId,
    })),
  );

  const totalOpportunities = oppIds.length;

  const totalAmount = oppIds.reduce((sum, id) => {
    return sum + (oppById[id]?.totalAmount ?? 0);
  }, 0);

  const openCount = oppIds.filter(
    (id) => oppById[id]?.status === "open",
  ).length;

  const closedCount = totalOpportunities - openCount;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-zinc-100">Analytics</h1>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">Monto total en oportunidades</p>
        <p className="mt-2 text-4xl font-semibold text-zinc-100">
          ${totalAmount}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Clientes" value={clientIds.length} />
        <StatCard label="Productos" value={productIds.length} />
        <StatCard label="Oportunidades" value={totalOpportunities} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Oportunidades abiertas" value={openCount} />
        <StatCard label="Oportunidades cerradas" value={closedCount} />
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-400">
        <p className="mb-2 font-medium text-zinc-300">Próximamente</p>

        <ul className="ml-4 list-disc space-y-1">
          <li>Gráficos de evolución</li>
          <li>Embudo de ventas</li>
          <li>Facturación mensual</li>
          <li>Conversión por cliente</li>
        </ul>
      </div>
    </div>
  );
}
