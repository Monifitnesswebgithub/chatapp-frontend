import React, { useEffect, useRef } from "react";

export default function Messages({ messages = [], username }) {
  const bottomRef = useRef(null);

  // auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-container">
      {messages.map((msg, i) => {
        const isMe = msg.username === username;

        return (
          <div
            key={i}
            className={`message-row ${isMe ? "me" : "other"}`}
          >
            <div className="message-bubble">
              {!isMe && (
                <div className="message-user">{msg.username}</div>
              )}

              <div className="message-text">{msg.text}</div>

              <div className="message-time">
                {msg.time
                  ? new Date(msg.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  : ""}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
