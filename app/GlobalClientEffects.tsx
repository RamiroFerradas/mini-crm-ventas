"use client";

import { useSyncLifecycle } from "@/hooks/useSyncLifecycle";

export function GlobalClientEffects() {
  useSyncLifecycle();
  return null;
}
