import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface Skill {
  name: string;
  percentage: number;
  color: string;
  delay: number;
}

const skills: Skill[] = [
  { name: "Strength Training", percentage: 95, color: "bg-secondary", delay: 0.1 },
  { name: "Nutrition Planning", percentage: 90, color: "bg-blue-500", delay: 0.2 },
  { name: "Cardiovascular Fitness", percentage: 85, color: "bg-green-500", delay: 0.3 },
  { name: "Rehabilitation", percentage: 80, color: "bg-yellow-500", delay: 0.4 },
  { name: "Group Instruction", percentage: 90, color: "bg-purple-500", delay: 0.5 },
  { name: "Motorcycle Fitness", percentage: 95, color: "bg-indigo-500", delay: 0.6 },
];

export default function Skills() {
  const [skillProgress, setSkillProgress] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    const timeouts = skills.map((skill, index) => {
      return setTimeout(() => {
        setSkillProgress(prev => {
          const newProgress = [...prev];
          newProgress[index] = skill.percentage;
          return newProgress;
        });
      }, 500 + skill.delay * 1000);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

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
            My <span className="text-secondary">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With years of experience and continuous learning, I've developed expertise in various fitness disciplines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 'tween', skill.delay, 1)}
              className="mb-6"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">{skill.name}</h3>
                <span className="text-secondary font-bold">{skillProgress[index]}%</span>
              </div>
              <Progress 
                value={skillProgress[index]} 
                className="h-2 bg-gray-200" 
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeIn('up', 'tween', 0.7, 1)}
          className="mt-16 bg-gray-100 p-8 rounded-xl max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">Why Choose Me?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2 text-secondary">Personalized Approach</h4>
              <p className="text-gray-700">Every client receives a customized program based on their specific goals, fitness level, and lifestyle.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2 text-secondary">Continuous Support</h4>
              <p className="text-gray-700">I provide ongoing guidance, motivation, and adjustments to ensure you stay on track and see results.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2 text-secondary">Evidence-Based Methods</h4>
              <p className="text-gray-700">My training techniques are grounded in scientific research and proven to deliver optimal results.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold mb-2 text-secondary">Holistic Wellness</h4>
              <p className="text-gray-700">I focus on total body wellness, addressing nutrition, recovery, and mental fitness alongside physical training.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
