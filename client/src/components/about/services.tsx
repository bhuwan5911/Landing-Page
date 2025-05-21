import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { 
  FaDumbbell, 
  FaHeartbeat, 
  FaAppleAlt, 
  FaBriefcase, 
  FaMotorcycle, 
  FaUsers 
} from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: <FaDumbbell size={40} className="text-secondary" />,
    title: "Personal Training",
    description: "One-on-one customized training sessions designed to meet your specific fitness goals and needs.",
    delay: 0.1,
  },
  {
    icon: <FaHeartbeat size={40} className="text-secondary" />,
    title: "Cardio Programs",
    description: "Specialized cardio workouts that improve endurance, burn calories, and strengthen your heart.",
    delay: 0.2,
  },
  {
    icon: <FaAppleAlt size={40} className="text-secondary" />,
    title: "Nutrition Planning",
    description: "Personalized nutrition plans that complement your fitness routine for optimal results.",
    delay: 0.3,
  },
  {
    icon: <FaBriefcase size={40} className="text-secondary" />,
    title: "Corporate Wellness",
    description: "Custom fitness programs for companies looking to improve employee health and productivity.",
    delay: 0.4,
  },
  {
    icon: <FaMotorcycle size={40} className="text-secondary" />,
    title: "Motorcycle Fitness",
    description: "Specialized training for motorcycle enthusiasts to improve riding endurance and performance.",
    delay: 0.5,
  },
  {
    icon: <FaUsers size={40} className="text-secondary" />,
    title: "Group Sessions",
    description: "Motivational group workouts that create community while providing personalized attention.",
    delay: 0.6,
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-4">
            Our <span className="text-secondary">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of fitness services tailored to help you achieve your health and fitness goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 'tween', service.delay, 1)}
            >
              <Card className="h-full card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 mt-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
