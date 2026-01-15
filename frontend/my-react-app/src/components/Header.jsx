import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    onLogout();
    Swal.fire({
      title: 'Logged Out',
      text: 'You have been successfully logged out.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'PAC Barwaha - Coaching Agriculture & Science',
      text: 'Check out PAC Barwaha for the best coaching in Agriculture and Science!',
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        // Track the share
        const API_BASE_URL = import.meta.env.VITE_API_URL || '';
        await fetch(`${API_BASE_URL}/api/track-share`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            platform: 'Web Share API',
            userId: user ? user.id : null
          })
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
        window.open(whatsappUrl, '_blank');
        
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        await fetch(`${API_BASE_URL}/api/track-share`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            platform: 'WhatsApp (Fallback)',
            userId: user ? user.id : null
          })
        });
      }
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-[100] border-b border-green-50">
      <div className="container mx-auto px-4 py-3 md:py-2">
        <div className="flex justify-between items-center">
          {/* Desktop Left Nav */}
          <div className="flex-1 hidden md:flex">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-green-600 font-bold transition-colors">Home</Link>
              <Link to="/courses" className="text-gray-700 hover:text-green-600 font-bold transition-colors">Courses</Link>
              <Link to="/board-exam" className="text-green-600 hover:text-green-700 font-black transition-all flex items-center gap-1">
                <span>Board Exam</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-600 font-bold transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center justify-center md:flex-1">
            <Link to="/" className="flex items-center space-x-2 md:flex-col md:space-x-0 group">
              <img 
                src={logo} 
                alt="PAC Barwaha Logo" 
                className="h-10 w-10 md:h-16 md:w-16 object-contain rounded-full border-2 border-green-500 bg-white p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="flex flex-col md:items-center">
                <span className="text-lg md:text-xl font-black text-green-900 leading-none tracking-tight">
                  PAC <span className="text-green-600 md:hidden">Barwaha</span>
                </span>
                <span className="hidden md:block text-[10px] md:text-xs font-bold text-green-700 uppercase tracking-[0.2em] mt-0.5">Barwaha</span>
              </div>
            </Link>
            {/* Hidden admin trigger */}
            <Link to="/admin-pac-portal?direct=true" className="opacity-0 absolute w-4 h-4"></Link>
          </div>

          {/* Desktop Right Nav */}
          <nav className="hidden md:flex items-center justify-end space-x-4 flex-1">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin-pac-portal" className="text-green-600 font-black hover:text-green-800 transition flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Portal
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600 font-bold transition-colors text-sm bg-gray-50 px-3 py-1.5 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : null}
            <button 
              onClick={handleShare}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors border border-transparent hover:border-green-100"
              title="Share Website"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100 2.684m0-2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </button>
            <Link to="/enroll" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-black hover:bg-green-700 transition shadow-lg shadow-green-200 whitespace-nowrap text-sm transform hover:-translate-y-0.5 active:translate-y-0">Enroll Now</Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-1">
            <button 
              onClick={handleShare}
              className="p-2.5 text-green-600 active:scale-90 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100 2.684m0-2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </button>
            <button 
              className="text-green-800 p-2.5 focus:outline-none active:scale-90 transition-transform bg-green-50 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[101] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-xs bg-white z-[102] shadow-2xl md:hidden flex flex-col"
            >
              <div className="p-5 flex justify-between items-center border-b border-gray-50">
                <div className="flex items-center space-x-2">
                  <img src={logo} alt="Logo" className="h-10 w-10 rounded-full border-2 border-green-500 p-0.5" />
                  <span className="font-black text-green-900 tracking-tight">PAC MENU</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-grow overflow-y-auto py-6 px-4 space-y-3">
                {[
                  { name: 'Home', path: '/', icon: '🏠' },
                  { name: 'Courses', path: '/courses', icon: '📚' },
                  { name: 'Board Exam', path: '/board-exam', icon: '📝', highlight: true },
                  { name: 'Contact', path: '/contact', icon: '📞' },
                  { name: 'About Us', path: '/about', icon: 'ℹ️' },
                  { name: 'Results', path: '/results', icon: '🏆' },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all active:scale-[0.98] ${
                      item.highlight 
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200 font-bold' 
                        : 'bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700 font-semibold'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="p-5 border-t border-gray-50 space-y-3 bg-gray-50/50">
                {user ? (
                  <div className="space-y-3">
                    {user.role === 'admin' && (
                      <Link
                        to="/admin-pac-portal"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center space-x-2 w-full p-4 bg-yellow-500 text-white font-black rounded-2xl shadow-lg active:scale-[0.98] transition-transform"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                        <span>Admin Portal</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full p-4 bg-white text-red-600 font-bold rounded-2xl border border-red-100 shadow-sm active:scale-[0.98] transition-transform"
                    >
                      Logout ({user.fullName.split(' ')[0]})
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center w-full p-4 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 shadow-sm active:scale-[0.98] transition-transform"
                  >
                    Student Login
                  </Link>
                )}
                <Link
                  to="/enroll"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center w-full p-4 bg-green-600 text-white font-black rounded-2xl shadow-lg shadow-green-200 active:scale-[0.98] transition-transform"
                >
                  Enroll Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
