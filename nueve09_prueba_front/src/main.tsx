import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RemesasProvider } from "./stores/RemesasContext.tsx";
import { NotificationProvider } from "./stores/NotificationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <RemesasProvider>
        <App />
      </RemesasProvider>
    </NotificationProvider>
  </StrictMode>,
);
