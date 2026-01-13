import { Link } from 'react-router-dom';
import bookImage from '../assets/images/book.webp';

const Hero = () => {
  return (
    <div className="relative w-full h-[600px] bg-gray-900">
      {/* Background Image */}
      <img 
        src={bookImage} 
        alt="Agriculture Field" 
        className="w-full h-full object-cover opacity-60"
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-green-400 font-bold tracking-wider uppercase mb-4 text-sm md:text-base bg-black/30 px-4 py-1 rounded-full">
          #1 Coaching Institute in Barwaha
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
          PAC <span className="text-green-400">11th & 12th</span> <br/> Coaching Classes
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl drop-shadow-md">
          Join PAC Barwaha for the best coaching for 11th and 12th (Science & Agriculture). Expert teachers and focused preparation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/courses" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center">
            <span>Explore Courses</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </Link>
          <Link to="/enroll" className="px-8 py-4 bg-white hover:bg-gray-100 text-green-900 font-bold text-lg rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
            Enroll Now
          </Link>
        </div>
        
        {/* Motivational Quote */}
        <div className="mt-12 max-w-2xl w-full">
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-green-500/30">
            <p className="text-xl md:text-2xl font-medium text-green-400 italic mb-2">
              "शिक्षा वो बीज है, जो भविष्य में सफलता की फसल उगाता है।"
            </p>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
            <p className="text-gray-300 mt-2 text-sm md:text-base font-semibold tracking-wide">
              मेहनत आपकी, मार्गदर्शन हमारा।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
