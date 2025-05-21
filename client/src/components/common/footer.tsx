import { Link } from "wouter";
import { FaInstagram, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-secondary text-3xl font-bebas tracking-wide">FitSync</span>
              <span className="text-xs text-gray-400 mt-1">BETA</span>
            </div>
            <p className="text-gray-400 mb-6">
              Professional fitness training and consultation services to help you achieve your personal fitness goals.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-all">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-all">
                <FaYoutube className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-all">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-all">
                <FaLinkedinIn className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/"><a className="text-gray-400 hover:text-secondary transition-all">Home</a></Link></li>
              <li><Link href="/about"><a className="text-gray-400 hover:text-secondary transition-all">About</a></Link></li>
              <li><Link href="/contact"><a className="text-gray-400 hover:text-secondary transition-all">Contact</a></Link></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-all">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-all">Testimonials</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-all">Personal Training</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-all">Fitness Consultation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-all">Nutrition Planning</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-all">Workout Programs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-all">Fitness Equipment</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">123 Fitness Avenue, Muscle Beach, CA 90210</li>
              <li><a href="mailto:contact@fitsync.io" className="text-gray-400 hover:text-secondary transition-all">contact@fitsync.io</a></li>
              <li><a href="tel:+15551234567" className="text-gray-400 hover:text-secondary transition-all">+1 (555) 123-4567</a></li>
              <li className="text-gray-400">Mon-Fri: 8AM - 8PM</li>
              <li className="text-gray-400">Sat-Sun: 10AM - 6PM</li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} FitSync. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
