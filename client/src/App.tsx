// App.tsx
// Main application entry point. Sets up routing, providers, and layout for the app.
// Uses React Router for navigation, Suspense for code splitting, and context providers for auth and tooltips.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router for SPA navigation
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy } from "react"; // Suspense and lazy for code splitting
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "./hooks/use-auth"; // Provides authentication context
import { ThemeProvider } from "@/components/ui/theme-provider";

// Lazy load pages for code splitting and performance optimization
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));

// AppRouter handles all route definitions and page layout
function AppRouter() {
  return (
    // Suspense fallback shows a spinner while lazy-loaded pages are loading
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-12 w-12 border-4 border-secondary rounded-full border-t-transparent"></div></div>}>
      <Router>
        {/* Navbar is shown on all pages */}
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Define all main routes for the app */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<ThemeProvider><Dashboard /></ThemeProvider>} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} /> {/* 404 page */}
          </Routes>
        </main>
        {/* Footer is shown on all pages */}
        <Footer />
      </Router>
    </Suspense>
  );
}

// App wraps the router with global providers (auth, tooltips, etc.)
function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen custom-cursor">
          <AppRouter />
        </div>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
