import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  withCredentials: true, // kalau backend pakai cookie
  transports: ["websocket"], // pakai websocket langsung (lebih stabil)
});
