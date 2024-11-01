import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/aurora-background.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuroraBackground className="bg-black">
        <App />
      </AuroraBackground>
    </BrowserRouter>
  </StrictMode>
);
