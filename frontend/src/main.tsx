import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { BackgroundBeams } from "./components/ui/background-beams";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:4000/gql"
      : "/gql",
  cache: new InMemoryCache(),
  credentials: "include", // This tells the server to include the cookies in the request
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="bg-black w-full">
        <BackgroundBeams />
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </div>
    </BrowserRouter>
  </StrictMode>
);
