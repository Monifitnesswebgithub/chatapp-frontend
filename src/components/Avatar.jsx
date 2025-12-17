import React from "react";
import "../styles/avatar.css";

function colorFromText(text){
  let hash = 0;
  for(let i=0;i<text.length;i++) hash = text.charCodeAt(i) + ((hash<<5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue},70%,50%)`;
}

export default function Avatar({ username, avatarUrl }) {
  if(avatarUrl) return <img src={avatarUrl} className="avatar-img" alt={username} />;
  const initials = (username||'U').slice(0,2).toUpperCase();
  return <div className="avatar-circle" style={{ background: colorFromText(username) }}>{initials}</div>;
}
