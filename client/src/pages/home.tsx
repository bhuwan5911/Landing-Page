import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import ModelViewer from "@/components/home/model-viewer";
import Gallery from "@/components/home/gallery";
import Testimonials from "@/components/home/testimonials";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Update page title for SEO
    document.title = "FitSync | Professional Fitness Training";
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="overflow-hidden"
    >
      <Hero />
      <Features />
      <ModelViewer />
      <Gallery />
      <Testimonials />
    </motion.div>
  );
}
