import { Client } from "@/models";
import { apiClient } from "../apiClient";
import { CLIENTS_SEED } from "@/lib/mirage/seeds";
import { loadClientsFromDb } from "@/db";

export async function getClientById(id: string): Promise<Client | null> {
  // 1. Prioridad: DB local (IndexedDB)
  const localClients = await loadClientsFromDb();
  const local = localClients.find((c) => c.id === id);
  if (local) return local;

  // 2. Luego: API mock (Mirage)
  try {
    return await apiClient.get<Client>(`/api/clients/${id}`);
  } catch {
    // 3. Fallback final: seed
    return getClientFromMock(id);
  }
}

export const clientsApi = {
  list(): Promise<Client[]> {
    return apiClient.get<Client[]>("/api/clients");
  },

  getById(id: string): Promise<Client> {
    return apiClient.get<Client>(`/api/clients/${id}`);
  },

  create(client: Client): Promise<Client> {
    return apiClient.post<Client>("/api/clients", client);
  },

  update(id: string, client: Client): Promise<Client> {
    return apiClient.put<Client>(`/api/clients/${id}`, client);
  },

  remove(id: string): Promise<void> {
    return apiClient.del<void>(`/api/clients/${id}`);
  },
};
export function getClientFromMock(id: string): Client | null {
  const found = CLIENTS_SEED.find((c) => c.id === id);
  if (found) return found;

  if (!CLIENTS_SEED.length) return null;

  const randomIndex = Math.floor(Math.random() * CLIENTS_SEED.length);
  return CLIENTS_SEED[randomIndex];
}
