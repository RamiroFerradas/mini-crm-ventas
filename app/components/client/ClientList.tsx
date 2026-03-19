"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useClientsStore } from "@/store/clients.store";
import { ClientForm } from "./ClientForm";

export function ClientList() {
  const { allIds, byId, deleteOne } = useClientsStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredIds = allIds.filter((id) => {
    const c = byId[id];
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <form
        role="search"
        aria-label="Buscar clientes"
        className="mb-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="search"
          name="q"
          autoComplete="off"
          placeholder="Buscar por nombre o email..."
          className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar clientes"
        />
      </form>
      <ul className="space-y-3">
        {filteredIds.length === 0 ? (
          <li className="text-zinc-500">No se encontraron clientes.</li>
        ) : (
          filteredIds.map((id) => {
            const c = byId[id];
            const avatarUrl =
              c.avatarUrl ??
              `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name)}`;

            return (
              <li
                key={id}
                className="flex items-start gap-4 rounded-md border border-zinc-800 bg-zinc-900 p-4"
              >
                <Image
                  src={avatarUrl}
                  alt={c.name}
                  width={40}
                  height={40}
                  className="rounded-full bg-zinc-800"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzQwJyBoZWlnaHQ9JzQwJyBmaWxsPSIjMzMzIi8+PC9zdmc+"
                  unoptimized
                />
                <div className="flex-1">
                  {editingId === id ? (
                    <ClientForm
                      clientId={id}
                      onFinish={() => setEditingId(null)}
                    />
                  ) : (
                    <>
                      <Link
                        href={`/clients/${id}`}
                        className="font-medium text-blue-400 hover:underline"
                      >
                        {c.name}
                      </Link>
                      <div className="text-sm text-zinc-400">{c.email}</div>
                      <div className="mt-2 flex gap-3">
                        <button
                          onClick={() => setEditingId(id)}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteOne(id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Eliminar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
