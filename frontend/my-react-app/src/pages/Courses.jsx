import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Courses = () => {
  const coursesList = [
    { title: "11th Agriculture", duration: "1 Year", description: "Foundational course for agriculture students." },
    { title: "12th Agriculture", duration: "1 Year", description: "Comprehensive study material for agriculture boards." }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-green-900 mb-12"
      >
        Our Courses
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coursesList.map((course, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
            className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-600 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h2>
              <p className="text-green-600 font-semibold mb-4">Duration: {course.duration}</p>
              <p className="text-gray-600 mb-6">{course.description}</p>
            </div>
            <Link 
              to="/enroll" 
              className="inline-block text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-300 shadow-md"
            >
              Enroll Now
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;