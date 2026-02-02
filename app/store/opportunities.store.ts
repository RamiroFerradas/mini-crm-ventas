import { useProductsStore } from "@/store/products.store";
import type { Opportunity, OpportunityCreateInput } from "@/models";
import {
  loadOpportunitiesFromDb,
  saveOpportunitiesToDb,
} from "@/db/persistence";
import { createEntityStore } from "./entity/createEntityStore";

export const useOpportunitiesStore = createEntityStore<
  Opportunity,
  OpportunityCreateInput,
  null
>({
  entity: "opportunity",
  load: loadOpportunitiesFromDb,
  save: saveOpportunitiesToDb,

  getContext: () => null,

  create: (input) => {
    const productsById = useProductsStore.getState().byId;
    const now = new Date().toISOString();

    const enrichedProducts = input.products.map((p) => {
      const product = productsById[p.productId];
      if (!product) {
        throw new Error(`Product ${p.productId} not found`);
      }

      return {
        productId: p.productId,
        quantity: p.quantity,
        price: product.price,
        type: product.type,
        durationMonths: p.durationMonths,
      };
    });

    const totalAmount = enrichedProducts.reduce((sum, p) => {
      const base = p.price * p.quantity;

      if (p.type === "membership") {
        return sum + base * (p.durationMonths ?? 1);
      }

      return sum + base;
    }, 0);

    return {
      id: crypto.randomUUID(),
      title: input.title,
      clientId: input.clientId,
      products: enrichedProducts,
      totalAmount,
      requiresApproval: totalAmount > 10000,
      status: "open",
      createdAt: now,
      updatedAt: now,
    };
  },
});
