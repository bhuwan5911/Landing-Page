import { motion } from "framer-motion";
import { pageTransition, fadeIn, staggerContainer } from "@/lib/animations";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Update page title for SEO
    document.title = "HeyJatin | Personal Fitness & Content Creator";
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="overflow-hidden"
    >
      {/* Hero Section with your image */}
      <section className="bg-gradient-to-r from-primary to-gray-800 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="container mx-auto px-4 relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              variants={fadeIn('right', 'tween', 0.2, 1)}
              className="w-full md:w-1/2 mb-12 md:mb-0"
            >
              <h1 className="text-4xl md:text-6xl font-montserrat font-black mb-6 leading-tight">
                <span className="text-secondary">HeyJatin</span> Fitness Journey
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                Content creator and fitness enthusiast. I help people achieve their fitness goals through professional guidance and motivation.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/contact">
                  <Button className="bg-secondary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg btn-primary">
                    Contact Me
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/heyjatix?igsh=MWczN2w4cmpxZ3Qybg==" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-secondary p-3 rounded-full transition-all duration-300">
                    <FaInstagram className="text-white text-xl" />
                  </a>
                  <a href="https://youtube.com/@creatorxjatin?si=jpfRwLMfvAyTlgMf" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-secondary p-3 rounded-full transition-all duration-300">
                    <FaYoutube className="text-white text-xl" />
                  </a>
                  <a href="https://youtube.com/@officialfitjatin?si=Bo8-7DUFNxj-Et_5" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-secondary p-3 rounded-full transition-all duration-300">
                    <FaYoutube className="text-white text-xl" />
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('left', 'tween', 0.4, 1)}
              className="w-full md:w-1/2 relative"
            >
              <div className="relative rounded-xl shadow-2xl overflow-hidden">
                <img 
                  src="/src/assets/WhatsApp Image 2025-05-21 at 22.11.33_715892f8.jpg" 
                  alt="Jatin - Personal Trainer" 
                  className="w-full h-full object-cover"
                />
                {/* No overlay text on the image as requested */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-white">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="container mx-auto px-4"
        >
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">
              About <span className="text-secondary">Me</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I'm a fitness enthusiast and content creator with a passion for helping others achieve their fitness goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              variants={fadeIn('right', 'tween', 0.3, 1)}
              className="bg-gray-100 p-6 rounded-xl overflow-hidden"
            >
              <div className="relative h-[400px] mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/src/assets/WhatsApp Image 2025-05-21 at 22.11.32_b318d0c9.jpg"
                  alt="Jatin with motorcycle" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Motorcycle Enthusiast</h3>
              <p className="text-gray-600">
                When I'm not in the gym, you'll find me exploring on my Royal Enfield. I believe in balance - fitness is a lifestyle that complements all your passions.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn('left', 'tween', 0.3, 1)}
              className="bg-gray-100 p-6 rounded-xl overflow-hidden"
            >
              <div className="relative h-[400px] mb-6 overflow-hidden rounded-lg">
                <img 
                  src="/src/assets/WhatsApp Image 2025-05-21 at 22.11.33_a2834af8.jpg"
                  alt="Jatin at the gym" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Fitness Coach</h3>
              <p className="text-gray-600">
                With years of experience in fitness training, I create personalized workout plans that help you achieve real results. My approach focuses on sustainable fitness habits.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Content Creator Section */}
      <section className="py-20 bg-gray-100">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="container mx-auto px-4"
        >
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">
              Content <span className="text-secondary">Creator</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I create fitness and lifestyle content across multiple platforms. Follow me for workout tips, motivation, and behind-the-scenes content.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaInstagram className="text-secondary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instagram</h3>
              <p className="text-gray-600 mb-4">
                Daily fitness motivation, workout tips, and lifestyle content.
              </p>
              <a 
                href="https://www.instagram.com/heyjatix?igsh=MWczN2w4cmpxZ3Qybg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-secondary font-medium hover:underline"
              >
                @heyjatix
              </a>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaYoutube className="text-secondary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Youtube - Fitness</h3>
              <p className="text-gray-600 mb-4">
                Detailed workout tutorials, form guides, and fitness challenges.
              </p>
              <a 
                href="https://youtube.com/@officialfitjatin?si=Bo8-7DUFNxj-Et_5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-secondary font-medium hover:underline"
              >
                @officialfitjatin
              </a>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.5, 1)}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaYoutube className="text-secondary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Youtube - Creator</h3>
              <p className="text-gray-600 mb-4">
                Lifestyle vlogs, behind-the-scenes content, and more.
              </p>
              <a 
                href="https://youtube.com/@creatorxjatin?si=jpfRwLMfvAyTlgMf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-secondary font-medium hover:underline"
              >
                @creatorxjatin
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn('up', 'tween', 0.6, 1)}
            className="text-center mt-12"
          >
            <Link href="/contact">
              <Button className="bg-secondary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg">
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}
