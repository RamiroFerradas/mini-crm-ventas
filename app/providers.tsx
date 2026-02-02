"use client";

import { useEffect } from "react";
import { initOpportunitiesSocket } from "@/store/opportunities.socket";
import { useSyncLifecycle } from "./hooks/useSyncLifecycle";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // useSyncLifecycle();
    initOpportunitiesSocket();
  }, []);

  return <>{children}</>;
}
