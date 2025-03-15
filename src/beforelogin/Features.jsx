import { Users, Zap, Globe, Code, LineChart } from "lucide-react";

const features = [
  {
    icon: <Users size={44} className="text-blue-500" />,
    title: "Match with Developers",
    description: "Find developers with similar interests and skills to collaborate on projects.",
  },
  {
    icon: <Globe size={44} className="text-purple-500" />,
    title: "Global Developer Network",
    description: "Connect with developers from around the world and expand your professional network.",
  },
  {
    icon: <Zap size={44} className="text-amber-500" />,
    title: "Fast Pairing",
    description: "Pair with developers who share your skills and interests in a matter of minutes.",
  },
  {
    icon: <Code size={44} className="text-green-500" />,
    title: "Project Collaboration",
    description: "Find the perfect team for your next big idea or join exciting projects that match your skills.",
  },
  {
    icon: <LineChart size={44} className="text-red-500" />,
    title: "Track Progress",
    description: "Monitor your collaboration metrics and see how your network grows over time.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Platform</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-800">
            Why Choose <span className="text-blue-600">Connectify</span>?
          </h2>
          <p className="text-gray-600 text-lg">
            The ultimate platform for developers to connect, collaborate, and create amazing projects together.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col items-center"
            >
              <div className="bg-gray-50 p-4 rounded-full mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

    
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
            Start Connecting Today
          </button>
        </div>
      </div>
    </section>
  );
}