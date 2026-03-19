
"use client";
import { useEffect, useState } from "react";

export function OptimisticRollbackToast() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => {
      setError("No se pudo completar la operación. Los cambios fueron revertidos.");
      setTimeout(() => setError(null), 4000);
    };
    window.addEventListener("optimistic:rollback", handler);
    return () => window.removeEventListener("optimistic:rollback", handler);
  }, []);

  if (!error) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded bg-red-600 px-4 py-2 text-white shadow-lg animate-fade-in">
      {error}
    </div>
  );
}
