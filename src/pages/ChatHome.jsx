// src/pages/ChatHome.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import Composer from "../components/Composer";
import "../styles/chat.css";
import "../styles/sidebar.css";
import "../styles/messages.css";
import "../styles/composer.css";
import socket from "../socket";

export default function ChatHome() {
  const saved = localStorage.getItem("chatUser");
  const user = saved ? JSON.parse(saved) : null;
  const username = user?.username;

  const [room, setRoom] = useState("global");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  // ✅ JOIN ROOM
  useEffect(() => {
    if (!username) return;

    socket.emit("join-room", { room, username });

    return () => {
      socket.emit("leave-room", { room, username });
    };
  }, [room, username]);

  // ✅ SOCKET LISTENERS
  useEffect(() => {
    socket.on("history", (msgs) => {
      setMessages(msgs || []);
    });

    socket.on("chat-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("system", (sys) => {
      setMessages((prev) => [...prev, { system: true, text: sys.text }]);
    });

    socket.on("online-users", (list) => {
      setOnlineUsers(list || []);
    });

    socket.on("typing", (list) => {
      setTypingUsers(list || []);
    });

    return () => {
      socket.off("history");
      socket.off("chat-message");
      socket.off("system");
      socket.off("online-users");
      socket.off("typing");
    };
  }, []);

  if (!username) {
    return (
      <div style={{ padding: 30 }}>
        Not logged in. Please <a href="/login">Login</a>.
      </div>
    );
  }

  return (
    <div className="chat-container">
      <Sidebar
        username={username}
        onlineUsers={onlineUsers}
        setRoom={setRoom}
        room={room}
      />

      <div className="chat-area">
        <Messages messages={messages} username={username} />

        {typingUsers.length > 0 && (
          <div className="typing-indicator">
            {typingUsers.filter((u) => u !== username).join(", ")} is typing...
          </div>
        )}

        <Composer socket={socket} room={room} username={username} />
      </div>
    </div>
  );
}
