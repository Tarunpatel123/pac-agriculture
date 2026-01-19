import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Results from './pages/Results'
import Faculty from './pages/Faculty'
import Contact from './pages/Contact'
import FeatureDetail from './pages/FeatureDetail'
import Enroll from './pages/Enroll'
import About from './pages/About'
import BoardExam from './pages/BoardExam'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('pac_user');
      if (userStr && userStr !== 'undefined') {
        setUser(JSON.parse(userStr));
      }
    } catch (err) {
      console.error('Error parsing user data:', err);
      localStorage.removeItem('pac_user');
      localStorage.removeItem('pac_token');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pac_token');
    localStorage.removeItem('pac_user');
    setUser(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Silent Visit Tracker
  useEffect(() => {
    // Skip tracking for Admin Portal visits
    if (location.pathname === '/admin-pac-portal') return;

    const trackVisit = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlParams = Object.fromEntries(params.entries());
        
        const extraInfo = {
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language || 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        
        const API_BASE_URL = import.meta.env.VITE_API_URL || '';
        await fetch(`${API_BASE_URL}/api/track-visit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            urlParams,
            pagePath: location.pathname,
            extraInfo
          })
        });
      } catch (err) {
        console.error('Tracking failed', err);
      }
    };
    trackVisit();
  }, [location.pathname]); // Track on every page change

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!isAuthPage && <Header user={user} onLogout={handleLogout} />}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Content Routes */}
          <Route path="/courses" element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } />
          <Route path="/faculty" element={
            <ProtectedRoute>
              <Faculty />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/board-exam" element={
            <ProtectedRoute>
              <BoardExam />
            </ProtectedRoute>
          } />
          <Route path="/enroll" element={
            <ProtectedRoute>
              <Enroll />
            </ProtectedRoute>
          } />
          
          <Route path="/admin-pac-portal" element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          } />
          
          {/* Feature Detail Routes (Protected) */}
          <Route path="/feature/board-exam" element={
            <ProtectedRoute>
              <FeatureDetail 
                title="Board Exam Preparation" 
                icon="📖"
                content={
                  <div className="space-y-6">
                    <p className="text-xl font-semibold text-green-700">11th & 12th Board Exams (Science & Agriculture Stream)</p>
                    <p>PAC Barwaha में हम बोर्ड परीक्षाओं के लिए एक सुनियोजित दृष्टिकोण अपनाते हैं। हमारा लक्ष्य न केवल सिलेबस पूरा करना है, बल्कि छात्रों को प्रत्येक विषय की गहरी समझ प्रदान करना है।</p>
                    <h3 className="text-2xl font-bold mt-8">मुख्य विशेषताएँ:</h3>
                    <ul className="list-disc pl-6 space-y-3">
                      <li><strong>NCERT आधारित शिक्षण:</strong> बोर्ड परीक्षा के नवीनतम पैटर्न के अनुसार विस्तृत कवरेज।</li>
                      <li><strong>Agriculture स्पेशल बैच:</strong> 11वीं और 12वीं कृषि संकाय के लिए विशेष कक्षाएं और नोट्स।</li>
                      <li><strong>हस्तलिखित नोट्स:</strong> शिक्षकों द्वारा तैयार सरल भाषा में प्रीमियम नोट्स।</li>
                      <li><strong>महत्वपूर्ण प्रश्न बैंक:</strong> पिछले 10 वर्षों के बोर्ड प्रश्नों का गहन अभ्यास।</li>
                    </ul>
                  </div>
                }
              />
            </ProtectedRoute>
          } />
          <Route path="/feature/agri-science" element={
            <ProtectedRoute>
              <FeatureDetail 
                title="Agriculture & Science" 
                icon="🌾"
                content={
                  <div className="space-y-6">
                    <p className="text-xl font-semibold text-green-700">Deep Dive into Agricultural Sciences</p>
                    <p>कृषि और विज्ञान के क्षेत्र में करियर बनाने वाले छात्रों के लिए PAC Barwaha सबसे भरोसेमंद संस्थान है। हम विज्ञान के सिद्धांतों को कृषि के व्यावहारिक ज्ञान के साथ जोड़ते हैं।</p>
                    <h3 className="text-2xl font-bold mt-8">पाठ्यक्रम का विवरण:</h3>
                    <ul className="list-disc pl-6 space-y-3">
                      <li><strong>फसल उत्पादन (Crop Production):</strong> उन्नत कृषि तकनीकों का विस्तृत अध्ययन।</li>
                      <li><strong>पशुपालन (Animal Husbandry):</strong> डेयरी विज्ञान और पशु प्रबंधन की बारीकियाँ।</li>
                      <li><strong>भौतिकी और रसायन (Physics & Chemistry):</strong> विज्ञान के कठिन विषयों को सरल तरीके से समझना।</li>
                      <li><strong>प्रायोगिक ज्ञान:</strong> सैद्धांतिक पढ़ाई के साथ-साथ प्रैक्टिकल चार्ट और मॉडल्स के माध्यम से शिक्षण।</li>
                    </ul>
                  </div>
                }
              />
            </ProtectedRoute>
          } />
          <Route path="/feature/test-series" element={
            <ProtectedRoute>
              <FeatureDetail 
                title="Weekly Test Series" 
                icon="📝"
                content={
                  <div className="space-y-6">
                    <p className="text-xl font-semibold text-green-700">Regular Evaluation for Excellence</p>
                    <p>अभ्यास ही सफलता की कुंजी है। हमारी साप्ताहिक टेस्ट सीरीज छात्रों को परीक्षा के माहौल के लिए तैयार करती है और उनके आत्मविश्वास को बढ़ाती है।</p>
                    <h3 className="text-2xl font-bold mt-8">टेस्ट सीरीज की रूपरेखा:</h3>
                    <ul className="list-disc pl-6 space-y-3">
                      <li><strong>साप्ताहिक ओएमआर टेस्ट:</strong> प्रतियोगी परीक्षाओं (PAT/CPAT) के लिए विशेष अभ्यास।</li>
                      <li><strong>विषय-वार मूल्यांकन:</strong> प्रत्येक अध्याय की समाप्ति पर यूनिट टेस्ट।</li>
                      <li><strong>प्रदर्शन विश्लेषण:</strong> टेस्ट के बाद व्यक्तिगत फीडबैक और सुधार के सुझाव।</li>
                      <li><strong>रैंकिंग सिस्टम:</strong> छात्रों के बीच स्वस्थ प्रतिस्पर्धा को बढ़ावा देने के लिए।</li>
                    </ul>
                  </div>
                }
              />
            </ProtectedRoute>
          } />
          <Route path="/feature/career-guidance" element={
            <ProtectedRoute>
              <FeatureDetail 
                title="Career Guidance" 
                icon="🚀"
                content={
                  <div className="space-y-6">
                    <p className="text-xl font-semibold text-green-700">Shaping Your Professional Future</p>
                    <p>सही मार्गदर्शन सफलता की पहली सीढ़ी है। PAC Barwaha में हम छात्रों को उनके भविष्य के करियर विकल्पों के बारे में जागरूक करते हैं।</p>
                    <h3 className="text-2xl font-bold mt-8">करियर के अवसर:</h3>
                    <ul className="list-disc pl-6 space-y-3">
                      <li><strong>B.Sc. Agriculture:</strong> देश के प्रतिष्ठित कृषि विश्वविद्यालयों में प्रवेश की जानकारी।</li>
                      <li><strong>JET/ICAR/CUET:</strong> टॉप प्रवेश परीक्षाओं के लिए विशेष मार्गदर्शन।</li>
                      <li><strong>Government Jobs:</strong> कृषि पर्यवेक्षक (Agri Supervisor) और अन्य सरकारी नौकरियों की तैयारी।</li>
                      <li><strong>Entrepreneurship:</strong> आधुनिक खेती और कृषि-व्यवसाय में स्वरोजगार के अवसर।</li>
                    </ul>
                  </div>
                }
              />
            </ProtectedRoute>
          } />
          <Route path="/feature/practical-knowledge" element={
            <ProtectedRoute>
              <FeatureDetail 
                title="Practical Knowledge" 
                icon="🔬"
                content={
                  <div className="space-y-6">
                    <p className="text-xl font-semibold text-green-700">Learning by Doing</p>
                    <p>केवल किताबी ज्ञान पर्याप्त नहीं है। हम छात्रों को कृषि और विज्ञान के वास्तविक अनुप्रयोगों से परिचित कराते हैं।</p>
                    <h3 className="text-2xl font-bold mt-8">प्रायोगिक शिक्षण के घटक:</h3>
                    <ul className="list-disc pl-6 space-y-3">
                      <li><strong>Field Visits:</strong> स्थानीय कृषि फार्मों का भ्रमण।</li>
                      <li><strong>Laboratory Sessions:</strong> विज्ञान के प्रयोगों का जीवंत प्रदर्शन।</li>
                      <li><strong>Visual Aids:</strong> प्रोजेक्टर्स और 3D मॉडल्स के माध्यम से जटिल विषयों का सरलीकरण।</li>
                      <li><strong>Expert Guest Lectures:</strong> कृषि वैज्ञानिकों और सफल किसानों के साथ अनुभव साझा करना।</li>
                    </ul>
                  </div>
                }
              />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}

      {/* WhatsApp Floating Button */}
      {!isAuthPage && (
        <a
          href="https://wa.me/917697783189"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Contact on WhatsApp"
        >
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute right-full mr-4 bg-white text-green-600 px-4 py-2 rounded-xl shadow-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-green-100">
            WhatsApp पर संपर्क करें
          </span>
        </a>
      )}
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App
