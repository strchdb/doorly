import * as common from "./common.mjs";
import { Door } from "./common.mjs";

(async () => {
  const canvas = document.getElementById("display") as HTMLCanvasElement | null;
  if (!canvas) throw new Error("No Canvas with id display");
  canvas.height = common.DISPLAY_HEIGHT;
  canvas.width = common.DISPLAY_WIDTH;
  const ctx = canvas.getContext("2d");
  if (ctx === null) throw new Error("2d canvas is not supported");
  draw(ctx);
  const ws = new WebSocket(`ws://${common.SERVER}:${common.SERVER_PORT}`);
  let doors = [];
  ws.onopen = () => {
    console.log("WebSocket connected!");
    ws.send("Hello Server");
  };

  ws.onmessage = (event) => {
    const payload: Door[] = JSON.parse(event.data);
    doors = payload;
    draw(ctx, doors);
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          const notification = new Notification("Doorly!", {
            body: "Door status changed",
            tag: "DoorAlert",
          });
          notification.onclick = function () {
            window.focus();
          };
        }
      });
    } else {
      console.log("This browser does not support notifications.");
    }
  };

  ws.onclose = (event) => {
    console.log("WebSocket closed!", event);
  };
})();

function draw(ctx: CanvasRenderingContext2D, doors?: Door[]) {
  const height = ctx.canvas.height;
  const width = ctx.canvas.width;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, width, height);
  const walls = common.WALLS;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let i = 0; i < walls.length; i++) {
    const [x1, y1, x2, y2] = walls[i];
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.stroke();
  ctx.font = "20px Arial";
  ctx.fillStyle = "#ffffff";
  const labels = common.LABELS;
  labels.forEach((coords, key) => {
    const [x, y] = coords;
    ctx.fillText(key, x, y);
  });
  if (doors) {
    doors.forEach((door) => {
      if (door.isOpen) ctx.fillStyle = "#00FF00";
      else ctx.fillStyle = "#FF5733";
      ctx.fillRect(door.x, door.y, 80, 80);
    });
  }
}
