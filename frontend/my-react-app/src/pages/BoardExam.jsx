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
    <div className="min-h-screen bg-gray-50 py-16 md:py-24 px-4 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100/30 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/20 rounded-full blur-3xl -ml-64 -mb-64"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-green-600 font-black uppercase tracking-[0.25em] text-[10px] md:text-sm bg-green-50 px-5 py-2.5 rounded-full mb-8 inline-block shadow-sm">Resource Center</span>
          <h1 className="text-4xl md:text-8xl font-black text-gray-900 mt-6 tracking-tight leading-none">
            Board Exam <span className="text-green-600">Preparation</span> 📚
          </h1>
          <div className="w-24 md:w-40 h-2 md:h-3.5 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-10 rounded-full shadow-lg shadow-green-900/20"></div>
          <p className="text-lg md:text-2xl text-gray-500 mt-10 md:mt-12 max-w-3xl mx-auto font-medium leading-relaxed px-4">
            Download premium notes, previous year papers, and curated preparation materials designed for 95%+ success.
          </p>
        </motion.div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 md:mb-24">
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3.5 rounded-2xl text-sm md:text-base font-black transition-all duration-500 ${
                filter === cat 
                  ? 'bg-green-600 text-white shadow-2xl shadow-green-600/30 -translate-y-1' 
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-100 shadow-sm hover:shadow-lg'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Materials Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-600"></div>
              <div className="absolute top-0 left-0 animate-ping rounded-full h-20 w-20 border-4 border-green-200 opacity-20"></div>
            </div>
            <p className="mt-8 text-gray-400 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Resources...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredMaterials.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-xl shadow-green-900/5 border border-gray-100/50 overflow-hidden hover:shadow-2xl hover:shadow-green-900/15 transition-all duration-700 hover:-translate-y-3 flex flex-col"
              >
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <span className="bg-green-50 text-green-700 text-[10px] md:text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">
                      {item.category}
                    </span>
                    <div className="bg-gray-50 text-gray-500 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 border border-gray-100">
                      <span className="text-lg">📥</span> {item.downloadCount || 0}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-green-600 transition-colors tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 text-base md:text-lg mb-8 line-clamp-3 font-medium leading-relaxed flex-1">
                    {item.description || 'Access and download this specialized study material to boost your exam scores.'}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-50">
                    <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(item._id, item.fileUrl)}
                      className="bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-black hover:bg-green-600 transition-all flex items-center gap-3 shadow-lg shadow-gray-900/10 active:shadow-none"
                    >
                      <span>Download</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredMaterials.length === 0 && (
              <div className="col-span-full py-32 text-center bg-white/50 backdrop-blur-sm rounded-[3rem] md:rounded-[4rem] border-4 border-dashed border-gray-100/50">
                <div className="text-7xl md:text-9xl mb-8 opacity-20 grayscale">📁</div>
                <h3 className="text-2xl md:text-4xl font-black text-gray-400 mb-4">No resources found</h3>
                <p className="text-gray-500 text-lg md:text-xl font-medium">Check back later or try a different category!</p>
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 bg-[#0a0f0d] rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-green-950/20"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">Master Your Exams 🚀</h2>
            <p className="text-gray-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Get 1-on-1 mentorship and full syllabus coverage to ensure your place among the toppers.
            </p>
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              href="/enroll" 
              className="inline-block bg-green-500 text-white px-12 py-5 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl hover:bg-green-400 transition-all shadow-xl shadow-green-500/20"
            >
              Enroll for 2026 Batch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BoardExam;
