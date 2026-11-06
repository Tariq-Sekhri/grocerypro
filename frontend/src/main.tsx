import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { isNative } from "./lib/server";

// Keep existing bookmarks working while moving web navigation to normal paths.
if (!isNative && window.location.hash.startsWith("#/")) {
  const path = window.location.hash.slice(1);
  if (path.startsWith("/") && !path.startsWith("//")) {
    window.history.replaceState(window.history.state, "", path);
  }
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
