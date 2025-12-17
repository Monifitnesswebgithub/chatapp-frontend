import React, { useState } from "react";
import "../styles/signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        acceptedTC: true
      })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.error);
    } else {
      alert("Signup successful!");
      window.location.href = "/login";
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h1>Create Account ✨</h1>
        <p>Join the realtime chat</p>

        <input
          type="text"
          placeholder="Choose username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Choose password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Sign Up</button>

        <p style={{ marginTop: "10px" }}>
          Already have an account? <a href="/login">Login →</a>
        </p>

        <p className="dev">Developed by Monish Kumar V</p>

      </div>
    </div>
  );
}
