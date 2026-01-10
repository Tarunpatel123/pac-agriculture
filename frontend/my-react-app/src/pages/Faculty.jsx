const Faculty = () => {
  const teachers = [
    { name: "Prof. Sharma", subject: "Agriculture Specialist", experience: "15+ Years" },
    { name: "Dr. Verma", subject: "Biology", experience: "10+ Years" },
    { name: "Mr. Gupta", subject: "Chemistry", experience: "12+ Years" },
    { name: "Ms. Patel", subject: "Physics", experience: "8+ Years" }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-green-900 mb-12">Expert Faculty</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teachers.map((teacher, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:scale-105 transition">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👨‍🏫</div>
            <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
            <p className="text-green-600 font-medium">{teacher.subject}</p>
            <p className="text-gray-500 text-sm mt-1">{teacher.experience} Experience</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;