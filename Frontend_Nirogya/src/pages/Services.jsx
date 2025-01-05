import React from "react";
import Navbar from "./Navbar";

const services = [
  {
    id: 1,
    title: "General Checkup",
    description:
      "Stay on top of your health with regular checkups tailored to your needs. Our expert doctors ensure early detection and prevention of potential health issues.",
    image: "https://th.bing.com/th/id/OIP.Jkp7_1iBY8tVLtTEHzOiPQHaE7?rs=1&pid=ImgDetMain", // Replace with actual service image URLs
  },
  {
    id: 2,
    title: "Dermatology",
    description:
      "Comprehensive care for all skin, hair, and nail concerns. From acne treatment to advanced skin care solutions, we’ve got you covered.",
    image: "https://th.bing.com/th/id/OIP.sUNLXe4MNe5D66v8wBe7RwHaE8?rs=1&pid=ImgDetMain",
  },
  {
    id: 3,
    title: "Cardiology",
    description:
      "Your heart deserves the best care. Our cardiology services include advanced diagnostics, treatments, and preventive care.",
    image: "https://www.dashospital.com/myimages/services/cardiology-1.jpg",
  },
  {
    id: 4,
    title: "Neurology",
    description:
      "Expert care for brain and nervous system disorders. We specialize in treating migraines, epilepsy, strokes, and more.",
    image: "https://careandcurehospital.co.in/wp-content/uploads/2022/02/neurology-manu-hospital.jpg",
  },
  {
    id: 5,
    title: "Pediatrics",
    description:
      "Providing compassionate care for your little ones. From vaccinations to growth monitoring, we ensure their healthy development.",
    image: "https://sagitarius.ge/wp-content/uploads/2018/11/Pediatrics.jpg",
  },
  {
    id: 6,
    title: "Orthopedics",
    description:
      "Get relief from bone and joint pain with our specialized orthopedic services. We offer surgical and non-surgical treatments.",
    image: "https://www.paintreatmentdirectory.com/uploads/news-pictures/2-delmar-blog-post-image-20220815113212.jpeg",
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-gray-50">
        <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg">
            At Nirogya, we provide a wide range of healthcare services to meet
            your needs. Explore our offerings and find the care you deserve.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-8">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 italic">
                "The dermatology services at Nirogya are exceptional. My skin
                has never felt better!"
              </p>
              <h4 className="mt-4 font-bold text-gray-800">- Priya Sharma</h4>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 italic">
                "The cardiology team is amazing. They made me feel at ease
                throughout my treatment."
              </p>
              <h4 className="mt-4 font-bold text-gray-800">- Rahul Verma</h4>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600 italic">
                "My child received excellent care from the pediatrics
                department. Highly recommend!"
              </p>
              <h4 className="mt-4 font-bold text-gray-800">- Meera Patel</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Book Your Appointment</h2>
          <p className="mb-8">
            Don’t wait to take care of your health. Schedule an appointment with
            our specialists today!
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition-all duration-300">
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
