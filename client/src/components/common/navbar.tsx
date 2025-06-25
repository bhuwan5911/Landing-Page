import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`bg-primary text-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md py-3' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/login">
            <span className="text-3xl cursor-pointer" title="Dashboard Login">🔒</span>
          </Link>
          <Link to="/">
            <span className="text-secondary text-2xl font-bebas tracking-wide cursor-pointer">CreatorXJatin</span>
          </Link>
          <span className="text-xs text-gray-400 mt-1"></span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <span className={`nav-link font-medium hover:text-secondary transition-all cursor-pointer`}>
                {link.name}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <a href="https://www.instagram.com/officialjxtin?igsh=MWczN2w4cmpxZ3Qybg==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all">
            <FaInstagram className="text-xl" />
          </a>
          <a href="https://youtube.com/@creatorxjatin?si=jpfRwLMfvAyTlgMf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all">
            <FaYoutube className="text-xl" />
          </a>
          <a href="https://youtube.com/@officialfitjatin?si=Bo8-7DUFNxj-Et_5" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all">
            <FaYoutube className="text-xl" />
          </a>
          <Link to="/contact">
            <Button className="bg-secondary hover:bg-red-700 text-white font-bold shadow-lg btn-primary">
              Get Started
            </Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <span 
                    className={`text-white hover:text-secondary py-2 cursor-pointer block`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-2">
                <a href="https://www.instagram.com/officialjxtin?igsh=MWczN2w4cmpxZ3Qybg==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="https://youtube.com/@creatorxjatin?si=jpfRwLMfvAyTlgMf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all">
                  <FaYoutube className="text-xl" />
                </a>
                <a href="https://youtube.com/@officialfitjatin?si=Bo8-7DUFNxj-Et_5" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-all">
                  <FaYoutube className="text-xl" />
                </a>
              </div>
              <Link to="/contact">
                <Button 
                  className="bg-secondary hover:bg-red-700 text-white font-bold shadow-lg btn-primary w-full mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}