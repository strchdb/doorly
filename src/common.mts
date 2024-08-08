export const SERVER_PORT = 6969;
export const CLIENT_PORT = 7070;
export const DOOR_PORT = 7171;
export const SERVER = "localhost";
export const DISPLAY_WIDTH = 640;
export const DISPLAY_HEIGHT = 480;
export const WALLS = [
  [50, 50, 50, 300],
  [50, 300, 150, 300],
  [250, 300, 350, 300],
  [450, 300, 500, 300],
  [500, 300, 500, 300],
  [50, 50, 130, 50],
  [230, 50, 500, 50],
  [500, 50, 500, 100],
  [500, 200, 500, 300],
];
export const LABELS = new Map<string, number[]>([
  ["IT", [390, 350]],
  ["DSB", [550, 150]],
  ["KONFI", [170, 350]],
]);

export interface Client {
  ws: WebSocket;
}
export interface Door {
  id: number;
  isOpen: boolean;
  x: number;
  y: number;
}
