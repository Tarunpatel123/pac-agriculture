import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-[#050807] text-white pt-16 md:pt-24 pb-8 md:pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-[120px] rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-600/5 blur-[120px] rounded-full -ml-32 -mb-32"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
              <img 
                src={logo} 
                alt="PAC Barwaha Logo" 
                className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-green-500 bg-white object-contain shadow-xl shadow-green-500/10" 
              />
              <div className="flex flex-col text-center md:text-left">
                <span className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
                  PAC <span className="text-green-500">Barwaha</span>
                </span>
                <span className="text-green-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mt-1">Excellence in Education</span>
              </div>
            </div>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 font-medium text-center md:text-left">
              Empowering the next generation of leaders in Agriculture and Science. Join PAC Barwaha for expert guidance and proven results in your academic journey.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-6 text-white border-b-2 border-green-500 w-fit mx-auto md:mx-0 pb-1">Explore</h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-4 text-gray-400 font-bold text-sm md:text-base">
              <li><Link to="/about" className="hover:text-green-400 transition-colors flex items-center justify-center md:justify-start gap-2">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-green-400 transition-colors flex items-center justify-center md:justify-start gap-2">Courses</Link></li>
              <li><Link to="/results" className="hover:text-green-400 transition-colors flex items-center justify-center md:justify-start gap-2">Results</Link></li>
              <li><Link to="/faculty" className="hover:text-green-400 transition-colors flex items-center justify-center md:justify-start gap-2">Faculty</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-6 text-white border-b-2 border-green-500 w-fit mx-auto md:mx-0 pb-1">Connect</h3>
            <ul className="space-y-5 text-gray-400 font-bold">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <span className="text-green-500 text-xl bg-white/5 p-2 rounded-lg">📍</span>
                <span className="text-sm md:text-base leading-snug">Main Road, Barwaha,<br/>Madhya Pradesh - 451115</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <span className="text-green-500 text-xl bg-white/5 p-2 rounded-lg">📞</span>
                <span className="text-sm md:text-base">+91 7697783189</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <span className="text-green-500 text-xl bg-white/5 p-2 rounded-lg">✉️</span>
                <span className="text-sm md:text-base break-all">yogeshpatel.at@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-8">
          <div className="text-center md:text-left space-y-2 order-2 md:order-1">
            <p className="font-bold text-gray-400">
              <Link to="/admin-pac-portal?direct=true" className="hover:text-gray-500 cursor-default">©</Link> {new Date().getFullYear()} PAC Barwaha.
            </p>
            <p className="text-[10px] md:text-xs tracking-wider uppercase font-medium">
              Designed & Developed by <span className="text-green-500 font-black">Tarun Patel</span>
            </p>
          </div>
          <div className="flex space-x-8 font-bold order-1 md:order-2">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
