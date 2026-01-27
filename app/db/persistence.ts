import { db } from "./indexedDb";
import type { Client, Opportunity, Product } from "@/models";

export async function loadClientsFromDb(): Promise<Client[]> {
  if (typeof window === "undefined") return [];
  return await db.clients.toArray();
}

export async function loadProductsFromDb(): Promise<Product[]> {
  if (typeof window === "undefined") return [];
  return await db.products.toArray();
}

export async function loadOpportunitiesFromDb(): Promise<Opportunity[]> {
  if (typeof window === "undefined") return [];
  return await db.opportunities.toArray();
}

export async function saveClientsToDb(clients: Client[]) {
  if (typeof window === "undefined") return;
  await db.clients.bulkPut(clients);
}

export async function saveOpportunitiesToDb(items: Opportunity[]) {
  await db.opportunities.bulkPut(items);
}

export async function saveProductsToDb(products: Product[]) {
  await db.products.bulkPut(products);
}
