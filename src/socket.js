import { io } from "socket.io-client";

const SOCKET_URL = "https://chatapp-backend-lo5k.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true
});

export default socket;
