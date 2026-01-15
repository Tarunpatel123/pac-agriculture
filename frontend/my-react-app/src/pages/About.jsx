import React from 'react';
import { motion } from 'framer-motion';
import bookImage from '../assets/images/book.webp';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-[#0a0f0d] py-20 md:py-40 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-emerald-900/30"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto text-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Est. 2010</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-9xl font-black text-white mb-8 tracking-tighter"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Mission</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed px-4"
          >
            Providing Quality Education and Excellence in Agriculture & Science Coaching for over a decade.
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 py-20 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center mb-32 md:mb-60">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="absolute -inset-6 md:-inset-12 bg-green-500/10 rounded-[3rem] blur-3xl group-hover:bg-green-500/15 transition-all duration-700"></div>
            <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-4 md:border-[12px] border-white bg-white">
              <img 
                src={bookImage} 
                alt="Students Learning" 
                className="w-full aspect-[4/5] md:aspect-square object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-8 -left-4 md:-bottom-12 md:-left-12 bg-white p-6 md:p-10 rounded-3xl shadow-2xl border-l-[8px] md:border-l-[12px] border-green-600"
            >
              <p className="text-3xl md:text-6xl font-black text-green-900 leading-none">1000+</p>
              <p className="text-gray-500 font-black uppercase text-[10px] md:text-xs tracking-widest mt-2 md:mt-3">Successful Alumni</p>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 md:space-y-12"
          >
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Our Impact</span>
              </div>
              <h2 className="text-3xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                Empowering <br/>Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Agronomists</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed font-medium">
                PAC Barwaha का मुख्य उद्देश्य ग्रामीण और शहरी क्षेत्रों के छात्रों को सस्ती और उच्च गुणवत्ता वाली शिक्षा प्रदान करना है। हम छात्रों को न केवल बोर्ड परीक्षाओं के लिए तैयार करते हैं, बल्कि उन्हें भविष्य की प्रतियोगी परीक्षाओं जैसे JET, ICAR और BHU के लिए भी सक्षम बनाते हैं।
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { label: 'Quality Focus', icon: '✨', desc: 'Education for all' },
                { label: 'Career Growth', icon: '🚀', desc: 'Shaping futures' }
              ].map((item, i) => (
                <div key={i} className="p-6 md:p-8 bg-gray-50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl hover:shadow-green-900/5 transition-all duration-500">
                  <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                  <p className="text-gray-900 font-black text-lg mb-1">{item.label}</p>
                  <p className="text-gray-500 text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0a0f0d] rounded-[3rem] md:rounded-[5rem] p-8 md:p-32 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-green-600/10 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-green-400 font-black uppercase tracking-[0.3em] text-xs md:text-sm mb-4 block">Core Values</span>
              <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter">
                Why We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Different</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { title: 'Expert Teachers', icon: '👨‍🏫', desc: 'Our faculty members are experts in their subjects with years of teaching experience.' },
                { title: 'Quality Material', icon: '📚', desc: 'We provide hand-written notes and simplified study material for better understanding.' },
                { title: 'Proven Results', icon: '🏆', desc: 'Our students consistently achieve top ranks in board exams and competitive tests.' }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-8 group-hover:scale-110 group-hover:bg-green-500/30 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default About;
