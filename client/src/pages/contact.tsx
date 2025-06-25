import ContactForm from "../components/contact/contact-form";
import { motion } from "framer-motion";
import { pageTransition } from "../lib/animations";

export default function Contact() {
  return (
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
