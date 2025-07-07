// about.tsx
// About page for the site. Displays information about the creator and includes the Bio component.
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import Bio from "@/components/about/bio";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // Update page title for SEO
    document.title = "About | FitSync - Content Creator";
  }, []);

  return (
    // Main animated container for the about page
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="overflow-hidden"
    >
      {/* Header section */}
      <div className="bg-gradient-to-r from-primary to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-4">
            About <span className="text-secondary">FitSync</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Learn more about our Content Creator, their journey, and the vision behind FitSync.          </p>
        </div>
      </div>
      
      {/* Bio section */}
      <Bio />
    
    </motion.div>
  );
}
