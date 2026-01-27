"use client";

import { useEffect } from "react";
import { useClientsStore } from "@/store/clients.store";
import { useShallow } from "zustand/react/shallow";
import { ClientList } from "@/components/client/ClientList";
import { ClientForm } from "@/components/client/ClientForm";

export default function ClientsPage() {
  const { hydrated, hydrate } = useClientsStore(
    useShallow((s) => ({
      hydrated: s.hydrated,
      hydrate: s.hydrate,
    })),
  );

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrated, hydrate]);

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
