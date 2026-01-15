import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bookImage from '../assets/images/book.webp';

const Hero = () => {
  const sunriseImage = "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  return (
    <div className="relative w-full min-h-[550px] md:h-[700px] bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <motion.img 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        src={sunriseImage} 
        alt="Sun Rise over Field" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 md:py-20 min-h-[550px] md:h-full max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-green-400 font-bold tracking-widest uppercase text-[10px] md:text-xs bg-green-500/10 backdrop-blur-md px-4 py-2 rounded-full border border-green-500/30 inline-block">
            #1 Coaching Institute in Barwaha
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-[1.15] tracking-tight"
        >
          PAC <span className="text-green-400">11th & 12th</span> <br className="hidden sm:block"/> Coaching Classes
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-sm md:text-xl text-gray-300 mb-10 max-w-2xl drop-shadow-md leading-relaxed"
        >
          Join PAC Barwaha for the best coaching for 11th and 12th (Science & Agriculture). Expert teachers and focused preparation.
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link to="/courses" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-2xl transition duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-green-900/20 flex items-center justify-center">
            Explore Courses
          </Link>
          <Link to="/enroll" className="px-8 py-4 bg-white hover:bg-gray-50 text-green-900 font-black text-lg rounded-2xl transition duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl flex items-center justify-center">
            Enroll Now
          </Link>
        </motion.div>
        
        {/* Motivational Quote */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-12 md:mt-16 w-full max-w-lg"
        >
          <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative group">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full text-white shadow-lg">
              Inspiring Success
            </div>
            <p className="text-lg md:text-2xl font-bold text-green-400 italic mb-4 leading-snug">
              "शिक्षा वो बीज है, जो भविष्य में सफलता की फसल उगाता है।"
            </p>
            <div className="w-16 h-1 bg-green-500/50 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-300 text-xs md:text-base font-bold tracking-wider uppercase">
              मेहनत आपकी, मार्गदर्शन हमारा।
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
