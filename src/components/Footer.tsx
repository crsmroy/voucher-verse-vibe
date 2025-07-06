
import ViewerCounter from '@/components/ViewerCounter';
import { Instagram, Facebook, Youtube, X, MessageCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 relative">
        <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="text-xl font-bold">FreedomVouchers</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for smart shopping and amazing savings.
              </p>
              <div className="flex space-x-4 mb-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-neon-pink rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <Instagram size={20} className="text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <Facebook size={20} className="text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <Youtube size={20} className="text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <X size={20} className="text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <MessageCircle size={20} className="text-white" />
                </a>
              </div>
              <ViewerCounter />
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/how-it-works" className="hover:text-neon-pink transition-colors">How It Works</Link></li>
                <li><Link to="/contact" className="hover:text-neon-pink transition-colors">Contact Us</Link></li>
                <li><Link to="/admin" className="hover:text-neon-pink transition-colors">Admin</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="block hover:text-yellow-300 transition-colors">
                  🔒 Privacy Policy
                </Link></li>
                <li><Link to="/terms" className="block hover:text-yellow-300 transition-colors">
                  📋 Terms & Conditions
                </Link></li>
                <li><Link to="/refund" className="block hover:text-yellow-300 transition-colors">
                  💰 Refund Policy
                </Link></li>
                <li><Link to="/terms-of-service" className="block hover:text-yellow-300 transition-colors">
                  📜 Terms of Service
                </Link></li>
                <li><Link to="/shipping-policy" className="block hover:text-yellow-300 transition-colors">
                  🚚 Shipping Policy
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@freedomvouchers.com</li>
                <li>📞 +91 99999 99999</li>
                <li>🕒 24/7 Available</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FreedomVouchers. Made with ❤️ for smart shoppers.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
