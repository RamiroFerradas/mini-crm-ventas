"use client";

import { useEffect } from "react";
import { initOpportunitiesSocket } from "@/store/opportunities.socket";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initOpportunitiesSocket();
  }, []);

  return <>{children}</>;
}
