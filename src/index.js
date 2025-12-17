import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeContext } from "./theme";
import "./styles/chat.css";

const Root = () => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <App />
    </ThemeContext.Provider>
  );
};

const container = document.getElementById("root");
createRoot(container).render(<Root />);
