import React from "react";
import "../styles/messages.css";

export default function Messages({ messages, username }) {
  return (
    <div className="messages">
      {messages.map((m, i) => {
        if (m.system) {
          return (
            <div key={i} className="system-msg">
              {m.text}
            </div>
          );
        }

        return (
          <div
            key={i}
            className={`message ${m.username === username ? "me" : ""}`}
          >
            <div className="meta">
              <span className="user">{m.username}</span>
              <span className="time">{m.time}</span>
            </div>

            <div className={`bubble ${m.deleted ? "deleted" : ""}`}>
              {m.deleted ? "message deleted" : m.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
