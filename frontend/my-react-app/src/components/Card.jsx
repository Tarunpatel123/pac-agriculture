import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Card = ({ title, description, icon, link }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] shadow-xl shadow-green-900/5 overflow-hidden border border-gray-100/50 flex flex-col h-full group transition-all duration-500 hover:shadow-2xl hover:shadow-green-900/10"
    >
      <div className="p-8 md:p-10 flex flex-col h-full">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
          {icon}
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-green-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
          {description}
        </p>
        
        <Link 
          to={link || '#'} 
          className="inline-flex items-center gap-2 text-green-600 font-black text-sm uppercase tracking-wider group/link"
        >
          <span>Learn More</span>
          <svg 
            className="w-5 h-5 transform group-hover/link:translate-x-2 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
