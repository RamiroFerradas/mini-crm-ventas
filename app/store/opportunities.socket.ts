import { getSocket } from "@/lib/socket";
import { useOpportunitiesStore } from "@/store/opportunities.store";

import type { Opportunity, OpportunityCreateInput } from "@/models";
import { EntityStoreState } from "./entity/createEntityStore";

let initialized = false;

type OpportunitySocketPayload = {
  id: string;
  data: Opportunity;
};
export type OpportunitiesStoreState = EntityStoreState<
  Opportunity,
  OpportunityCreateInput
>;

export function initOpportunitiesSocket() {
  if (initialized) return;
  initialized = true;

  const socket = getSocket();

  socket.on("opportunity:updated", ({ id, data }: OpportunitySocketPayload) => {
    const store = useOpportunitiesStore.getState() as OpportunitiesStoreState;

    if (store.byId[id]) {
      store.updatePartial(id, data);
    } else {
      // nueva oportunidad creada por otro cliente
      store.addOne(data);
    }
  });
}
