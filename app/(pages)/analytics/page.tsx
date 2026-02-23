import AnalyticsPageClient from "@/components/analytics/AnalyticsPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-zinc-400">Cargando estadísticas...</div>
      }
    >
      <AnalyticsPageClient />
    </Suspense>
  );
}
