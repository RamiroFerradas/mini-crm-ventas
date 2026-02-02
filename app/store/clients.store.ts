import { loadClientsFromDb, saveClientsToDb } from "@/db/persistence";
import type { Client } from "@/models";
import { createEntityStore } from "./entity";

type ClientInput = {
  name: string;
  email: string;
};

type ClientsContext = undefined;

export const useClientsStore = createEntityStore<
  Client,
  ClientInput,
  ClientsContext
>({
  entity: "client",
  load: loadClientsFromDb,
  save: saveClientsToDb,

  getContext: () => undefined,

  create: (input: ClientInput) => ({
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    status: "active",
    createdAt: new Date().toISOString(),
  }),
});
