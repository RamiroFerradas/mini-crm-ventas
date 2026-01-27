"use client";

import { useClientsStore } from "@/store/clients.store";

export function ClientList() {
  const { byId, allIds } = useClientsStore();

  if (allIds.length === 0) {
    return <p className="text-sm text-zinc-500">No hay clientes.</p>;
  }

  return (
    <ul className="space-y-2">
      {allIds.map((id) => {
        const client = byId[id];

        return (
          <li key={id} className="border rounded p-3 bg-white shadow-sm">
            <strong>{client.name}</strong>
            <div className="text-sm text-zinc-500">{client.email}</div>
          </li>
        );
      })}
    </ul>
  );
}
