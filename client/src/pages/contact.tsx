import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import ContactForm from "@/components/contact/contact-form";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    // Update page title for SEO
    document.title = "Contact | FitSync - Professional Fitness Training";
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="overflow-hidden"
    >
      <div className="bg-gradient-to-r from-primary to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-4">
            Contact <span className="text-secondary">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with us to start your fitness journey or inquire about our professional services.
          </p>
        </div>
      </div>
      
      <ContactForm />
      
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.2598617047225!2d-118.48411308483453!3d33.98406668061488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bad41fcc567f%3A0xb5d5cd81e7caecbf!2sMuscle%20Beach%20Venice!5e0!3m2!1sen!2sus!4v1620232896001!5m2!1sen!2sus"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="FitSync Location"
            ></iframe>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
