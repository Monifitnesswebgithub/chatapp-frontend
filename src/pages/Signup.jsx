import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  // ✅ Hooks INSIDE component
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!accepted) {
      alert("Please accept Terms & Conditions");
      return;
    }

    // TEMP: UI-only signup
    localStorage.setItem(
      "chatUser",
      JSON.stringify({ username })
    );

    navigate("/chat");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label style={{ fontSize: 14, marginBottom: 12 }}>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />{" "}
          I accept <Link to="/terms">Terms & Conditions</Link>
        </label>

        <button type="submit">Create Account</button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
