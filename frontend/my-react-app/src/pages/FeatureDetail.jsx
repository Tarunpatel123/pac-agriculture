import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeatureDetail = ({ title, content, icon }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header Banner */}
      <div className="relative h-64 md:h-80 bg-green-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-green-100 hover:text-white transition-colors mb-8 group w-fit"
          >
            <span className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span className="font-bold tracking-wide uppercase text-sm">Back</span>
          </motion.button>

          <div className="flex items-center gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center text-4xl md:text-5xl shadow-2xl"
            >
              {icon}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white tracking-tight"
            >
              {title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl shadow-green-900/10 border border-gray-100 overflow-hidden"
        >
          <div className="p-8 md:p-16">
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed font-medium">
              {content}
            </div>

            {/* Action Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="text-center md:text-left">
                <h4 className="text-xl font-black text-gray-900 mb-2">Ready to excel?</h4>
                <p className="text-gray-500 font-bold">Join PAC Barwaha today and start your journey.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/enroll')}
                className="bg-green-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all w-full md:w-auto"
              >
                Enroll Now
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-1/2 bg-green-50/50 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-gray-50 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default FeatureDetail;