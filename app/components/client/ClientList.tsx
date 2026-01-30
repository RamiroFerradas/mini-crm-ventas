"use client";

import { useState } from "react";
import { useClientsStore } from "@/store/clients.store";
import { ClientForm } from "./ClientForm";

export function ClientList() {
  const { allIds, byId, deleteOne } = useClientsStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <ul className="space-y-3">
      {allIds.map((id) => {
        const c = byId[id];

        return (
          <li
            key={id}
            className="rounded-md border border-zinc-800 bg-zinc-900 p-4"
          >
            {editingId === id ? (
              <ClientForm clientId={id} onFinish={() => setEditingId(null)} />
            ) : (
              <>
                <div className="font-medium text-zinc-100">{c.name}</div>
                <div className="text-sm text-zinc-400">{c.email}</div>

                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setEditingId(id)}
                    className="text-sm text-blue-500 cursor-pointer"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deleteOne(id)}
                    className="text-sm text-red-500 cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
