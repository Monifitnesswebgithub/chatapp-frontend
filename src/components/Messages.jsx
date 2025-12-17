import { socket } from "../socket";

export default function Messages({ messages, username }) {
  const deleteMessage = (id) => {
    if (!socket.connected) {
      alert("Not connected");
      return;
    }

    socket.emit("delete-message", { id, username });
  };

  const editMessage = (id) => {
    const newText = prompt("Edit your message:");
    if (!newText) return;

    socket.emit("edit-message", { id, text: newText, username });
  };

  return (
    <div className="messages">
      {messages.map((m) => (
        <div className={`msg-bubble ${m.username === username ? "me" : "other"}`} key={m.id}>
          <div className="who">{m.username}</div>

          <div className="txt">
            {m.deleted ? "🗑️ message deleted" : m.text}
            {m.edited ? <span style={{fontSize:10, opacity:0.6}}> (edited)</span> : ""}
          </div>

          <div className="meta">{new Date(m.time).toLocaleTimeString()}</div>

          {m.username === username && !m.deleted && (
            <div className="actions">
              <button onClick={() => editMessage(m.id)}>Edit</button>
              <button onClick={() => deleteMessage(m.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
