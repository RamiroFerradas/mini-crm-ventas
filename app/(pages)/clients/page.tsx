"use client";

import { useClientsStore } from "@/store/clients.store";
import { useShallow } from "zustand/react/shallow";
import { ClientList } from "@/components/client/ClientList";
import { ClientForm } from "@/components/client/ClientForm";

export default function ClientsPage() {
  const { hydrated } = useClientsStore(
    useShallow((s) => ({
      hydrated: s.hydrated,
    })),
  );

  if (!hydrated) {
    return <div className="p-6">Cargando clientes...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-zinc-100">Clientes</h1>

      <ClientForm />
      <ClientList />
    </div>
  );
}
