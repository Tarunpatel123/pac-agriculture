import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Courses = () => {
  const coursesList = [
    { 
      title: "11th Agriculture", 
      duration: "1 Year", 
      description: "Foundational course for agriculture students focusing on core principles and practical basics.",
      icon: "🌱",
      features: ["Basic Agronomy", "Animal Husbandry", "Crop Production", "Weekly Tests"]
    },
    { 
      title: "12th Agriculture", 
      duration: "1 Year", 
      description: "Comprehensive study material for agriculture boards with advanced concepts and exam preparation.",
      icon: "🌾",
      features: ["Advanced Agronomy", "Agri-Economics", "Horticulture", "Board Prep"]
    },
    { 
      title: "Science Stream", 
      duration: "1 Year", 
      description: "Expert coaching for Physics, Chemistry, and Biology/Maths with a focus on board excellence.",
      icon: "🔬",
      features: ["Physics & Chemistry", "Biology/Maths", "Lab Sessions", "Doubt Classes"]
    },
    { 
      title: "Competitive Prep", 
      duration: "Crash Course", 
      description: "Specialized training for JET, ICAR, and BHU entrance exams with proven methodologies.",
      icon: "🏆",
      features: ["Mock Tests", "Previous Papers", "Expert Tips", "Career Guidance"]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-[#0a0f0d] py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-emerald-900/30"></div>
        <div className="container mx-auto text-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Our Curriculum</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-8xl font-black text-white mb-6 tracking-tighter"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Courses</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Discover our specialized programs designed to help you excel in academics and competitive exams.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {coursesList.map((course, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl shadow-green-900/5 border border-gray-100 flex flex-col justify-between hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500"
            >
              <div className="absolute top-8 right-8 text-4xl md:text-6xl opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500 grayscale group-hover:grayscale-0">
                {course.icon}
              </div>
              
              <div>
                <div className="inline-block px-4 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  {course.duration}
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">{course.title}</h2>
                <p className="text-gray-500 font-medium text-sm md:text-lg leading-relaxed mb-8">
                  {course.description}
                </p>
                
                <div className="space-y-3 mb-10">
                  {course.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center space-x-3 text-gray-700">
                      <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px]">✓</span>
                      <span className="text-sm md:text-base font-bold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                to="/enroll" 
                className="w-full text-center py-5 bg-gray-900 hover:bg-green-600 text-white font-black rounded-2xl transition-all shadow-xl hover:shadow-green-900/20 text-lg group-hover:-translate-y-1"
              >
                Enroll Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default Courses;