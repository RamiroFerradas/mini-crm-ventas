import { create } from "zustand";
import type { FakeApiMode } from "@/lib";

interface SyncStatusState {
  online: boolean;
  syncing: boolean;
  pendingCount: number;
  lastError?: string;
  apiMode: FakeApiMode;

  setOnline: (value: boolean) => void;
  setSyncing: (value: boolean) => void;
  setPendingCount: (count: number) => void;
  setError: (error?: string) => void;
  setApiMode: (mode: FakeApiMode) => void;
}

export const useSyncStatusStore = create<SyncStatusState>((set) => ({
  online: true,
  syncing: false,
  pendingCount: 0,
  lastError: undefined,
  apiMode: "random",

  setOnline: (online) => set({ online }),
  setSyncing: (syncing) => set({ syncing }),
  setPendingCount: (count) => set({ pendingCount: count }),
  setError: (error) => set({ lastError: error }),
  setApiMode: (mode) => set({ apiMode: mode }),
}));
