import { createEntityStore } from "@/store/createEntityStore";
import { loadProductsFromDb, saveProductsToDb } from "@/db/persistence";
import type { Product, ProductCreateInput } from "@/models";

/**
 * Para productos no necesitamos contexto,
 * así que usamos un objeto vacío.
 */
type ProductsContext = void;

export const useProductsStore = createEntityStore<
  Product,
  ProductCreateInput,
  ProductsContext
>({
  entity: "product",

  load: loadProductsFromDb,
  save: saveProductsToDb,

  getContext: () => null,

  create: (input) => {
    const now = new Date().toISOString();

    return {
      id: crypto.randomUUID(),
      name: input.name,
      price: input.price,
      type: input.type,
      rules: input.rules,
      active: true,
      createdAt: now,
      updatedAt: now,
    };
  },
});
