import React from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar({ username, onlineUsers = [], setRoom, room }) {
  const rooms = ["global", "gaming", "kannada", "friends"];

  const saved = localStorage.getItem("chatUser");
  const me = saved ? JSON.parse(saved) : null;

  return (
    <aside className="sidebar">

      {/* ================= HEADER ================= */}
      <div className="sidebar-head">

        {/* User avatar */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            overflow: "hidden",
            background: "linear-gradient(90deg,#ff00ea,#a200ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700
          }}
        >
          {me?.avatar ? (
            <img
              src={me.avatar}
              alt="me"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            me?.displayName?.charAt(0)?.toUpperCase() || "U"
          )}
        </div>

        {/* App logo + name */}
        <div className="app-logo">
          <img src="/logo.png" alt="Chat App Logo" />
          <span>Realtime Chat</span>
        </div>

      </div>

      {/* ================= SEARCH ================= */}
      <input
        className="search"
        placeholder="Search..."
      />

      {/* ================= ROOMS ================= */}
      <div className="room-list">
        {rooms.map(r => (
          <div
            key={r}
            className={`room-item ${room === r ? "active" : ""}`}
            onClick={() => setRoom(r)}
          >
            #{r}
          </div>
        ))}
      </div>

      {/* ================= ONLINE USERS ================= */}
      <div className="online-title">Users online:</div>

      {onlineUsers.length === 0 ? (
        <div style={{ opacity: 0.6 }}>No one</div>
      ) : (
        onlineUsers.map(u => (
          <div key={u} className="online-user">
            <span className="dot"></span>

            <Link
              to={`/dm/${u}`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              {u === username ? `${u} (You)` : u}
            </Link>

            {u !== username && (
              <Link
                to={`/dm/${u}`}
                style={{ marginLeft: "auto", color: "#ffb3ff" }}
              >
                DM
              </Link>
            )}
          </div>
        ))
      )}

    </aside>
  );
}
