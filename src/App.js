import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import ChatHome from "./pages/ChatHome";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Terms />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatHome />} />
      </Routes>
    </BrowserRouter>
  );
}
