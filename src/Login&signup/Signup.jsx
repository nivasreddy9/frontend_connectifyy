import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Lock, Mail, Phone, Image } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
    photoUrl: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const { Name, Email, Password, Phone, photoUrl } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const urlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))/i;

    if (!Name || !Email || !Password || !Phone || !photoUrl) {
      setError("All fields are required.");
      return false;
    }
    if (!emailRegex.test(Email)) {
      setError("Invalid email format.");
      return false;
    }
    if (Password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!phoneRegex.test(Phone)) {
      setError("Phone number must be 10 digits.");
      return false;
    }
    if (!urlRegex.test(photoUrl)) {
      setError("Enter a valid image URL.");
      return false;
    }
    setError(""); // Reset error if everything is valid
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:1999/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response:", response.data);
  
      if (response.data.message === "Signin Successfull") {
        navigate('/dashboard', { 
          state: { 
            user: response.data.data, 
            message: "Welcome aboard!" 
          } 
        });
      } else {
        setError(response.data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      >
        <div className="p-4 space-y-4"> {/* Reduced padding */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
              <UserPlus className="text-blue-400" size={24} />
              Sign Up
            </h2>
            <p className="text-xs text-gray-300 mb-2">
              Create your account and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3"> {/* Reduced spacing */}
            <div className="space-y-3">
              {/* Name Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <UserPlus size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  name="Name" 
                  value={formData.Name} 
                  onChange={handleChange} 
                  className="w-full p-2 pl-8 text-sm bg-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
                  placeholder="Full Name" 
                  required 
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  name="Email" 
                  value={formData.Email} 
                  onChange={handleChange} 
                  className="w-full p-2 pl-8 text-sm bg-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
                  placeholder="Email Address" 
                  required 
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input 
                  type={passwordVisible ? "text" : "password"} 
                  name="Password" 
                  value={formData.Password} 
                  onChange={handleChange} 
                  className="w-full p-2 pl-8 text-sm bg-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
                  placeholder="Password" 
                  required 
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Phone size={16} className="text-gray-400" />
                </div>
                <input 
                  type="tel" 
                  name="Phone" 
                  value={formData.Phone} 
                  onChange={handleChange} 
                  className="w-full p-2 pl-8 text-sm bg-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
                  placeholder="Phone Number" 
                  required 
                />
              </div>

              {/* Photo URL Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Image size={16} className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  name="photoUrl" 
                  value={formData.photoUrl} 
                  onChange={handleChange} 
                  className="w-full p-2 pl-8 text-sm bg-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-white/30"
                  placeholder="Profile Photo URL" 
                  required 
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-600/20 border border-red-500 text-red-300 p-2 rounded-lg text-center text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full p-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Alternative Sign Up Options */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-4">
              <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <FaGoogle className="text-red-500" size={20} />
              </button>
              <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <FaGithub className="text-white" size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;