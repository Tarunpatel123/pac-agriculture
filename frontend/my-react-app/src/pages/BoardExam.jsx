import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const BoardExam = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/materials`);
      setMaterials(response.data.materials);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id, url) => {
    try {
      await axios.post(`${API_BASE_URL}/api/materials/${id}/download`);
      window.open(url, '_blank');
      // Refresh to update download count if needed, or just let it be
    } catch (error) {
      console.error('Error tracking download:', error);
      window.open(url, '_blank'); // Open anyway
    }
  };

  const filteredMaterials = filter === 'All' 
    ? materials 
    : materials.filter(m => m.category === filter || (filter === 'Board Exam' && m.category === 'Board Exam'));

  const categories = ['All', 'Board Exam', 'Notes', 'PDF'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            Board Exam <span className="text-green-600">Preparation</span> 📚
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Download high-quality notes, previous year questions, and preparation materials specially curated for Agriculture students.
          </p>
        </motion.div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-105' 
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Materials Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-green-100 transition-all group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      📥 {item.downloadCount || 0} downloads
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {item.description || 'Access and download this study material for your exam preparation.'}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="text-[10px] text-gray-400 font-medium">
                      Added: {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <button 
                      onClick={() => handleDownload(item._id, item.fileUrl)}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <span>Download</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredMaterials.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <div className="text-5xl mb-4">📁</div>
                <h3 className="text-xl font-bold text-gray-400">No materials available yet</h3>
                <p className="text-gray-500">Check back soon for new updates!</p>
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 bg-green-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-green-200"
        >
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black mb-4">Want to Join Our Batch? 🚀</h2>
            <p className="text-green-100 mb-8 max-w-xl mx-auto">
              Get personalized guidance, live classes, and exclusive test series to score 95%+ in your board exams.
            </p>
            <a 
              href="/enroll" 
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-black hover:bg-green-50 transition-all scale-100 hover:scale-105 active:scale-95"
            >
              Enroll Now for 2026
            </a>
          </div>
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default BoardExam;
