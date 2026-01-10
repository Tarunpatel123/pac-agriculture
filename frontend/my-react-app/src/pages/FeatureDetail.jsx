const FeatureDetail = ({ title, content, icon }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-4xl mr-6">
            {icon}
          </div>
          <h1 className="text-4xl font-bold text-green-900">{title}</h1>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;