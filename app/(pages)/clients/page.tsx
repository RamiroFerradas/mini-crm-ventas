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
    return <div>Cargando clientes...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Clientes</h1>
      <ClientForm />
      <ClientList />
    </div>
  );
}
