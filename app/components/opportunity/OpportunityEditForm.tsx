"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useProductsStore } from "@/store/products.store";
import { useOpportunitiesStore } from "@/store/opportunities.store";
import { useShallow } from "zustand/react/shallow";

type ProductLine = {
  productId: string;
  quantity: number;
  durationMonths?: number;
};

type Props = {
  id: string;
  initial: {
    title: string;
    products: ProductLine[];
  };
  onCancel: () => void;
};

export function OpportunityEditForm({ id, initial, onCancel }: Props) {
  const update = useOpportunitiesStore((s) => s.updatePartial);

  const productsCatalog = useProductsStore(
    useShallow((s) => s.allIds.map((id) => s.byId[id])),
  ); // Product[]

  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: initial,
  });

  const { fields, remove } = useFieldArray({
    control,
    name: "products",
  });
  const productsById = useProductsStore.getState().byId;

  const onSubmit = (data: typeof initial) => {
    const enrichedProducts = data.products.map((p) => {
      const product = productsById[p.productId];
      if (!product) {
        throw new Error("Producto no encontrado");
      }

      return {
        productId: p.productId,
        quantity: p.quantity,
        durationMonths: p.durationMonths,
        price: product.price,
      };
    });

    const totalAmount = enrichedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );

    update(id, {
      title: data.title,
      products: enrichedProducts,
      totalAmount,
    });

    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 space-y-3 rounded-md border border-zinc-700 bg-zinc-800 p-4"
    >
      {/* Título */}
      <input
        {...register("title", { required: true })}
        className="w-full rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-zinc-100"
      />

      {/* Productos */}
      {fields.map((field, index) => {
        const selectedProduct = productsCatalog.find(
          (p) => p.id === watch(`products.${index}.productId`),
        );

        return (
          <div key={field.id} className="flex gap-2 items-center">
            <select
              {...register(`products.${index}.productId`, { required: true })}
              className="flex-1 rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-zinc-100"
            >
              {productsCatalog.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              min={1}
              {...register(`products.${index}.quantity`, {
                valueAsNumber: true,
                min: 1,
              })}
              className="w-20 rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-zinc-100"
            />

            {/* Membresía → duración */}
            {selectedProduct?.type === "membership" && (
              <input
                type="number"
                min={1}
                placeholder="Meses"
                {...register(`products.${index}.durationMonths`, {
                  required: true,
                  min: 1,
                })}
                className="w-24 rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-zinc-100"
              />
            )}

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-400"
            >
              ✕
            </button>
          </div>
        );
      })}

      {/* Acciones */}
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-zinc-400"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
