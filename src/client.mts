import * as common from "./common.mjs";

(async () => {
  const canvas = document.getElementById("display") as HTMLCanvasElement | null;
  if (!canvas) throw new Error("No Canvas with id display");
  canvas.height = common.DISPLAY_HEIGHT;
  canvas.width = common.DISPLAY_WIDTH;
  const ctx = canvas.getContext("2d");
  if (ctx === null) throw new Error("2d canvas is not supported");
  const ws = new WebSocket(`ws://${common.SERVER}:${common.SERVER_PORT}`);

  ws.onopen = () => {
    console.log("WebSocket connected!");
    ws.send("Hello Server");
  };

  ws.onmessage = (event) => {
    console.log("Message from server:", JSON.parse(event.data));
  };

  ws.onclose = (event) => {
    console.log("WebSocket closed!", event);
  };
})();
