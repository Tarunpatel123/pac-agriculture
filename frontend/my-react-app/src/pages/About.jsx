import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-green-600 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About PAC Barwaha</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Providing Quality Education and Excellence in Agriculture & Science Coaching since 2010.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-green-600 pl-4">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              PAC Barwaha का मुख्य उद्देश्य ग्रामीण और शहरी क्षेत्रों के छात्रों को सस्ती और उच्च गुणवत्ता वाली शिक्षा प्रदान करना है। हम छात्रों को न केवल बोर्ड परीक्षाओं के लिए तैयार करते हैं, बल्कि उन्हें भविष्य की प्रतियोगी परीक्षाओं जैसे JET, ICAR और BHU के लिए भी सक्षम बनाते हैं।
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              हमारा मानना है कि सही मार्गदर्शन और कड़ी मेहनत से कोई भी छात्र सफलता की ऊंचाइयों को छू सकता है।
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
              alt="Students Learning" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why We Are Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold mb-2">Expert Teachers</h3>
              <p className="text-gray-600">Our faculty members are experts in their subjects with years of teaching experience.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Quality Material</h3>
              <p className="text-gray-600">We provide hand-written notes and simplified study material for better understanding.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-gray-600">Our students consistently achieve top ranks in board exams and competitive tests.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
