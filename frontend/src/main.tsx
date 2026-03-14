/**
 * @file main.tsx
 * @project DislexiaTranslator
 * @author Nakul Rajpal
 * @created 2024-10-14
 * @description Application entry point. Mounts the root React component into the DOM
 *              and imports global styles (Bootstrap reset + custom theme).
 * @source HUMAN_AUTHORED
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
