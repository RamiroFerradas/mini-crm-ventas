import { SyncAction } from "@/db";

export interface Entity {
  id: string;
}

export type SyncPayload<T> = {
  id: string;
  entity: string;
  action: SyncAction;
  payload: T;
};

export interface SyncItem<T> {
  id: string;
  entity: string;
  action: SyncAction;
  payload: T;
  attempts: number;
  createdAt: number;
  lastError?: string;
}
export type EntityStoreShape<T> = {
  byId: Record<string, T>;
  allIds: string[];
};
