import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { OverlayProvider } from "./contexts/overlayContext.tsx";
import { ContainerProvider } from "./contexts/containerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <ContainerProvider>
        <App />
      </ContainerProvider>
    </OverlayProvider>
  </StrictMode>
);
