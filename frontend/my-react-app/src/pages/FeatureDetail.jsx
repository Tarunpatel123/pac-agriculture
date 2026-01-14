import { motion } from 'framer-motion';

const FeatureDetail = ({ title, content, icon }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-4xl mr-6"
          >
            {icon}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl font-bold text-green-900"
          >
            {title}
          </motion.h1>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {content}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeatureDetail;