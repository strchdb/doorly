export const SERVER_PORT = 6969;
export const SERVER = "localhost";
export const DISPLAY_WIDTH = 640;
export const DISPLAY_HEIGHT = 480;

export interface Client {
  ws: WebSocket;
}
export interface Door {
  id: number;
  isOpen: boolean;
}
