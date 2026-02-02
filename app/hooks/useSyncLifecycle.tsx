"use client";
import { useEffect } from "react";
import { processSyncQueue } from "@/db";
import { useSyncStatusStore } from "@/store";

export function useSyncLifecycle() {
  const setOnline = useSyncStatusStore((s) => s.setOnline);

  useEffect(() => {
    setOnline(navigator.onLine);

    if (navigator.onLine) {
      processSyncQueue();
    }

    const handleOnline = () => {
      console.log("hola");
      setOnline(true);
      processSyncQueue();
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [setOnline]);
}
