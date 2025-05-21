import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

export default function Hero() {
  return (
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
              Power Your <span className="text-secondary">Fitness Journey</span> With Expertise
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Professional fitness training and consultation services to help you achieve your personal fitness goals.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contact">
                <Button className="bg-secondary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg btn-primary">
                  Start Training
                </Button>
              </Link>
              
              <Button variant="outline" className="bg-transparent border-2 border-white hover:border-secondary hover:text-secondary text-white font-bold py-3 px-8 rounded-lg">
                Watch Demo <i className="fas fa-play-circle ml-2"></i>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100" alt="Client" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100" alt="Client" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100" alt="Client" />
              </div>
              <span className="text-gray-300">Trusted by 1,000+ clients</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn('left', 'tween', 0.4, 1)}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/80 opacity-70"></div>
              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Fitness Progress Tracker</h3>
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Weight Training</h4>
                    <span className="text-secondary font-bold">+24%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-secondary h-2.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Cardio Performance</h4>
                    <span className="text-green-500 font-bold">+12%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "62%" }}></div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Nutrition Compliance</h4>
                    <span className="text-yellow-500 font-bold">+8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "48%" }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-16 -bottom-10 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -right-10 -top-10 w-28 h-28 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
