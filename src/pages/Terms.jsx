// src/pages/Terms.jsx
import React, { useEffect, useState } from "react";
import "../styles/terms.css";
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300); // animation delay
  }, []);

  const acceptTC = () => {
    localStorage.setItem("acceptedTerms", "true");
    navigate("/signup");
  };

  return (
    <div className="tc-container">
      <div className={`tc-card ${show ? "tc-show" : ""}`}>

        {/* Greeting Section */}
        <h1 className="tc-title">👋 Welcome to Realtime Chat</h1>
        <p className="tc-sub">
          Before continuing, please review and accept our Terms & Conditions.
        </p>

        {/* T&C Content */}
        <div className="tc-box">
          <h2>📜 Terms & Conditions</h2>
          <p>
            • You agree not to use this platform for spam, abuse, harassment, or illegal activity.<br />
            • Your chat messages may be stored for quality and security purposes.<br />
            • Respect all users — no hate speech, bullying, or explicit content.<br />
            • Admin has the right to ban users who violate the rules.<br />
            • By accepting, you agree to all the above terms.
          </p>
        </div>

        {/* Accept button */}
        <button className="tc-btn" onClick={acceptTC}>
          Accept & Continue
        </button>

        {/* Footer */}
        <div className="tc-footer">
          Developed by <span>Monish Kumar V</span>
        </div>
      </div>
    </div>
  );
}
