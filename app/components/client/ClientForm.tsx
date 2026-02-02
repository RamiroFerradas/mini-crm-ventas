"use client";

import { useForm } from "react-hook-form";
import { useClientsStore } from "@/store/clients.store";

type ClientFormValues = {
  name: string;
  email: string;
};

type Props = {
  clientId?: string;
  onFinish?: () => void;
};

export function ClientForm({ clientId, onFinish }: Props) {
  const { addOne, updatePartial, byId } = useClientsStore();

  const client = clientId ? byId[clientId] : undefined;

  const { register, handleSubmit, reset } = useForm<ClientFormValues>({
    defaultValues: {
      name: client?.name ?? "",
      email: client?.email ?? "",
    },
  });

  const onSubmit = (data: ClientFormValues) => {
    if (client) {
      updatePartial(client.id, data);
    } else {
      addOne(data);
    }

    reset();
    onFinish?.();
  };

  return (
    <form
      className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("name", { required: true })}
        placeholder="Nombre"
        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
      />

      <input
        {...register("email", { required: true })}
        placeholder="Email"
        className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
      />

      <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
        {client ? "Guardar cambios" : "Crear cliente"}
      </button>
    </form>
  );
}
