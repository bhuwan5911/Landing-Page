import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { FaChartLine, FaComments, FaUsers, FaBrain, FaFileAlt, FaMobileAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine className="text-secondary text-2xl" />,
    title: "Personal Training",
    description: "One-on-one customized training sessions designed to meet your specific fitness goals and needs.",
    delay: 0.1,
  },
  {
    icon: <FaComments className="text-blue-500 text-2xl" />,
    title: "Nutrition Coaching",
    description: "Expert guidance on nutrition plans tailored to complement your workout routine for optimal results.",
    delay: 0.2,
  },
  {
    icon: <FaUsers className="text-green-500 text-2xl" />,
    title: "Group Sessions",
    description: "Motivating group workouts that foster community while providing personalized attention.",
    delay: 0.3,
  },
  {
    icon: <FaBrain className="text-purple-500 text-2xl" />,
    title: "Mindfulness Training",
    description: "Learn techniques to improve mental focus, reduce stress, and enhance your overall fitness journey.",
    delay: 0.4,
  },
  {
    icon: <FaFileAlt className="text-yellow-500 text-2xl" />,
    title: "Custom Programs",
    description: "Tailored fitness programs designed specifically for your body type, goals, and schedule.",
    delay: 0.5,
  },
  {
    icon: <FaMobileAlt className="text-indigo-500 text-2xl" />,
    title: "Mobile Support",
    description: "Access your training schedule, nutrition plan, and progress tracking from your mobile device.",
    delay: 0.6,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
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
            Professional <span className="text-secondary">Fitness Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive approach combines expert training, nutrition guidance, and personalized plans to help you achieve your fitness goals.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 'tween', feature.delay, 1)}
              className="bg-white p-6 rounded-xl shadow-lg feature-card card-hover"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <a href="#" className="text-secondary font-medium hover:underline flex items-center">
                Learn more <span className="ml-2">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
