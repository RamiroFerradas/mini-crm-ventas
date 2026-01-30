import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("🟢 Socket conectado", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket desconectado");
    });
  }

  return socket;
}
