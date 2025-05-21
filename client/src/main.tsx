import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { CustomCursor } from "./components/ui/cursor";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <App />
      <Toaster />
    </QueryClientProvider>
  </ThemeProvider>
);
