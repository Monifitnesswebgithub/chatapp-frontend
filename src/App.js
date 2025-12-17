import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Terms from "./pages/Terms";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ChatHome from "./pages/ChatHome";
import PrivateChat from "./pages/PrivateChat";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";

<Route path="/profile" element={<Profile />} />


export default function App() {
  const accepted = localStorage.getItem("acceptedTerms") === "true";
  const user = localStorage.getItem("chatUser");
  const isLogged = !!user;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Terms />} />
        <Route path="/terms" element={<Terms />} />

        <Route
          path="/signup"
          element={accepted ? <Signup /> : <Navigate to="/terms" />}
        />

        <Route
          path="/login"
          element={accepted ? <Login /> : <Navigate to="/terms" />}
        />

        <Route
          path="/chat"
          element={isLogged ? <ChatHome /> : <Navigate to="/login" />}
        />

        {/* FIXED PARAM NAME */}
        <Route
          path="/dm/:userId"
          element={isLogged ? <PrivateChat /> : <Navigate to="/login" />}
        />

        <Route path="/admin" element={<AdminPanel />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
