import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Card from '../components/Card'
import agriVideo from '../assets/videos/WhatsApp Video 2026-01-03 at 11.11.42 PM.mp4'

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
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
              alt="Education and Agriculture" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden md:block border-l-4 border-green-600">
              <p className="text-2xl font-bold text-green-900">#1 Choice</p>
              <p className="text-gray-600">for Agriculture Students</p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Bridging the Gap Between <span className="text-green-600">Science & Agriculture</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At PAC Barwaha, we believe that education is the seed of future prosperity. Our specialized curriculum for 11th and 12th classes combines traditional agricultural wisdom with modern scientific principles.
            </p>
            <ul className="space-y-4">
              {['Expert Faculty', 'Digital Classrooms', 'Focused Material', 'Result Oriented'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-700 font-semibold">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video Showcase Section */}
        <div className="mt-32 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-16 flex flex-col justify-center space-y-6">
              <span className="text-green-400 font-bold uppercase tracking-wider">Experience PAC Barwaha</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Watch Our <span className="text-green-400">Learning in Action</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                PAC Barwaha में हम केवल किताबों से नहीं सिखाते, बल्कि आधुनिक तकनीकों और प्रैक्टिकल अनुभवों के माध्यम से छात्रों को तैयार करते हैं। इस वीडियो में देखें कि कैसे हमारे छात्र अपनी सफल यात्रा की शुरुआत कर रहे हैं।
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center text-green-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-semibold">Virtual Tour of Our Classes</span>
              </div>
            </div>
            <div className="relative aspect-video lg:aspect-auto h-full min-h-[400px]">
              <video 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                autoPlay 
                muted 
                loop 
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
              >
                <source src={agriVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent hidden lg:block pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Campus & Learning Environment</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop", // Students studying together
              "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop", // Classroom environment
              "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop", // Group discussion
              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"  // Presentation/Lecture
            ].map((url, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl h-64 shadow-lg transition-all hover:scale-[1.02]">
                <img src={url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-medium">Life at PAC Barwaha</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 relative rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop')" }}
          ></div>
          <div className="absolute inset-0 bg-green-900/80"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">Ready to Start Your Journey?</h2>
            <p className="text-xl text-green-50 mb-10 max-w-2xl mx-auto drop-shadow-md">
              Join PAC Barwaha today and give your career a new direction with the best coaching in the region.
            </p>
            <Link 
              to="/enroll"
              className="inline-block px-10 py-4 bg-white text-green-900 font-bold text-lg rounded-full hover:bg-green-50 transition transform hover:scale-110 shadow-xl"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;