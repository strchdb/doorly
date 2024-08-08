import { WebSocketServer } from "ws";
import * as common from "./common.mjs";
import { Client } from "./common.mjs";
import { Door } from "./common.mjs";
import http from "http";

(async () => {
  const wss = new WebSocketServer({ port: common.SERVER_PORT });
  const clients = new Map<number, Client>();
  let idCounter = 0;
  const doors: Door[] = [
    { id: 0, isOpen: false, x: 140, y: 10 },
    { id: 1, isOpen: true, x: 460, y: 110 },
  ];

  const notifyClients = () => {
    const doorsState = JSON.stringify(doors);
    for (const client of clients.values()) {
      client.ws.send(doorsState);
    }
  };

  const server = http.createServer((req, res) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);

    if (url.pathname === "/toggle-door" && req.method === "GET") {
      const id = parseInt(url.searchParams.get("id") || "NaN", 10);

      if (!isNaN(id) && doors[id]) {
        doors[id].isOpen = !doors[id].isOpen;
        console.log(
          `Door ${id} status changed to ${doors[id].isOpen ? "open" : "closed"}`
        );

        notifyClients();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, door: doors[id] }));
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Invalid door ID" }));
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Not found" }));
    }
  });

  server.listen(common.DOOR_PORT, () => {
    console.log(`Door server running on http://localhost:${common.DOOR_PORT}`);
  });

  wss.on("connection", (ws) => {
    console.log("Connection established");

    const id = idCounter++;
    const client = { ws: ws } as unknown as Client;
    clients.set(id, client);

    ws.send(JSON.stringify(doors));

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    ws.on("error", (event) => {
      console.log(`Error:  error: ${event}`);
    });

    ws.on("close", () => {
      console.log("Connection closed");
      clients.delete(id);
    });
  });
})();
