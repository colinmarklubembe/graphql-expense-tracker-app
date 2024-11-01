import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
// import { AuroraBackground } from "@/components/ui/aurora-background.tsx";
// import { BackgroundLines } from "./components/ui/background-lines";
import { BackgroundBeams } from "./components/ui/background-beams";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <BackgroundLines> */}
      <div className="bg-black w-full">
        <BackgroundBeams />
        <App />
      </div>
      {/* </BackgroundLines> */}
    </BrowserRouter>
  </StrictMode>
);
