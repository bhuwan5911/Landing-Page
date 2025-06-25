import { Link } from "wouter";
import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-secondary text-3xl font-bebas tracking-wide">CreatorXJatin</span>
              <span className="text-xs text-gray-400 mt-1"></span>
            </div>
            <p className="text-gray-400 mb-6">
              Content creator and fitness enthusiast helping people achieve their fitness goals through professional guidance and motivation.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/officialjxtin?igsh=MWczN2w4cmpxZ3Qybg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-all">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://youtube.com/@creatorxjatin?si=jpfRwLMfvAyTlgMf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-all">
                <FaYoutube className="text-xl" />
              </a>
              <a href="https://youtube.com/@officialfitjatin?si=Bo8-7DUFNxj-Et_5" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-all">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-3">
              <li><a href="mailto:creatorxjatin@gmail.com" className="text-gray-400 hover:text-secondary transition-all">creatorxjatin@gmail.com</a></li>
              <li className="text-gray-400">Mon-Fri: 9AM - 8PM</li>
              <li className="text-gray-400">Sat: 10AM - 6PM</li>
              <li className="text-gray-400">Sun: Closed</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CreatorXJatin. All rights reserved.
          </p>

          <div className="flex space-x-6">
            <Link href="/">
              {(href) => (
                <a href={href} className="text-gray-500 hover:text-gray-300 text-sm">Home</a>
              )}
            </Link>
            <Link href="/contact">
              {(href) => (
                <a href={href} className="text-gray-500 hover:text-gray-300 text-sm">Contact</a>
              )}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
