import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Terms() {
  const navigate = useNavigate();

  const acceptTerms = () => {
    // store acceptance locally
    localStorage.setItem("acceptedTC", "true");

    // move to signup page
    navigate("/signup");
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ width: 520 }}>
        <h1>👋 Welcome to Realtime Chat</h1>

        <p style={{ opacity: 0.85, marginBottom: 16 }}>
          Before continuing, please review and accept our Terms & Conditions.
        </p>

        <div style={{
          background: "rgba(255,255,255,0.05)",
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
          fontSize: 14,
          lineHeight: 1.6
        }}>
          <strong>📜 Terms & Conditions</strong>
          <ul>
            <li>No spam, abuse, or illegal activity</li>
            <li>Messages may be stored for security</li>
            <li>No hate speech or harassment</li>
            <li>Admin can ban violating users</li>
            <li>Acceptance is required to continue</li>
          </ul>
        </div>

        <button onClick={acceptTerms}>
          Accept & Continue
        </button>

        <p style={{ marginTop: 14, opacity: 0.6 }}>
          Developed by <span style={{ color: "#ff66ff" }}>Monish Kumar V</span>
        </p>
      </div>
    </div>
  );
}
