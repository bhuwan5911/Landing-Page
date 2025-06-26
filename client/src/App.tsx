import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy } from "react";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "./hooks/use-auth";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));

function AppRouter() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-12 w-12 border-4 border-secondary rounded-full border-t-transparent"></div></div>}>
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </Suspense>
  );
}

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
