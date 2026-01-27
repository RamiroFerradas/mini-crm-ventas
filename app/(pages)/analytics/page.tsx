"use client";

import { useClientsStore } from "@/store/clients.store";
import { useProductsStore } from "@/store/products.store";
import { useOpportunitiesStore } from "@/store/opportunities.store";
import { useShallow } from "zustand/react/shallow";

export default function AnalyticsPage() {
  const { clientsIds } = useClientsStore(
    useShallow((s) => ({
      clientsIds: s.allIds,
    }))
  );

  const { productIds } = useProductsStore(
    useShallow((s) => ({
      productIds: s.allIds,
    }))
  );

  const { oppIds, oppById } = useOpportunitiesStore(
    useShallow((s) => ({
      oppIds: s.allIds,
      oppById: s.byId,
    }))
  );

  const totalOpportunities = oppIds.length;

  const totalAmount = oppIds.reduce((sum, id) => {
    const o = oppById[id];
    return sum + (o?.totalAmount ?? 0);
  }, 0);

  const openCount = oppIds.filter(
    (id) => oppById[id]?.status === "open"
  ).length;

  const closedCount = totalOpportunities - openCount;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Analytics</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Clientes" value={clientsIds.length} />
        <StatCard label="Productos" value={productIds.length} />
        <StatCard label="Oportunidades" value={totalOpportunities} />
        <StatCard label="Monto total" value={`$${totalAmount}`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Oportunidades abiertas" value={openCount} />
        <StatCard label="Oportunidades cerradas" value={closedCount} />
      </div>

      <div className="rounded border p-4 text-sm text-zinc-500">
        Próximamente:
        <ul className="list-disc ml-4 mt-2 space-y-1">
          <li>Gráficos de evolución</li>
          <li>Embudo de ventas</li>
          <li>Facturación mensual</li>
          <li>Conversión por cliente</li>
        </ul>
      </div>
    </div>
  );
}

/* ========================
   UI helpers
======================== */

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded border bg-white p-4">
      <div className="text-sm text-zinc-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}
