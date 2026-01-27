export type OpportunityStatus = "draft" | "open" | "won" | "lost" | "cancelled";

export interface OpportunityProduct {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface OpportunityApproval {
  required: boolean;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

export interface Opportunity {
  id: string;

  title: string;
  clientId: string;

  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];

  totalAmount: number;

  requiresApproval: boolean;

  status: "open" | "won" | "lost";

  createdAt: string;
  updatedAt: string;
}
export type OpportunityCreateInput = {
  title: string;
  clientId: string;

  products: {
    productId: string;
    quantity: number;
  }[];
};
