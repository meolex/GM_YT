import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "./mock/mp";
import { Routing } from "./routing";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Routing />
    </QueryClientProvider>
  </StrictMode>
);
