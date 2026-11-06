import type { Server as HttpServer } from "node:http";
import type { RequestHandler } from "express";
import { Server } from "socket.io";
import { clientAddress, log } from "./Logger";

/** Notifications carry no data; clients read committed state through the API. */
export function createLiveUpdates(server: HttpServer) {
  const io = new Server(server, { cors: { origin: "*" } });
  const clients = io.of("/grocery-sync");
  // Connect/disconnect history shows when each device last reached the server.
  clients.on("connection", socket => {
    const ip = clientAddress(socket.handshake.address);
    log("info", "device-connected", { ip, transport: socket.conn.transport.name, clients: clients.sockets.size });
    socket.on("disconnect", reason => log("info", "device-disconnected", { ip, reason, clients: clients.sockets.size }));
  });
  const notifyAfterWrite: RequestHandler = (req, res, next) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      res.once("finish", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) clients.emit("changed");
      });
    }
    next();
  };
  return { io, notifyAfterWrite };
}
