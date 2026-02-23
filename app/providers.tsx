"use client";

import { useEffect } from "react";
import { initOpportunitiesSocket } from "@/store/opportunities.socket";
import { makeServer } from "@/lib/mirage/server";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initOpportunitiesSocket();
    if (process.env.NODE_ENV === "development") makeServer();
  }, []);

  return <>{children}</>;
}
