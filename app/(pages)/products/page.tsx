"use client";

import { useEffect } from "react";
import { useProductsStore } from "@/store/products.store";
import { useShallow } from "zustand/react/shallow";
import { ProductForm } from "@/components/product";

export default function ProductsPage() {
  const { hydrated, hydrate, allIds, byId } = useProductsStore(
    useShallow((s) => ({
      hydrated: s.hydrated,
      hydrate: s.hydrate,
      allIds: s.allIds,
      byId: s.byId,
    })),
  );

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrated, hydrate]);

  if (!hydrated) return <div>Cargando productos...</div>;

  const products = allIds.map((id) => byId[id]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {" "}
      <h1 className="text-xl font-semibold">Productos</h1>
      <ProductForm />
      {products.length === 0 ? (
        <p className="text-zinc-500">No hay productos cargados</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="border rounded p-3">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-zinc-500">${p.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
