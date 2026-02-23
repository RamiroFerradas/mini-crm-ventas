import { create } from "zustand";

interface SyncStatusState {
  online: boolean;
  syncing: boolean;
  pendingCount: number;
  lastError?: string;

  setOnline: (value: boolean) => void;
  setSyncing: (value: boolean) => void;
  setPendingCount: (count: number) => void;
  setError: (error?: string) => void;
}

export const useSyncStatusStore = create<SyncStatusState>((set) => ({
  online: true, // valor estable para SSR
  syncing: false,
  pendingCount: 0,
  lastError: undefined,

  setOnline: (online) => set({ online }),
  setSyncing: (syncing) => set({ syncing }),
  setPendingCount: (count) => set({ pendingCount: count }),
  setError: (error) => set({ lastError: error }),
}));
