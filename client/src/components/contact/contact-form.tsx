import { motion } from "framer-motion";
import { fadeIn, pageTransition, staggerContainer } from "../../lib/animations";
import { Button } from "../../components/ui/button";
import { FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../hooks/use-toast";
import { apiRequest } from "../../lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Standalone schema - no dependencies on shared files
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  useEffect(() => {
    document.title = "Contact | CreatorXJatin - Personal Fitness & Content Creator";
  }, []);

  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "Fitness Consultation",
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
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
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
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageTransition}
      className="overflow-hidden"
    >
      <div className="bg-gradient-to-r from-primary to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-4">
            Contact <span className="text-secondary">Me</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch for fitness consultation, content creation collaborations, or any other inquiries.
          </p>
        </div>
      </div>
      
      <section className="py-16 bg-white dark:bg-gray-900">
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
              <div className="mb-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <FaEnvelope className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold">Email Me</h4>
                    <p className="text-gray-600">creatorxjatin@gmail.com</p>
                    <p className="text-gray-500 text-sm mt-1">I'll respond within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <h4 className="font-bold mb-4">Connect on Social Media</h4>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/officialjxtin?igsh=MWczN2w4cmpxZ3Qybg==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="https://youtube.com/@creatorxjatin" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                    <FaYoutube className="text-xl" />
                  </a>
                  <a href="https://youtube.com/@officialfitjatin" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                    <FaYoutube className="text-xl" />
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn('left', 'tween', 0.4, 1)}
              className="w-full lg:w-1/2"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-black dark:text-white">
                <h3 className="text-2xl font-bold mb-6 text-center">Send me a message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" 
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
                          <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your.email@example.com" 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500" 
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
                          <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Subject</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                              <SelectItem value="Fitness Consultation">Fitness Consultation</SelectItem>
                              <SelectItem value="Content Collaboration">Content Collaboration</SelectItem>
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
                          <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can I help you?" 
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 min-h-[120px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-lg shadow-lg btn-primary transition-all duration-200">
                      {mutation.isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}