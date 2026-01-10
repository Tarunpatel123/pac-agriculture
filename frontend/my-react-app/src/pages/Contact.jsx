const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-green-900 mb-12">Contact Us</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input type="tel" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="Your Phone Number" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-32" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">Send Message</button>
          </form>
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Visit Us</h3>
            <p className="text-gray-600">Main Road, Near Bus Stand,<br />Barwaha, Madhya Pradesh</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
            <p className="text-gray-600">+91 7697783189</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
            <p className="text-gray-600">yogeshpatel.at@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;