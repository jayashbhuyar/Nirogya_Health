import React from "react";
import {
  Heart,
  Users,
  Shield,
  Brain,
  Clock,
  Stethoscope,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className="relative h-[600px] bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-800 via-purple-800 to-indigo-800">
        <Navbar />  
      {/* Hero Section with Dynamic Background */}
      <div className="relative h-[700px] overflow-hidden">
        {/* Main Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-indigo-900/90" />
        <div className="absolute inset-0 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-blue-800/30 via-purple-800/30 to-indigo-800/30" />

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-40 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
        </div>

        {/* Content Container */}
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-white space-y-8 relative z-10">
              <div className="relative transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md group-hover:bg-blue-400/30 transition-all duration-300" />
                    <img
                      src="https://cdn.vectorstock.com/i/500p/80/33/health-nature-men-logo-vector-878033.jpg"
                      alt="Nirogya Logo"
                      className="w-20 h-20 rounded-full border-2 border-white/30 relative hover:border-white/50 transition-all duration-300"
                    />
                  </div>
                  <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 leading-tight">
                    Nirogya
                  </h1>
                </div>

                <div className="space-y-6">
                  <p className="text-3xl font-light leading-relaxed">
                    Bridging the gap between
                    <span className="block mt-2">
                      <span className="text-blue-300 font-medium">
                        technology
                      </span>{" "}
                      and{" "}
                      <span className="text-purple-300 font-medium">
                        healthcare
                      </span>
                    </span>
                  </p>
                  <p className="text-lg text-blue-100/80 max-w-md">
                    Empowering individuals with innovative healthcare solutions
                    for a healthier tomorrow
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-8">
                <button
                  className="group px-8 py-4 bg-white text-blue-900 rounded-full font-semibold 
                           hover:bg-blue-50 transition-all duration-300 hover:shadow-lg
                           hover:shadow-white/10 relative overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>
                <button
                  className="group px-8 py-4 border-2 border-white/70 text-white rounded-full 
                           font-semibold hover:border-white transition-all duration-300
                           hover:bg-white/10 relative overflow-hidden"
                >
                  <span className="relative z-10">Contact Us</span>
                  <div
                    className="absolute inset-0 bg-white/5 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="hidden md:block relative z-10">
              <div className="relative group">
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl 
                         opacity-30 group-hover:opacity-40 blur-lg transition-all duration-300"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                         rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
                <img
                  src="https://health-e.in/wp-content/uploads/2023/12/healthcare-concept-with-futuristic-design-graphics-medical-treatment-icons.webp"
                  alt="Healthcare Innovation"
                  className="rounded-2xl shadow-2xl relative z-10 transform 
                     hover:scale-[1.02] transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section with Cards */}
      <div className="container mx-auto px-6 py-24 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">About Us</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Nirogya is pioneering the future of healthcare delivery. We're
            building a platform that makes essential health services accessible
            to everyone, everywhere. Through innovative technology and
            compassionate care, we're empowering individuals and communities to
            take charge of their health journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Values Section with Gradient Cards */}
      <div className="bg-gradient-to-b from-white to-blue-50 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action with Animated Background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Us on Our Journey
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Be part of our mission to revolutionize healthcare and create a
            healthier future for all. Together, we can make quality healthcare
            accessible to everyone.
          </p>
          <button
            className="px-12 py-5 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 
                           transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div
    className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                  transform hover:-translate-y-2 relative overflow-hidden"
  >
    <div
      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"
    />
    <div className="relative">
      <div className="mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const ValueCard = ({ title, description }) => (
  <div
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300
                  transform hover:-translate-y-1 border border-gray-100"
  >
    <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
      <Sparkles className="text-blue-600 w-6 h-6" />
      {title}
    </h3>
    <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
  </div>
);

const features = [
  {
    title: "Reliable Services",
    description:
      "Experience healthcare solutions tailored to your unique needs, backed by cutting-edge technology and expert care.",
    icon: <Shield className="w-12 h-12" />,
  },
  {
    title: "Smart Monitoring",
    description:
      "Stay informed about your health with real-time tracking and intelligent analytics that provide actionable insights.",
    icon: <Brain className="w-12 h-12" />,
  },
  {
    title: "24/7 Support",
    description:
      "Access professional healthcare assistance anytime, anywhere. Our dedicated team is always here to help you.",
    icon: <Clock className="w-12 h-12" />,
  },
];

const values = [
  {
    title: "Innovation at Heart",
    description:
      "We constantly push the boundaries of what's possible in healthcare, leveraging cutting-edge technology to create solutions that make a real difference in people's lives.",
  },
  {
    title: "Compassionate Care",
    description:
      "Every decision we make is rooted in empathy and understanding. We believe in treating each individual with the care, respect, and attention they deserve.",
  },
];

export default About;
