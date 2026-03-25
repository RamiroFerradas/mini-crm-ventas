import type { Client } from "@/models";

type SeedServerLike = {
  create: (model: "client", data: Client) => void;
};

export const CLIENTS_SEED: Client[] = [
  {
    id: "1",
    name: "Acme Corp",
    email: "ventas@acme.com",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Globex",
    email: "contacto@globex.com",
    status: "active",
    createdAt: new Date().toISOString(),
  },
];

export function seeds(server: SeedServerLike) {
  CLIENTS_SEED.forEach((c) => {
    server.create("client", c);
  });
}
