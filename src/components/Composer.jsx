// src/components/Composer.jsx
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function Composer({ socket, room, username }) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const send = () => {
    if (!text.trim()) return;
    if (!socket) return; // ✅ safety

    socket.emit("chat-message", {
      room,
      text,
      username
    });

    setText("");
    setShowEmoji(false);
  };

  return (
    <div className="composer" style={{ position: "relative" }}>
      {/* Emoji button */}
      <button
        type="button"
        className="emoji-btn"
        onClick={() => setShowEmoji((v) => !v)}
      >
        😊
      </button>

      {/* Emoji picker */}
      {showEmoji && (
        <div className="emoji-picker">
          <EmojiPicker
            theme="dark"
            onEmojiClick={(emojiData) =>
              setText((prev) => prev + emojiData.emoji)
            }
          />
        </div>
      )}

      {/* Input */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />

      {/* Send button */}
      <button onClick={send}>Send</button>
    </div>
  );
}
