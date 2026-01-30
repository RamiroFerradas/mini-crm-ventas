import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado", socket.id);

  socket.on("opportunity:update", (payload) => {
    // reenviamos a todos menos al que emitió
    socket.broadcast.emit("opportunity:updated", payload);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket server en http://localhost:${PORT}`);
});
