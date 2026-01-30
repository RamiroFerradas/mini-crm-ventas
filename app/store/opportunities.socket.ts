import { getSocket } from "@/lib/socket";
import { useOpportunitiesStore } from "@/store/opportunities.store";

let initialized = false;

export function initOpportunitiesSocket() {
  if (initialized) return;
  initialized = true;

  const socket = getSocket();

  socket.on("opportunity:updated", (payload) => {
    const { id, data } = payload;

    const store = useOpportunitiesStore.getState();

    if (store.byId[id]) {
      store.updatePartial(id, data);
    } else {
      // si no existe, es nueva
      store.addOne(data);
    }
  });
}
