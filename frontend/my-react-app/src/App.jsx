import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
import Admin from './pages/Admin'

function AppContent() {
  const location = useLocation();

  // Silent Visit Tracker
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlParams = Object.fromEntries(params.entries());
        
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
        await fetch(`${API_BASE_URL}/api/track-visit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            urlParams,
            pagePath: location.pathname 
          })
        });
      } catch (err) {
        console.error('Tracking failed', err);
      }
    };
    trackVisit();
  }, [location.pathname]); // Track on every page change

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/results" element={<Results />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-pac-portal" element={<Admin />} />
          
          {/* Feature Detail Routes */}
          <Route path="/feature/board-exam" element={
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
          } />
          <Route path="/feature/agri-science" element={
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
          } />
          <Route path="/feature/test-series" element={
            <FeatureDetail 
              title="Weekly Test Series" 
              icon="📝"
              content={
                <div className="space-y-6">
                  <p className="text-xl font-semibold text-green-700">Regular Evaluation for Excellence</p>
                  <p>अभ्यास ही सफलता की कुंजी है। हमारी साप्ताहिक टेस्ट सीरीज छात्रों को परीक्षा के माहौल के लिए तैयार करती है और उनके आत्मविश्वास को बढ़ाती है।</p>
                  <h3 className="text-2xl font-bold mt-8">टेस्ट सीरीज की रूपरेखा:</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li><strong>Chapter-wise Tests:</strong> हर अध्याय के पूरा होने पर तुरंत मूल्यांकन।</li>
                    <li><strong>Full Syllabus Mock Tests:</strong> बोर्ड परीक्षा से पहले 5 प्री-बोर्ड परीक्षाएं।</li>
                    <li><strong>ओएमआर प्रैक्टिस:</strong> प्रतियोगी परीक्षाओं (JET/ICAR) के लिए OMR आधारित अभ्यास।</li>
                    <li><strong>व्यक्तिगत फीडबैक:</strong> प्रत्येक छात्र के प्रदर्शन का विश्लेषण और सुधार के सुझाव।</li>
                  </ul>
                </div>
              }
            />
          } />
          <Route path="/feature/doubt-clearing" element={
            <FeatureDetail 
              title="Doubt Clearing Sessions" 
              icon="🙋‍♂️"
              content={
                <div className="space-y-6">
                  <p className="text-xl font-semibold text-green-700">No More Confusion, Only Clarity</p>
                  <p>हमारा मानना है कि कोई भी प्रश्न छोटा नहीं होता। डाउट क्लियरिंग सेशन्स में छात्र बेझिझक अपने शिक्षकों से सवाल पूछ सकते हैं।</p>
                  <h3 className="text-2xl font-bold mt-8">हमारी प्रक्रिया:</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li><strong>Daily Doubt Hour:</strong> प्रत्येक कक्षा के बाद 15 मिनट का समर्पित समय।</li>
                    <li><strong>One-on-One Interaction:</strong> कठिन विषयों के लिए शिक्षकों के साथ व्यक्तिगत चर्चा।</li>
                    <li><strong>Revision Classes:</strong> परीक्षा के समय विशेष रिवीज़न और डाउट सत्र।</li>
                    <li><strong>WhatsApp Support:</strong> घर पर पढ़ाई के दौरान आने वाले डाउट्स के लिए डिजिटल सहायता।</li>
                  </ul>
                </div>
              }
            />
          } />
          <Route path="/feature/career-counseling" element={
            <FeatureDetail 
              title="Career Counseling" 
              icon="🎓"
              content={
                <div className="space-y-6">
                  <p className="text-xl font-semibold text-green-700">Path to a Bright Future</p>
                  <p>12वीं के बाद क्या? यह सवाल हर छात्र को परेशान करता है। PAC Barwaha में हम आपको सही राह चुनने में मदद करते हैं।</p>
                  <h3 className="text-2xl font-bold mt-8">करियर विकल्प जिन पर हम चर्चा करते हैं:</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li><strong>B.Sc. Agriculture:</strong> देश के प्रतिष्ठित कृषि विश्वविद्यालयों में प्रवेश की जानकारी।</li>
                    <li><strong>JET/ICAR/CUET:</strong> टॉप प्रवेश परीक्षाओं के लिए विशेष मार्गदर्शन।</li>
                    <li><strong>Government Jobs:</strong> कृषि पर्यवेक्षक (Agri Supervisor) और अन्य सरकारी नौकरियों की तैयारी।</li>
                    <li><strong>Entrepreneurship:</strong> आधुनिक खेती और कृषि-व्यवसाय में स्वरोजगार के अवसर।</li>
                  </ul>
                </div>
              }
            />
          } />
          <Route path="/feature/practical-knowledge" element={
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
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
