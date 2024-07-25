import * as common from "./common.mjs";

(async () => {
  const ws = new WebSocket(`ws://${common.SERVER}:${common.SERVER_PORT}`);

  ws.onopen = () => {
    console.log("WebSocket connected!");
    ws.send("Hello Server");
  };

  ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
  };

  ws.onclose = (event) => {
    console.log("WebSocket closed!", event);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
})();
