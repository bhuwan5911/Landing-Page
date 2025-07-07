// bio.tsx
// Bio component for the About page. Displays personal info, certifications, and social links with animations.
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaYoutube, FaDownload } from "react-icons/fa";

export default function Bio() {
  return (
    // Main section with image, social links, and bio details
    <section className="py-20 bg-gray-100">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Profile image and social links */}
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="w-full lg:w-1/2"
          >
            <img 
              src="/src/assets/WhatsApp Image 2025-05-21 at 22.11.33_f363f5ff.jpg" 
              alt="Jatin - Personal Trainer" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
              style={{ maxHeight: "600px" }}
            />
            <div className="flex justify-center mt-6 space-x-4">
              {/* Social media links */}
              <a 
                href="https://www.instagram.com/officialjxtin?igsh=MWczN2w4cmpxZ3Qybg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://youtube.com/@creatorxjatin?si=jpfRwLMfvAyTlgMf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
              >
                <FaYoutube size={20} />
              </a>
              <a 
                href="https://youtube.com/@officialfitjatin?si=Bo8-7DUFNxj-Et_5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </motion.div>
          
          {/* Right: Bio details and certifications */}
          <motion.div
            variants={fadeIn('left', 'tween', 0.4, 1)}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">
              About <span className="text-secondary">Me</span>
            </h2>
            
            <p className="text-gray-700 mb-4 text-lg">
              I'm a  Fitness Lover with content creator
            </p>
            
            <p className="text-gray-700 mb-4 text-lg">
              My approach combines strength , endurance to be fit.
            </p>
            
            <p className="text-gray-700 mb-6 text-lg">
              Try to become a good human and good fitness influencer
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Certifications</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Eat healthy and stay fit
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                 Do yo workout and stay fit
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Be a good human and help others
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Be a good fitness influencer
                </li>
              </ul>
            </div>
            
            <Button className="bg-secondary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center">
              <FaDownload className="mr-2" />
              
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
