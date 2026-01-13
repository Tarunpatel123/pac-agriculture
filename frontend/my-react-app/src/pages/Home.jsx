import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Card from '../components/Card'
import agriVideo from '../assets/videos/WhatsApp Video 2026-01-03 at 11.11.42 PM.mp4'
import bookImage from '../assets/images/book.webp'
import logoImage from '../assets/images/logo.jpeg'

const Home = () => {
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
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <span className="text-green-600 font-bold tracking-wide uppercase text-sm">Why Choose PAC Barwaha</span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">Shaping Your Future</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the best environment for students to excel in their school and competitive exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              link={feature.link}
            />
          ))}
        </div>

        {/* New Vision Section with Image */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-green-500/10 rounded-[2rem] blur-2xl group-hover:bg-green-500/20 transition-all duration-500"></div>
            <img 
              src={bookImage} 
              alt="Advanced Agriculture Learning" 
              className="relative rounded-2xl shadow-2xl z-10 border-4 border-white transform transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl z-20 hidden md:block border-l-8 border-green-600 animate-bounce-slow">
              <p className="text-3xl font-black text-green-900 leading-none">15+</p>
              <p className="text-gray-600 font-bold uppercase tracking-tighter text-xs mt-1">Years of Excellence</p>
            </div>
          </div>
          <div className="space-y-8 relative">
            <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase tracking-wider">
              Our Vision
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Bridging the Gap Between <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">Science & Agriculture</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              At PAC Barwaha, we believe that education is the seed of future prosperity. Our specialized curriculum for 11th and 12th classes combines traditional agricultural wisdom with modern scientific principles.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Expert Faculty', icon: '👨‍🏫' },
                { label: 'Digital Classrooms', icon: '💻' },
                { label: 'Focused Material', icon: '📚' },
                { label: 'Result Oriented', icon: '🏆' }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-800 font-bold text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Showcase Section */}
        <div className="mt-32 bg-[#0a0f0d] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-20 flex flex-col justify-center space-y-8 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600/10 to-transparent"></div>
              <span className="text-green-400 font-black uppercase tracking-[0.2em] text-sm relative">Experience PAC Barwaha</span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] relative">
                Watch Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Learning in Action</span>
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed relative font-medium">
                PAC Barwaha में हम केवल किताबों से नहीं सिखाते, बल्कि आधुनिक तकनीकों और प्रैक्टिकल अनुभवों के माध्यम से छात्रों को तैयार करते हैं।
              </p>
              <div className="flex items-center space-x-6 relative">
                <div className="group cursor-pointer">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-white font-black text-lg">Virtual Tour</p>
                  <p className="text-green-400/60 font-bold text-sm">Explore our campus & labs</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video lg:aspect-auto h-full min-h-[500px]">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
                disablePictureInPicture
              >
                <source src={agriVideo} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d] via-[#0a0f0d]/40 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <span className="text-green-600 font-black uppercase tracking-widest text-sm">Our Gallery</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mt-2">Campus Life</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                url: bookImage,
                tag: "Classroom"
              },
              {
                url: logoImage,
                tag: "Agriculture"
              },
              {
                url: bookImage,
                tag: "Lab Work"
              },
              {
                url: logoImage,
                tag: "Field Study"
              }
            ].map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2rem] h-[400px] shadow-2xl transition-all duration-700 hover:-translate-y-2">
                <img src={item.url} alt={item.tag} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest w-fit mb-3">
                    {item.tag}
                  </span>
                  <p className="text-white font-black text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Excellence in {item.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 relative rounded-[3rem] p-12 md:p-24 text-center text-white shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden min-h-[500px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110 hover:scale-100 transition-transform duration-[2s]"
            style={{ backgroundImage: `url(${bookImage})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/80 to-emerald-900/90"></div>

          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">Ready to Start Your <span className="text-green-400">Journey?</span></h2>
            <p className="text-xl md:text-2xl text-green-50/80 mb-12 font-medium leading-relaxed">
              Join PAC Barwaha today and give your career a new direction with the best coaching in the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/enroll"
                className="px-12 py-5 bg-green-500 text-white font-black text-xl rounded-2xl hover:bg-green-400 transition transform hover:scale-105 shadow-[0_15px_30px_rgba(34,197,94,0.4)]"
              >
                Enroll Now
              </Link>
              <Link 
                to="/contact"
                className="px-12 py-5 bg-white/10 backdrop-blur-md text-white font-black text-xl rounded-2xl hover:bg-white/20 transition transform hover:scale-105 border border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;