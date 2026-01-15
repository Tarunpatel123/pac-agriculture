import React from 'react';
import { motion } from 'framer-motion';
import logoImage from '../assets/images/logo.jpeg';
import bookImage from '../assets/images/book.webp';

const Faculty = () => {
  const teachers = [
    { 
      name: "Prof. Sharma", 
      subject: "Agriculture Specialist", 
      experience: "15+ Years",
      image: logoImage
    },
    { 
      name: "Dr. Verma", 
      subject: "Biology", 
      experience: "10+ Years",
      image: bookImage
    },
    { 
      name: "Mr. Gupta", 
      subject: "Chemistry", 
      experience: "12+ Years",
      image: logoImage
    },
    { 
      name: "Ms. Patel", 
      subject: "Physics", 
      experience: "8+ Years",
      image: bookImage
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-green-600 font-black uppercase tracking-[0.2em] text-[10px] md:text-sm bg-green-50 px-4 py-2 rounded-full">Our Mentors</span>
          <h1 className="text-4xl md:text-8xl font-black text-gray-900 mt-6 tracking-tight">Expert <span className="text-green-600">Faculty</span></h1>
          <div className="w-20 md:w-32 h-2 md:h-3 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-8 rounded-full shadow-lg shadow-green-900/20"></div>
          <p className="text-lg md:text-2xl text-gray-500 mt-8 md:mt-10 max-w-3xl mx-auto font-medium leading-relaxed px-4">
            Learn from the industry experts who have shaped thousands of careers in Agriculture and Science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {teachers.map((teacher, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-xl shadow-green-900/5 hover:shadow-2xl hover:shadow-green-900/15 transition-all duration-700 hover:-translate-y-3 border border-gray-100/50"
            >
              <div className="relative h-72 md:h-96 overflow-hidden">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8 md:p-10">
                  <div className="flex space-x-4 md:space-x-5">
                    {['fb', 'tw', 'ln'].map((social) => (
                      <motion.div 
                        key={social} 
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:bg-green-500 transition-colors cursor-pointer border border-white/30 shadow-lg"
                      >
                        <span className="text-[10px] md:text-xs font-black uppercase">{social}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Experience Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50">
                  <p className="text-green-700 font-black text-[10px] md:text-xs uppercase tracking-wider">{teacher.experience}</p>
                </div>
              </div>
              <div className="p-8 md:p-10 text-center relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-green-500 rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">{teacher.name}</h3>
                <p className="text-green-600 font-black uppercase text-[10px] md:text-xs tracking-[0.2em] mb-6">{teacher.subject}</p>
                <div className="pt-6 border-t border-gray-100/80">
                  <button className="text-gray-900 font-black text-xs md:text-sm hover:text-green-600 transition-colors flex items-center justify-center mx-auto gap-2 group/btn">
                    View Profile
                    <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 md:mt-32 bg-[#0a0f0d] rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-center relative overflow-hidden mx-2 md:mx-0 shadow-2xl shadow-green-950/20"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8 md:mb-10 relative z-10 tracking-tight leading-tight">Want to join our <span className="text-green-500">elite faculty?</span></h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">
            We are always looking for passionate educators who can inspire and shape the next generation of agriculture leaders.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(34, 197, 94, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 md:px-14 py-4 md:py-6 bg-green-500 text-white font-black rounded-2xl md:rounded-3xl hover:bg-green-400 transition-all relative z-10 text-base md:text-xl shadow-xl shadow-green-500/20"
          >
            Apply to Join
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Faculty;