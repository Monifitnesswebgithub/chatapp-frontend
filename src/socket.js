import { io } from "socket.io-client";

const socket = io(
  process.env.REACT_APP_SOCKET_URL || 
  "https://chatapp-backend-lo5k.onrender.com",
  {
    transports: ["websocket"], // 🔥 REQUIRED for Render
    reconnection: true,
    reconnectionAttempts: 10,
  }
);

export default socket;
