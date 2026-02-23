"use client";

import { useState } from "react";
import Image from "next/image";
import { useClientsStore } from "@/store/clients.store";
import { ClientForm } from "./ClientForm";
import Link from "next/link";

export function ClientList() {
  const { allIds, byId, deleteOne } = useClientsStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <ul className="space-y-3">
      {allIds.map((id) => {
        const c = byId[id];

        // avatar mock automático (no backend)
        const avatarUrl =
          c.avatarUrl ??
          `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
            c.name,
          )}`;

        return (
          <li
            key={id}
            className="flex items-start gap-4 rounded-md border border-zinc-800 bg-zinc-900 p-4"
          >
            {/* Avatar */}
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

            {/* Contenido */}
            <div className="flex-1">
              {editingId === id ? (
                <ClientForm clientId={id} onFinish={() => setEditingId(null)} />
              ) : (
                <>
                  <Link
                    href={`/clients/${id}`}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    {c.name}
                  </Link>{" "}
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
      })}
    </ul>
  );
}
