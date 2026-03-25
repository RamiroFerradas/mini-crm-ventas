"use client";

import { useEffect } from "react";
import { initOpportunitiesSocket } from "@/store/opportunities.socket";
import { makeServer } from "@/lib/mirage/server";

declare global {
  interface Window {
    __mirageServerInitialized?: boolean;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initOpportunitiesSocket();
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      !window.__mirageServerInitialized
    ) {
      makeServer();
      window.__mirageServerInitialized = true;
    }
  }, []);

  return <>{children}</>;
}
