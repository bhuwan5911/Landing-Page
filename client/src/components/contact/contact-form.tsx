import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Extend the schema with additional validation
const contactFormSchema = insertMessageSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Personal Training",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "success",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    mutation.mutate(data);
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-montserrat font-bold mb-6">
              Get in <span className="text-secondary">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions about my fitness services? I'm here to help you achieve your personal fitness goals.
            </p>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="text-secondary text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">Our Location</h4>
                  <p className="text-gray-600">123 Fitness Avenue, Muscle Beach, CA 90210</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <FaEnvelope className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-gray-600">contact@fitsync.io</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <FaPhone className="text-green-500 text-xl" />
                </div>
                <div>
                  <h4 className="font-bold">Call Us</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/heyjatix?igsh=MWczN2w4cmpxZ3Qybg==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                <FaInstagram />
              </a>
              <a href="https://youtube.com/@creatorxjatin?si=jpfRwLMfvAyTlgMf" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                <FaYoutube />
              </a>
              <a href="https://youtube.com/@officialfitjatin?si=Bo8-7DUFNxj-Et_5" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                <FaYoutube />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn('left', 'tween', 0.4, 1)}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Subject</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Personal Training">Personal Training</SelectItem>
                            <SelectItem value="Nutrition Consultation">Nutrition Consultation</SelectItem>
                            <SelectItem value="Group Sessions">Group Sessions</SelectItem>
                            <SelectItem value="Motorcycle Fitness">Motorcycle Fitness</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can I help you?" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all h-32 resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg flex items-center justify-center"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <span className="ml-2">✉️</span>
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
