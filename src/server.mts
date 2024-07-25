import { WebSocket, WebSocketServer } from "ws";
import * as common from "./common.mjs";

(async () => {
  const wss = new WebSocketServer({ port: common.SERVER_PORT });
  console.log(`ws://${common.SERVER}:${common.SERVER_PORT}/`);

  wss.on("connection", (ws) => {
    console.log("Connection established");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
      ws.send("Hello Client");
    });

    ws.on("close", () => {
      console.log("Connection closed");
    });
  });
})();
