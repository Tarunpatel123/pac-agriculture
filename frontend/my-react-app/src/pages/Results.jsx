const Results = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-green-900 mb-8">Our Results</h1>
      <p className="text-xl text-gray-600 mb-12">Proud moments of PAC Barwaha. Our toppers from previous years.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">👤</div>
            <h3 className="text-xl font-bold text-gray-800">Student Name</h3>
            <p className="text-green-600 font-bold">95% in 12th Boards</p>
            <p className="text-gray-500 text-sm mt-2">Class of 2024</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;