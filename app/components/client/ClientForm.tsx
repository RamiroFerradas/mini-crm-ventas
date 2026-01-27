"use client";

import { useForm } from "react-hook-form";
import { useClientsStore } from "@/store/clients.store";

type ClientFormValues = {
  name: string;
  email: string;
};

export function ClientForm() {
  const addClient = useClientsStore((s) => s.addOne);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormValues>({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: ClientFormValues) => {
    addClient({
      name: data.name,
      email: data.email,
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-start">
      <div className="flex flex-col">
        <input
          {...register("name", { required: "Nombre requerido" })}
          placeholder="Nombre"
          className="border px-2 py-1 rounded"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <input
          {...register("email", {
            required: "Email requerido",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email inválido",
            },
          })}
          placeholder="Email"
          className="border px-2 py-1 rounded"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}
      </div>

      <button type="submit" className="bg-black text-white px-3 py-1 rounded">
        Agregar
      </button>
    </form>
  );
}
