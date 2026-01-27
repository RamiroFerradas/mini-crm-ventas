import { useProductsStore } from "@/store";

export function OpportunityTotalPreview({
  products,
}: {
  products: { productId: string; quantity: number }[];
}) {
  const productsMap = useProductsStore((s) => s.byId);

  const total = products.reduce((sum, p) => {
    const prod = productsMap[p.productId];
    if (!prod) return sum;
    return sum + prod.price * p.quantity;
  }, 0);

  return (
    <div className="text-sm text-zinc-700">
      Total estimado: <strong>${total.toLocaleString()}</strong>
    </div>
  );
}
