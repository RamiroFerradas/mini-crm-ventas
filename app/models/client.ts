export interface Client {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: "active" | "inactive";
}

export type ClientCreateInput = {
  name: string;
  email: string;
};
