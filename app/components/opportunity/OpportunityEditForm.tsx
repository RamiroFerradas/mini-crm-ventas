"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useProductsStore } from "@/store/products.store";
import { useOpportunitiesStore } from "@/store/opportunities.store";
import { useShallow } from "zustand/react/shallow";

type Props = {
  id: string;
  initial: {
    title: string;
    products: {
      productId: string;
      quantity: number;
    }[];
  };
  onCancel: () => void;
};

export function OpportunityEditForm({ id, initial, onCancel }: Props) {
  const update = useOpportunitiesStore((s) => s.updatePartial);

  const products = useProductsStore(
    useShallow((s) => s.allIds.map((id) => s.byId[id]))
  );

  const { register, control, handleSubmit } = useForm({
    defaultValues: initial,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data: typeof initial) => {
    update(id, data);
    onCancel();
  };

  return (
    <form className="mt-4 space-y-3 rounded-md border border-zinc-700 bg-zinc-800 p-4"
          onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", { required: true })}
        className="w-full rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-zinc-100"
      />

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <select
            {...register(`products.${index}.productId`)}
            className="flex-1 rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-zinc-100"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            {...register(`products.${index}.quantity`, { valueAsNumber: true })}
            className="w-20 rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-zinc-100"
          />

          <button type="button" onClick={() => remove(index)} className="text-red-400">
            ✕
          </button>
        </div>
      ))}

      <div className="flex justify-between">
        <button type="button" onClick={onCancel} className="text-sm text-zinc-400">
          Cancelar
        </button>
        <button type="submit" className="rounded bg-blue-600 px-3 py-1 text-sm text-white">
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
