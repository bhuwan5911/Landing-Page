// main.tsx
// React application entry point. Renders the App component into the root DOM node.
// Sets up global providers for theming, data fetching, custom cursor, and notifications.
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query"; // React Query for server state management
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "./components/ui/theme-provider"; // Provides theme context
import { Toaster } from "@/components/ui/toaster"; // Global toast notifications
import { CustomCursor } from "./components/ui/cursor"; // Custom cursor effect

// Render the React app into the #root element
createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <App />
      <Toaster />
    </QueryClientProvider>
  </ThemeProvider>
);
