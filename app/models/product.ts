export type ProductType = "service" | "membership" | "physical";

export interface ProductRules {
  requiresDuration?: boolean;
  requiresApprovalOverAmount?: number;
}

export interface Product {
  id: string;

  name: string;
  description?: string;

  type: ProductType;

  price: number;

  rules?: ProductRules;

  active: boolean;

  createdAt: string;
  updatedAt: string;
}

export type ProductCreateInput = {
  name: string;
  description?: string;
  type: ProductType;
  price: number;
  rules?: ProductRules;
};
