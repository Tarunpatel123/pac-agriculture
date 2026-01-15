import { motion } from 'framer-motion';

const Results = () => {
  const stats = [
    { label: "Top Selections", value: "500+" },
    { label: "Success Rate", value: "98%" },
    { label: "Expert Faculty", value: "15+" },
    { label: "Years Excellence", value: "12+" }
  ];

  const toppers = [
    { name: "Rahul Sharma", score: "96.4%", exam: "12th Board", year: "2024", rank: "State Rank 5" },
    { name: "Priya Patel", score: "95.8%", exam: "12th Board", year: "2024", rank: "District Topper" },
    { name: "Amit Kumar", score: "94.2%", exam: "12th Board", year: "2023", rank: "State Rank 12" },
    { name: "Sneha Gupta", score: "93.5%", exam: "12th Board", year: "2023", rank: "District Rank 3" },
    { name: "Vikram Singh", score: "92.8%", exam: "12th Board", year: "2022", rank: "State Rank 25" },
    { name: "Anjali Verma", score: "91.5%", exam: "12th Board", year: "2022", rank: "District Rank 8" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-green-600 font-black uppercase tracking-[0.2em] text-[10px] md:text-sm bg-green-50 px-4 py-2 rounded-full">Excellence Delivered</span>
          <h1 className="text-4xl md:text-8xl font-black text-gray-900 mt-6 tracking-tight">Our <span className="text-green-600">Results</span></h1>
          <div className="w-20 md:w-32 h-2 md:h-3 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mt-8 rounded-full shadow-lg shadow-green-900/20"></div>
          <p className="text-lg md:text-2xl text-gray-500 mt-8 md:mt-10 max-w-3xl mx-auto font-medium leading-relaxed px-4">
            Proud moments of PAC Barwaha. Witness the success stories of our hard-working students who achieved excellence.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-green-900/5 text-center border border-gray-100"
            >
              <h4 className="text-3xl md:text-5xl font-black text-green-600 mb-2">{stat.value}</h4>
              <p className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Toppers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {toppers.map((topper, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl shadow-green-900/5 hover:shadow-2xl hover:shadow-green-900/15 transition-all duration-700 hover:-translate-y-3 border border-gray-100/50 text-center relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-1000 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl md:text-5xl shadow-inner border border-green-100 group-hover:scale-110 transition-transform duration-700">
                  <span className="grayscale group-hover:grayscale-0 transition-all duration-700">👤</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">{topper.name}</h3>
                <div className="inline-block px-4 py-1.5 bg-green-600 text-white rounded-full text-sm md:text-base font-black mb-4 shadow-lg shadow-green-600/20">
                  {topper.score}
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 font-bold text-xs md:text-sm uppercase tracking-wider">{topper.exam} • {topper.year}</p>
                  <p className="text-green-600 font-black text-sm md:text-base italic">{topper.rank}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 md:mt-32 bg-gradient-to-br from-green-600 to-emerald-700 rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-green-900/20"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8 md:mb-10 relative z-10 tracking-tight leading-tight">Be our next <span className="text-yellow-300 underline decoration-yellow-300/30 underline-offset-8">success story!</span></h2>
          <p className="text-green-50 text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed opacity-90">
            Join the ranks of high achievers and pave your way to a glorious future in Agriculture and Science.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#059669" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 md:px-14 py-4 md:py-6 bg-transparent border-4 border-white text-white font-black rounded-2xl md:rounded-3xl transition-all relative z-10 text-base md:text-xl"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;