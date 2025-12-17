// src/pages/ChatHome.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import Composer from "../components/Composer";
import "../styles/chat.css";
import "../styles/sidebar.css";
import "../styles/messages.css";
import "../styles/composer.css";

import { socket } from "../socket";

export default function ChatHome() {
  const saved = localStorage.getItem("chatUser");
  const user = saved ? JSON.parse(saved) : null;
  const username = user?.username;

  const [room, setRoom] = useState("global");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!username) return;

    // join the current room
    socket.emit("join-room", { room, username });

    socket.on("history", (msgs) => setMessages(msgs || []));
    socket.on("chat-message", (msg) => setMessages((p) => [...p, msg]));
    socket.on("message-deleted", ({ id }) => {
  setMessages((prev) =>
    prev.map((m) => (m.id === id ? { ...m, deleted: 1 } : m))
  );
});

    socket.on("system", (sys) => setMessages((p) => [...p, { system: true, text: sys.text }]));
    socket.on("online-users", (list) => setOnlineUsers(list || []));
    socket.on("typing", (list) => setTypingUsers(list || []));

    // cleanup
    return () => {
      socket.emit("leave-room", { room, username });
      socket.off("history");
      socket.off("chat-message");
      socket.off("system");
      socket.off("online-users");
      socket.off("typing");
    };
  }, [username, room]);

  if (!username) {
    return (
      <div style={{ padding: 30 }}>
        Not logged in. Please <a href="/login">Login</a>.
      </div>
    );
  }

  return (
    <div className="chat-container">
      <Sidebar username={username} onlineUsers={onlineUsers} setRoom={setRoom} room={room} />

      <div className="chat-area">
        <Messages messages={messages} username={username} />

        <div className="typing-indicator">
  {typingUsers.length > 0 && typingUsers.filter(u => u !== username).join(", ") + " is typing..."}
</div>


        <Composer socket={socket} room={room} username={username} />

      </div>
    </div>
  );
}
