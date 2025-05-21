import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaYoutube, FaDownload } from "react-icons/fa";

export default function Bio() {
  return (
    <section className="py-20 bg-gray-100">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="w-full lg:w-1/2"
          >
            <img 
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f" 
              alt="Personal Trainer" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
              style={{ maxHeight: "600px" }}
            />
            <div className="flex justify-center mt-6 space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeIn('left', 'tween', 0.4, 1)}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">
              About <span className="text-secondary">Me</span>
            </h2>
            
            <p className="text-gray-700 mb-4 text-lg">
              I'm a certified fitness trainer with over 10 years of experience helping clients transform their bodies and lives through personalized fitness programs.
            </p>
            
            <p className="text-gray-700 mb-4 text-lg">
              My approach combines strength training, cardiovascular conditioning, and nutrition planning to create holistic fitness solutions that deliver lasting results.
            </p>
            
            <p className="text-gray-700 mb-6 text-lg">
              As a motorcycle enthusiast, I've also developed specialized fitness programs for riders looking to improve their endurance and performance on the road.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Certifications</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  National Academy of Sports Medicine (NASM) Certified Personal Trainer
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Precision Nutrition Level 2 Coach
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Functional Movement Specialist (FMS)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  TRX Suspension Training Certified
                </li>
              </ul>
            </div>
            
            <Button className="bg-secondary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg flex items-center">
              <FaDownload className="mr-2" />
              Download Resume
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
