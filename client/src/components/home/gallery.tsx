import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryItems = [
  {
    id: 1,
    image: "/src/assets/WhatsApp Image 2025-05-21 at 22.11.32_b318d0c9.jpg",
    title: "Royal Enfield Classic",
    description: "Vintage style with modern performance",
    delay: 0.1,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    title: "Elite Fitness Center",
    description: "State-of-the-art equipment for peak performance",
    delay: 0.2,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    title: "Performance Supplements",
    description: "Scientifically formulated for optimal results",
    delay: 0.3,
  },
  {
    id: 4,
    image: "/src/assets/WhatsApp Image 2025-05-21 at 22.11.33_a2834af8.jpg",
    title: "Strength Training",
    description: "Professional gym training for optimal results",
    delay: 0.4,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    title: "Cardio Station",
    description: "High-tech machines for effective cardio workouts",
    delay: 0.5,
  },
  {
    id: 6,
    image: "/src/assets/WhatsApp Image 2025-05-21 at 22.11.33_f363f5ff.jpg",
    title: "Fitness Goals",
    description: "Achieve your fitness goals with professional guidance",
    delay: 0.6,
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 bg-white">
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
            Personal <span className="text-secondary">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of fitness equipment and motorcycle photography showcasing our passion.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeIn('up', 'tween', item.delay, 1)}
              className="gallery-item rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(item.id)}
            >
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          variants={fadeIn('up', 'tween', 0.7, 1)}
          className="text-center"
        >
          <Button className="bg-primary hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg">
            View Full Gallery <span className="ml-2">→</span>
          </Button>
        </motion.div>
      </motion.div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={galleryItems.find(item => item.id === selectedImage)?.image} 
                alt={galleryItems.find(item => item.id === selectedImage)?.title}
                className="w-full object-contain max-h-[80vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-bold text-xl">
                  {galleryItems.find(item => item.id === selectedImage)?.title}
                </h3>
                <p className="text-white/80">
                  {galleryItems.find(item => item.id === selectedImage)?.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
