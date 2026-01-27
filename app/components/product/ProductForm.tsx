"use client";

import { useForm } from "react-hook-form";
import { useProductsStore } from "@/store/products.store";

type ProductFormValues = {
  name: string;
  price: number;
  type: "service" | "physical" | "membership";
};

export function ProductForm() {
  const addProduct = useProductsStore((s) => s.addOne);

  const { register, handleSubmit, reset } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      price: 0,
      type: "service",
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    addProduct(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        rounded-lg border border-zinc-800
        bg-zinc-900/60
        p-6 space-y-4
      "
    >
      <h2 className="text-lg font-semibold text-zinc-100">
        Nuevo producto
      </h2>

      <input
        {...register("name", { required: true })}
        placeholder="Nombre del producto"
        className="
          w-full rounded-md
          bg-zinc-800 border border-zinc-700
          px-3 py-2 text-sm text-zinc-100
          placeholder:text-zinc-400
          focus:outline-none focus:ring-2 focus:ring-blue-600
        "
      />

      <input
        type="number"
        {...register("price", { valueAsNumber: true, min: 0 })}
        placeholder="Precio"
        className="
          w-full rounded-md
          bg-zinc-800 border border-zinc-700
          px-3 py-2 text-sm text-zinc-100
          placeholder:text-zinc-400
          focus:outline-none focus:ring-2 focus:ring-blue-600
        "
      />

      <select
        {...register("type")}
        className="
          w-full rounded-md
          bg-zinc-800 border border-zinc-700
          px-3 py-2 text-sm text-zinc-100
          focus:outline-none focus:ring-2 focus:ring-blue-600
        "
      >
        <option value="service">Servicio</option>
        <option value="physical">Producto físico</option>
        <option value="membership">Membresía</option>
      </select>

      <div className="pt-2">
        <button
          type="submit"
          className="
            inline-flex items-center
            rounded-md bg-blue-600 px-4 py-2
            text-sm font-medium text-white
            hover:bg-blue-500
            disabled:opacity-50
          "
        >
          Crear producto
        </button>
      </div>
    </form>
  );
}
