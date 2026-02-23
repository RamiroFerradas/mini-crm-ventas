"use client";

import { useEffect, useState } from "react";
import { useClientsStore } from "@/store/clients.store";
import { getClientById, getClientFromMock } from "@/services";
import type { Client } from "@/models";

export default function ClientPageClient({ id }: { id: string }) {
  const clientFromStore = useClientsStore((s) => s.byId[id]);
  const [remoteClient, setRemoteClient] = useState<Client | null>(null);

  useEffect(() => {
    if (clientFromStore) return;

    let cancelled = false;

    getClientById(id).then((apiClient) => {
      if (cancelled) return;

      if (apiClient) {
        setRemoteClient(apiClient);
      } else {
        setRemoteClient(getClientFromMock(id));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [id, clientFromStore]);

  const client = clientFromStore ?? remoteClient;

  if (!client) return null; 

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">{client.name}</h1>
      <p className="text-zinc-500">{client.email}</p>
      <div className="rounded border border-zinc-800 bg-zinc-900 p-4">
        <p className="text-sm text-zinc-400">
          Cliente creado el{" "}
          {new Date(client.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}