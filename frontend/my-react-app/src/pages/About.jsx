import React from 'react';
import { motion } from 'framer-motion';
import bookImage from '../assets/images/book.webp';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative bg-[#0a0f0d] py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-transparent to-emerald-900/40"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.span 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-green-400 font-black uppercase tracking-[0.3em] text-sm mb-4 block"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">PAC Barwaha</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Providing Quality Education and Excellence in Agriculture & Science Coaching since 2010.
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative group"
          >
            <div className="absolute -inset-6 bg-green-500/10 rounded-[3rem] blur-3xl group-hover:bg-green-500/20 transition-all duration-500"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={bookImage} 
                alt="Students Learning" 
                className="w-full aspect-square object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl hidden md:block max-w-[200px] border-b-8 border-green-600">
              <p className="text-4xl font-black text-green-900">1000+</p>
              <p className="text-gray-500 font-bold uppercase text-xs mt-2">Successful Alumni</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-full text-green-700 font-black text-xs uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              <span>Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">Empowering the Next Generation of <span className="text-green-600">Agronomists</span></h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              PAC Barwaha का मुख्य उद्देश्य ग्रामीण और शहरी क्षेत्रों के छात्रों को सस्ती और उच्च गुणवत्ता वाली शिक्षा प्रदान करना है। हम छात्रों को न केवल बोर्ड परीक्षाओं के लिए तैयार करते हैं, बल्कि उन्हें भविष्य की प्रतियोगी परीक्षाओं जैसे JET, ICAR और BHU के लिए भी सक्षम बनाते हैं।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-green-500">
                <p className="text-gray-900 font-black text-lg mb-1">Focus</p>
                <p className="text-gray-500 text-sm font-medium">Quality Education for All</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-emerald-500">
                <p className="text-gray-900 font-black text-lg mb-1">Impact</p>
                <p className="text-gray-500 text-sm font-medium">Shaping Careers in Ag-Science</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="bg-[#0a0f0d] rounded-[4rem] p-12 md:p-24 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-600/10 to-transparent"></div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-black text-center text-white mb-20 relative z-10"
          >
            Why We Are <span className="text-green-400">Different</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {[
              { title: 'Expert Teachers', icon: '👨‍🏫', desc: 'Our faculty members are experts in their subjects with years of teaching experience.' },
              { title: 'Quality Material', icon: '📚', desc: 'We provide hand-written notes and simplified study material for better understanding.' },
              { title: 'Proven Results', icon: '🏆', desc: 'Our students consistently achieve top ranks in board exams and competitive tests.' }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.2 }}
                className="group p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
