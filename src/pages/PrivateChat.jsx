import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/privatechat.css";
import { socket } from "../socket";

export default function PrivateChat() {
  const { userId } = useParams();
  const saved = localStorage.getItem("chatUser");
  const user = saved ? JSON.parse(saved) : null;
  const username = user?.username;

  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef(null);

  // Auto scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs]);

  // Join private room
  useEffect(() => {
    if (!username) return;

    socket.emit("join-private", { withUser: userId, username });

    socket.on("private-history", (h) => setMsgs(h || []));
    socket.on("private-message", (m) => setMsgs((prev) => [...prev, m]));

    return () => {
      socket.off("private-history");
      socket.off("private-message");
    };
  }, [userId, username]);

  // Send message
  const send = () => {
    if (!text.trim()) return;

    socket.emit("private-message", {
      withUser: userId,
      from: username,
      text,
    });

    setText("");
  };

  // Typing Indicator
  let typingTimeout;
  const handleTyping = (val) => {
    setText(val);

    socket.emit("typing-private", { withUser: userId, from: username, typing: true });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("typing-private", { withUser: userId, from: username, typing: false });
    }, 800);
  };

  socket.on("typing-private", ({ from, typing }) => {
    if (from === userId) {
      setTyping(typing);
    }
  });

  return (
    <div className="private-container">

      {/* HEADER BAR */}
      <div className="private-header">
        <Link to="/chat" className="back-btn">←</Link>
        <div className="user-info">
          <div className="username">{userId}</div>
          <div className="typing-status">
            {typing ? "Typing..." : "Online"}
          </div>
        </div>
      </div>

      {/* MESSAGES AREA */}
      <div className="private-messages" ref={scrollRef}>
        {msgs.map((m) => (
          <div
            key={m.id}
            className={`msg-row ${m.username === username ? "my-msg" : "their-msg"}`}
          >
            <div className="bubble">
              <div className="text">{m.text}</div>
              <div className="time">
                {m.time ? new Date(m.time).toLocaleTimeString() : ""}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* COMPOSER */}
      <div className="private-composer">
        <input
          value={text}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
