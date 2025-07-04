import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContext } from "./context/UserContext.jsx";
import { Toaster } from "react-hot-toast";
// import { DepartmentContext } from "./context/DepartmentContext.js";

createRoot(document.getElementById("root")).render(
  <UserContext>
      <Toaster />
      <App />
  </UserContext>
);
