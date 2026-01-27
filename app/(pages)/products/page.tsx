"use client";

import { useProductsStore } from "@/store/products.store";
import { useShallow } from "zustand/react/shallow";
import { ProductForm } from "@/components/product";

export default function ProductsPage() {
  const { hydrated, allIds, byId } = useProductsStore(
    useShallow((s) => ({
      hydrated: s.hydrated,
      allIds: s.allIds,
      byId: s.byId,
    })),
  );

  if (!hydrated) {
    return <div>Cargando productos...</div>;
  }

  const products = allIds.map((id) => byId[id]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-xl font-semibold">Productos</h1>

      <ProductForm />

      {products.length === 0 ? (
        <p className="text-zinc-500">No hay productos cargados</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p.id}
              className="rounded-md border border-zinc-800 bg-zinc-900 p-3"
            >
              <div className="font-medium text-zinc-100">{p.name}</div>
              <div className="text-sm text-zinc-400">${p.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
