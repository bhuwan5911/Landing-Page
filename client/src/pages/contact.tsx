// contact.tsx
// Contact page for the site. Renders the ContactForm component with animation.
import ContactForm from "../components/contact/contact-form";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";

export default function Contact() {
  return (
    // Animated container for the contact form
    <>
      <motion.div
        initial="hidden"
        animate="show"
        exit="exit"
        variants={pageTransition}
        className="overflow-hidden"
      >
        <ContactForm />
      </motion.div>
    </>
  );
}
