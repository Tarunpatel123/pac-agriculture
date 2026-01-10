import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        await fetch(`${API_BASE_URL}/api/track-share`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform: 'Web Share API' })
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
        window.open(whatsappUrl, '_blank');
        
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        await fetch(`${API_BASE_URL}/api/track-share`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform: 'WhatsApp (Fallback)' })
        });
      }
    } catch (err) {
      console.error('Share failed', err);
    }
  };

  return (
    <header className="bg-green-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Desktop Left Nav / Mobile Spacer */}
          <div className="flex-1 hidden md:flex">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-green-700 font-bold transition">Home</Link>
              <Link to="/courses" className="text-gray-700 hover:text-green-700 font-bold transition">Courses</Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-700 font-bold transition">Contact</Link>
            </nav>
          </div>
          <div className="flex-1 md:hidden"></div> {/* Mobile Spacer to center logo */}

          {/* Centered Logo */}
          <div className="flex justify-center flex-1">
            <Link to="/" className="flex flex-col items-center">
              <img src={logo} alt="PAC Barwaha Logo" className="h-14 w-14 md:h-20 md:w-20 object-contain rounded-full border-2 border-green-600 bg-white" />
              <span className="text-sm md:text-xl font-bold text-green-900 mt-1">PAC Barwaha</span>
            </Link>
          </div>

          {/* Desktop Right Nav */}
          <nav className="hidden md:flex items-center justify-end space-x-6 flex-1">
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 text-green-700 hover:text-green-800 font-bold transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100 2.684m0-2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
              <span>Share</span>
            </button>
            <Link to="/enroll" className="bg-green-600 text-white px-5 py-2 rounded-full font-bold hover:bg-green-700 transition shadow-md whitespace-nowrap">Enroll Now</Link>
          </nav>

          {/* Mobile Menu Button - Absolute Right on Mobile */}
          <div className="md:hidden flex-1 flex justify-end">
            <button 
              className="text-green-800 focus:outline-none p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-green-50 px-4 pt-2 pb-4 space-y-2 border-t border-green-200">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-700 font-bold py-2">Home</Link>
          <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-700 font-bold py-2">Courses</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-gray-700 hover:text-green-700 font-bold py-2">Contact</Link>
          <button 
            onClick={() => { handleShare(); setIsMenuOpen(false); }}
            className="w-full flex items-center justify-center space-x-2 text-green-700 hover:text-green-800 font-bold py-2 border-t border-green-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100 2.684m0-2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
            </svg>
            <span>Share Website</span>
          </button>
          <Link to="/enroll" onClick={() => setIsMenuOpen(false)} className="block bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition text-center mt-4">Enroll Now</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
