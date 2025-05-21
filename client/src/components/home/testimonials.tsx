import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const testimonials = [
  {
    name: "Michael Johnson",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100",
    rating: 5,
    text: "Working with FitSync has transformed my fitness journey. The personalized training programs and nutrition advice have helped me achieve results I never thought possible.",
    delay: 0.1,
  },
  {
    name: "Sarah Williams",
    role: "Marathon Runner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100",
    rating: 4.5,
    text: "The detailed training plans and constant support from my FitSync trainer helped me prepare for my first marathon. I couldn't have done it without their expertise!",
    delay: 0.2,
  },
  {
    name: "James Rodriguez",
    role: "Professional Cyclist",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100",
    rating: 5,
    text: "As a professional athlete, I need specialized training that evolves with my performance. FitSync's approach to fitness and recovery has been game-changing for my career.",
    delay: 0.3,
  },
];

export default function Testimonials() {
  return (
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">
            What Our <span className="text-secondary">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from individuals who have transformed their fitness journey with our professional guidance and support.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 'tween', testimonial.delay, 1)}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="text-secondary flex">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  {testimonial.rating % 1 !== 0 && <FaStarHalfAlt />}
                </div>
                <span className="ml-2 text-gray-600">{testimonial.rating.toFixed(1)}</span>
              </div>
              
              <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
              
              <div className="flex items-center">
                <img 
                  className="w-12 h-12 rounded-full mr-4" 
                  src={testimonial.image} 
                  alt={`${testimonial.name}'s avatar`} 
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
