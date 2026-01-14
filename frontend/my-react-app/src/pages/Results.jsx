import { motion } from 'framer-motion';

const Results = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl font-bold text-green-900 mb-8"
      >
        Our Results
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl text-gray-600 mb-12"
      >
        Proud moments of PAC Barwaha. Our toppers from previous years.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item, index) => (
          <motion.div 
            key={item} 
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">👤</div>
            <h3 className="text-xl font-bold text-gray-800">Student Name</h3>
            <p className="text-green-600 font-bold">95% in 12th Boards</p>
            <p className="text-gray-500 text-sm mt-2">Class of 2024</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Results;