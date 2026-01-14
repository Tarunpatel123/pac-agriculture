import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold flex items-center mb-4">
              <img src={logo} alt="PAC Barwaha Logo" className="h-12 w-12 mr-3 rounded-full border-2 border-green-500 bg-white object-contain" />
              <span>PAC Barwaha</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              We are dedicated to providing the best quality education for 11th, 12th, and Agriculture competitive exams. Our mission is to empower students in Barwaha.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-white transition">Our Courses</Link></li>
              <li><Link to="/results" className="hover:text-white transition">Success Stories</Link></li>
              <li><Link to="/faculty" className="hover:text-white transition">Our Faculty</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>Main Road, Barwaha, Madhya Pradesh</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+91 7697783189</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>yogeshpatel.at@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="text-center md:text-left">
            <p>
              <Link to="/admin-pac-portal?direct=true" className="hover:text-gray-500 cursor-default">©</Link> {new Date().getFullYear()} PAC Barwaha. All rights reserved.
            </p>
            <p className="mt-1">
              Designed & Developed by <span className="text-green-500 font-semibold">Tarun Patel</span>
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
