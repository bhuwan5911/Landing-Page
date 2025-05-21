import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import NotFound from "@/pages/not-found";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-12 w-12 border-4 border-secondary rounded-full border-t-transparent"></div></div>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen custom-cursor">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
