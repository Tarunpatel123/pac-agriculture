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
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-green-600 font-black uppercase tracking-widest text-sm">Our Mentors</span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mt-4">Expert <span className="text-green-600">Faculty</span></h1>
          <div className="w-24 h-2 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-8 rounded-full"></div>
          <p className="text-xl text-gray-500 mt-8 max-w-2xl mx-auto font-medium">
            Learn from the industry experts who have shaped thousands of careers in Agriculture and Science.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teachers.map((teacher, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="flex space-x-4">
                    {['fb', 'tw', 'ln'].map((social) => (
                      <div key={social} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-green-500 transition-colors cursor-pointer">
                        <span className="text-xs font-black uppercase">{social}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-black text-gray-900 mb-1">{teacher.name}</h3>
                <p className="text-green-600 font-black uppercase text-xs tracking-widest mb-4">{teacher.subject}</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-500 font-bold text-sm">
                    <span className="text-gray-900">{teacher.experience}</span> Experience
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mt-24 bg-[#0a0f0d] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10">Want to join our faculty?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
            We are always looking for passionate teachers who can inspire the next generation.
          </p>
          <button className="px-10 py-4 bg-green-500 text-white font-black rounded-2xl hover:bg-green-400 transition transform hover:scale-105 relative z-10">
            Apply Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Faculty;