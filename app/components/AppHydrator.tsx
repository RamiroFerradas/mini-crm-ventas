"use client";

import { useEffect } from "react";
import { useClientsStore } from "@/store/clients.store";
import { useProductsStore } from "@/store/products.store";
import { useOpportunitiesStore } from "@/store";

export function AppHydrator() {
  const clientsHydrated = useClientsStore((s) => s.hydrated);
  const hydrateClients = useClientsStore((s) => s.hydrate);

  const productsHydrated = useProductsStore((s) => s.hydrated);
  const hydrateProducts = useProductsStore((s) => s.hydrate);
  
  const opportunitiesHydrated = useOpportunitiesStore((s) => s.hydrated);
  const hydrateOpportunities = useOpportunitiesStore((s) => s.hydrate);

  useEffect(() => {
    if (!clientsHydrated) hydrateClients();
    if (!productsHydrated) hydrateProducts();
    if (!opportunitiesHydrated) hydrateOpportunities();
  }, [
    clientsHydrated,
    productsHydrated,
    opportunitiesHydrated,
    hydrateClients,
    hydrateProducts,
    hydrateOpportunities,
  ]);

  return null;
}
