import { createEntityStore } from "@/store/createEntityStore";
import { useProductsStore } from "@/store/products.store";
import type { Opportunity, OpportunityCreateInput } from "@/models";
import {
  loadOpportunitiesFromDb,
  saveOpportunitiesToDb,
} from "@/db/persistence";
type OpportunityContext = {
  productsById: Record<
    string,
    {
      id: string;
      price: number;
    }
  >;
};

export const useOpportunitiesStore = createEntityStore<
  Opportunity,
  OpportunityCreateInput,
  OpportunityContext
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
      };
    });

    const totalAmount = enrichedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );

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
