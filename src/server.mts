import { WebSocketServer } from "ws";
import * as common from "./common.mjs";
import { Client } from "./common.mjs";
import { Door } from "./common.mjs";

(async () => {
  const wss = new WebSocketServer({ port: common.SERVER_PORT });
  const clients = new Map<number, Client>();
  let idCounter = 0;
  console.log(`ws://${common.SERVER}:${common.SERVER_PORT}/`);
  const doors: Door[] = [];
  doors.push({ id: 0, isOpen: false } as Door);
  doors.push({ id: 1, isOpen: false } as Door);
  wss.on("connection", (ws) => {
    console.log("Connection established");

    const id = idCounter++;
    const client = { ws: ws } as unknown as Client;
    clients.set(id, client);
    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
      ws.send(JSON.stringify(doors));
    });

    ws.on("close", () => {
      console.log("Connection closed");
    });
  });
})();
