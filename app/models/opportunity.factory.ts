import { Opportunity, OpportunityCreateInput } from "./opportunity";
import { Product } from "./product";
import { v4 as uuid } from "uuid";

export function createOpportunity(
  input: OpportunityCreateInput,
  productsCatalog: Record<string, Product>
): Opportunity {
  const items = input.products.map((p) => {
    const product = productsCatalog[p.productId];

    if (!product) {
      throw new Error(`Product ${p.productId} not found`);
    }

    return {
      productId: p.productId,
      quantity: p.quantity,
      price: product.price,
    };
  });

  const totalAmount = items.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  const requiresApproval = totalAmount > 100000; 

  const now = new Date().toISOString();

  return {
    id: uuid(),
    title: input.title,
    clientId: input.clientId,
    products: items,
    totalAmount,
    requiresApproval,
    status: "open",
    createdAt: now,
    updatedAt: now,
  };
}
