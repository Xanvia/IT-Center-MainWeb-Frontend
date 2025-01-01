import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-rubik font-bold text-center my-12 text-maroon">
          Get in Touch with Us!
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-2xl text-yellow-500 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-3">Our Location</h2>
                <p className="text-gray-600 leading-relaxed">
                  Information Technology Center
                  <br />
                  University of Peradeniya
                  <br />
                  Peradeniya,
                  <br />
                  Sri Lanka
                </p>
              </div>
            </div>
          </div>

          {/* Contact Numbers Section */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <FaPhone className="text-2xl text-yellow-500 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-3">Contact Numbers</h2>
                <div className="text-gray-600 space-y-2">
                  <p>+94 (0) 81 2384848</p>
                  <p>+94 (0) 81 2392070</p>
                  <p>+94 (0) 81 2392900</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-2xl text-yellow-500 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-3">Email Us</h2>
                <a
                  href="mailto:info@ceit.pdn.ac.lk"
                  className="text-yellow-600 hover:text-yellow-800 transition-colors"
                >
                  info@ceit.pdn.ac.lk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
