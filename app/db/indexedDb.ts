import Dexie, { Table } from "dexie";
import type { Client, Opportunity, Product } from "@/models";

export type SyncEntity = "client" | "opportunity" | "product";
export type SyncAction = "create" | "update" | "delete";

export interface SyncQueueItem {
  id: string;
  entity: SyncEntity;
  action: SyncAction;
  payload: unknown;
  createdAt: string;
  attempts: number;
  lastError?: string;
}

export class AppDatabase extends Dexie {
  clients!: Table<Client, string>;
  opportunities!: Table<Opportunity, string>;
  products!: Table<Product, string>;
  syncQueue!: Table<SyncQueueItem, string>;

  constructor() {
    super("mini-crm-db");

    this.version(1).stores({
      clients: "id",
      opportunities: "id",
      products: "id",
      syncQueue: "id, entity, action",
    });
  }
}

export const db = new AppDatabase();
