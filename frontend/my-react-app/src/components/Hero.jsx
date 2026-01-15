import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bookImage from '../assets/images/book.webp';

const Hero = () => {
  const sunriseImage = "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  return (
    <div className="relative w-full h-[600px] bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <motion.img 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        src={sunriseImage} 
        alt="Sun Rise over Field" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.span 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="text-green-400 font-bold tracking-wider uppercase mb-4 text-sm md:text-base bg-black/30 px-4 py-1 rounded-full"
        >
          #1 Coaching Institute in Barwaha
        </motion.span>
        
        <motion.h1 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight"
        >
          PAC <span className="text-green-400">11th & 12th</span> <br/> Coaching Classes
        </motion.h1>
        
        <motion.p 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl drop-shadow-md"
        >
          Join PAC Barwaha for the best coaching for 11th and 12th (Science & Agriculture). Expert teachers and focused preparation.
        </motion.p>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/courses" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
            <span>Explore Courses</span>
          </Link>
          <Link to="/board-exam" className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
            <span>📚 Notes & PDFs</span>
          </Link>
          <Link to="/enroll" className="px-8 py-4 bg-white hover:bg-gray-100 text-green-900 font-bold text-lg rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
            Enroll Now
          </Link>
        </motion.div>
        
        {/* Motivational Quote */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 max-w-2xl w-full"
        >
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-green-500/30">
            <p className="text-xl md:text-2xl font-medium text-green-400 italic mb-2">
              "शिक्षा वो बीज है, जो भविष्य में सफलता की फसल उगाता है।"
            </p>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-2 text-sm md:text-base font-semibold tracking-wide">
              मेहनत आपकी, मार्गदर्शन हमारा।
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
