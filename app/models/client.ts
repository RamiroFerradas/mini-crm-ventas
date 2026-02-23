export interface Client {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: "active" | "inactive";
  avatarUrl?: string;
}

export type ClientCreateInput = {
  name: string;
  email: string;
};
