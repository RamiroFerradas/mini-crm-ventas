"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useProductsStore } from "@/store/products.store";
import { useOpportunitiesStore } from "@/store/opportunities.store";
import { useShallow } from "zustand/react/shallow";
import { useClientsStore } from "@/store/clients.store";

type OpportunityFormValues = {
  title: string;
  clientId: string;
  products: {
    productId: string;
    quantity: number;
    durationMonths?: number;
  }[];
  requiresManagerApproval?: boolean;
};

const APPROVAL_THRESHOLD = 10000;

export function OpportunityForm() {
  const addOpportunity = useOpportunitiesStore((s) => s.addOne);

  const clients = useClientsStore(
    useShallow((s) => s.allIds.map((id) => s.byId[id])),
  );

  const products = useProductsStore(
    useShallow((s) => s.allIds.map((id) => s.byId[id])),
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<OpportunityFormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      clientId: "",
      products: [],
      requiresManagerApproval: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = watch("products");
  const watchedApproval = watch("requiresManagerApproval");

  const totalAmount = watchedProducts.reduce((sum, p) => {
    const product = products.find((prod) => prod.id === p.productId);
    if (!product) return sum;

    const base = product.price * p.quantity;

    if (product.type === "membership") {
      return sum + base * (p.durationMonths ?? 1);
    }

    return sum + base;
  }, 0);

  const needsApproval = totalAmount > APPROVAL_THRESHOLD;

  /* =========================
     SUBMIT
  ========================= */

  const onSubmit = (data: OpportunityFormValues) => {
    if (data.products.length === 0) return;
    addOpportunity(data);
    reset();
  };

  const canSubmit =
    isValid &&
    fields.length > 0 &&
    clients.length > 0 &&
    products.length > 0 &&
    (!needsApproval || watchedApproval);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-lg border border-zinc-800 bg-zinc-900 p-5"
    >
      <h2 className="text-lg font-semibold text-zinc-100">Nueva oportunidad</h2>

      <input
        {...register("title", { required: true })}
        placeholder="Título de la oportunidad"
        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600"
      />

      <select
        {...register("clientId", { required: true })}
        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 focus:ring-2 focus:ring-blue-600"
      >
        <option value="">Seleccionar cliente</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-zinc-200">Productos</span>
          <button
            type="button"
            onClick={() => append({ productId: "", quantity: 1 })}
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            + Agregar producto
          </button>
        </div>

        {fields.map((field, index) => {
          const selectedProduct = products.find(
            (p) => p.id === watch(`products.${index}.productId`),
          );

          return (
            <div
              key={field.id}
              className="flex gap-2 rounded-md border border-zinc-800 bg-zinc-850 p-2"
            >
              <select
                {...register(`products.${index}.productId`, {
                  required: true,
                })}
                className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-100"
              >
                <option value="">Producto</option>
                {products.map((p) => (
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
                className="w-24 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-100"
              />

              {selectedProduct?.type === "membership" && (
                <input
                  type="number"
                  min={1}
                  placeholder="Meses"
                  {...register(`products.${index}.durationMonths`, {
                    required: true,
                    min: 1,
                  })}
                  className="w-28 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-100"
                />
              )}

              <button
                type="button"
                onClick={() => remove(index)}
                className="px-2 text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-sm text-zinc-300">
        Total: <span className="font-medium">${totalAmount}</span>
      </div>

      {/* Aprobación gerente */}
      {needsApproval && (
        <label className="flex items-center gap-2 text-sm text-zinc-200">
          <input
            type="checkbox"
            {...register("requiresManagerApproval", { required: true })}
            className="accent-blue-600"
          />
          Requiere aprobación del gerente
        </label>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white disabled:bg-zinc-700 hover:bg-blue-500"
      >
        Crear oportunidad
      </button>
    </form>
  );
}
