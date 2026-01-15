import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Card from '../components/Card'
import agriVideo from '../assets/videos/WhatsApp Video 2026-01-03 at 11.11.42 PM.mp4'
import bookImage from '../assets/images/book.webp'
import logoImage from '../assets/images/logo.jpeg'

const Home = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(err => console.debug("Autoplay prevented:", err));
        } else {
          video.pause();
        }
      },
      { 
        threshold: 0.25, // Play when 25% visible
        rootMargin: '0px' 
      }
    );

    observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      title: "Board Exam Preparation",
      description: "Specialized coaching for 11th and 12th board exams with complete syllabus coverage.",
      icon: "📖",
      link: "/feature/board-exam"
    },
    {
      title: "Agriculture & Science",
      description: "Expert guidance for both Agriculture and Science streams for higher secondary students.",
      icon: "🌾",
      link: "/feature/agri-science"
    },
    {
      title: "Practical Knowledge",
      description: "In-depth understanding of concepts with practical examples and lab-oriented learning.",
      icon: "🔬",
      link: "/feature/practical-knowledge"
    },
    {
      title: "Weekly Test Series",
      description: "Regular tests to track progress and improve performance in board and competitive exams.",
      icon: "📝",
      link: "/feature/test-series"
    },
    {
      title: "Doubt Clearing Sessions",
      description: "Dedicated sessions with teachers to resolve all your subject-related queries.",
      icon: "🙋‍♂️",
      link: "/feature/doubt-clearing"
    },
    {
      title: "Career Counseling",
      description: "Guidance for future career paths after 12th in Agriculture, Engineering, and Medical.",
      icon: "🎓",
      link: "/feature/career-counseling"
    }
  ];

  return (
    <div className="overflow-hidden">
      <Hero />
      <div className="container mx-auto px-6 py-12 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-green-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Why Choose PAC Barwaha</span>
          <h2 className="text-3xl md:text-6xl font-black text-gray-900 mt-3 mb-6 leading-tight">Shaping Your Future</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            We provide the best environment for students to excel in their school and competitive exams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Card 
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                link={feature.link}
              />
            </motion.div>
          ))}
        </div>

        {/* New Vision Section with Image */}
        <div className="mt-20 md:mt-40 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute -inset-4 md:-inset-10 bg-green-500/5 rounded-[3rem] blur-3xl group-hover:bg-green-500/10 transition-all duration-700"></div>
            <div className="relative">
              <img 
                src={bookImage} 
                alt="Advanced Agriculture Learning" 
                className="rounded-[2rem] shadow-2xl z-10 border-4 border-white/50 object-cover w-full aspect-[4/3] md:aspect-auto"
              />
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
                className="absolute -bottom-6 -right-4 md:-right-10 bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl z-20 border-l-[12px] border-green-600 hidden sm:block"
              >
                <p className="text-4xl md:text-6xl font-black text-green-900 leading-none">15+</p>
                <p className="text-gray-500 font-black uppercase tracking-tighter text-[10px] md:text-xs mt-2">Years of Excellence</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 md:space-y-12 order-1 lg:order-2"
          >
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Our Vision</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                Bridging the Gap Between <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Science & Agriculture</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed font-medium">
                At PAC Barwaha, we believe that education is the seed of future prosperity. Our specialized curriculum for 11th and 12th classes combines traditional agricultural wisdom with modern scientific principles.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { label: 'Expert Faculty', icon: '👨‍🏫', desc: 'Highly experienced mentors' },
                { label: 'Digital Labs', icon: '💻', desc: 'Modern learning tools' },
                { label: 'Focused Material', icon: '📚', desc: 'Premium study resources' },
                { label: 'Result Oriented', icon: '🏆', desc: 'Proven success record' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="flex items-start space-x-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <span className="text-3xl bg-gray-50 p-3 rounded-xl">{item.icon}</span>
                  <div>
                    <span className="text-gray-900 font-black text-sm block">{item.label}</span>
                    <span className="text-gray-500 text-xs font-medium">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div> {/* End of first container */}

      {/* Video Showcase Section - Expanded Width */}
      <div className="mt-20 md:mt-40 bg-[#0a0f0d] relative overflow-hidden py-16 md:py-0">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-green-600/5 blur-[120px] rounded-full"></div>
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-8 md:p-24 flex flex-col justify-center space-y-8 md:space-y-10"
          >
            <div className="space-y-4 md:space-y-6">
              <span className="text-green-400 font-black uppercase tracking-[0.3em] text-xs md:text-sm">Experience PAC Barwaha</span>
              <h2 className="text-4xl md:text-8xl font-black text-white leading-[1] tracking-tighter">
                Watch Our <br className="md:hidden"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Learning in Action</span>
              </h2>
              <p className="text-gray-400 text-base md:text-xl leading-relaxed font-medium max-w-xl">
                PAC Barwaha में हम केवल किताबों से नहीं सिखाते, बल्कि आधुनिक तकनीकों और प्रैक्टिकल अनुभवों के माध्यम से छात्रों को तैयार करते हैं। यहाँ शिक्षा केवल सूचना नहीं, बल्कि एक अनुभव है।
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link to="/enroll" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-green-900/40">
                Join Now
              </Link>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0f0d] bg-gray-800 flex items-center justify-center text-[10px] font-bold text-white">
                      {i === 3 ? '50+' : ''}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-sm font-bold">Joined this month</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative group mt-8 lg:mt-0 px-6 md:px-0"
          >
            <div className="absolute -inset-4 md:-inset-10 bg-green-500/10 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative h-full min-h-[400px] md:min-h-[700px] overflow-hidden rounded-[2rem] md:rounded-l-[4rem] md:rounded-r-none border-y md:border-y-0 md:border-l border-white/10">
              <video 
                ref={videoRef}
                src={agriVideo}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 md:bg-gradient-to-r md:from-black/60 md:to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 md:bottom-20 md:left-20 max-w-sm">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                  <p className="text-white font-black text-xl mb-2">Modern Agriculture</p>
                  <p className="text-gray-300 text-sm font-medium">Experience the blend of technology and nature in our specialized curriculum.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16"> {/* Start of second container */}
        {/* Image Gallery Section */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-green-600 font-black uppercase tracking-widest text-sm">Our Gallery</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mt-2">Campus Life</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-2 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-6 rounded-full"
            ></motion.div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                tag: "Expert Teaching"
              },
              {
                url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                tag: "Interactive Teaching"
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`group relative overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:-translate-y-2 h-[300px] md:h-[350px] lg:h-[400px]`}
              >
                <img 
                  src={item.url} 
                  alt={item.tag} 
                  className="w-full h-full transition-transform duration-700 group-hover:scale-110 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest w-fit mb-3">
                    {item.tag}
                  </span>
                  <p className="text-white font-black text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.tag}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative rounded-[2rem] md:rounded-[3rem] p-8 md:p-24 text-center text-white shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden min-h-[450px] md:min-h-[500px] flex items-center justify-center mx-2 md:mx-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 hover:scale-100 transition-transform duration-[2s]"
            style={{ backgroundImage: `url(${bookImage})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/80 to-emerald-900/90"></div>

          <div className="relative z-10 max-w-4xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-7xl font-black mb-6 md:mb-8 leading-tight px-4"
            >
              Ready to Start Your <br className="md:hidden"/><span className="text-green-400">Journey?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-2xl text-green-50/80 mb-10 md:mb-12 font-medium leading-relaxed px-6"
            >
              Join PAC Barwaha today and give your career a new direction with the best coaching in the region.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-6"
            >
              <Link 
                to="/enroll"
                className="px-10 py-4 md:px-12 md:py-5 bg-green-500 text-white font-black text-lg md:text-xl rounded-2xl hover:bg-green-400 transition transform hover:scale-105 shadow-[0_15px_30px_rgba(34,197,94,0.4)]"
              >
                Enroll Now
              </Link>
              <Link 
                to="/contact"
                className="px-10 py-4 md:px-12 md:py-5 bg-white/10 backdrop-blur-md text-white font-black text-lg md:text-xl rounded-2xl hover:bg-white/20 transition transform hover:scale-105 border border-white/20"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Home;