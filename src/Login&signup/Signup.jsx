import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, UserPlus, Lock, Mail, Phone, Image, Calendar, Users, CheckCircle } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import Base_url from "../utils/baseurl";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
    photoUrl: "",
    Gender: "",
    Age: ""
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Success state for popup

  const validateForm = () => {
    const { Name, Email, Password, Phone, photoUrl, Gender, Age } = formData;
    if (!Name || !Email || !Password || !Phone || !photoUrl || !Gender || !Age) {
      setError("All fields are required.");
      return false;
    }
    setError("");
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
      const response = await axios.post(+Base_url+"/signin", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.message === "Signin Successfull") {
        setIsSuccess(true); // Show success popup
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/feed", { state: { user: response.data.data } });
        }, 3000);
      } else {
        setError(response.data.message || "Signup failed.");
      }
    } catch (err) {
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
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
            <UserPlus className="text-blue-400" size={24} />
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="Name" value={formData.Name} onChange={handleChange} className="w-full p-2 bg-white/20 text-white rounded-lg placeholder-gray-300" placeholder="Full Name" required />
            <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="w-full p-2 bg-white/20 text-white rounded-lg placeholder-gray-300" placeholder="Email Address" required />
            
            <div className="relative">
              <input type={passwordVisible ? "text" : "password"} name="Password" value={formData.Password} onChange={handleChange} className="w-full p-2 bg-white/20 text-white rounded-lg placeholder-gray-300" placeholder="Password" required />
              <button type="button" className="absolute inset-y-0 right-2 text-gray-400" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <input type="tel" name="Phone" value={formData.Phone} onChange={handleChange} className="w-full p-2 bg-white/20 text-white rounded-lg placeholder-gray-300" placeholder="Phone Number" required />

            <select name="Gender" value={formData.Gender} onChange={handleChange} className="w-full p-2 bg-white/20 text-white rounded-lg placeholder-gray-300" required>
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input type="number" name="Age" value={formData.Age} onChange={handleChange} className="w-full p-2 bg-white/20 text-white rounded-lg placeholder-gray-300" placeholder="Age" min="18" max="120" required />

            <input type="text" name="photoUrl" value={formData.photoUrl} onChange={handleChange} className="w-full p-2 bg-white/20 text-white rounded-lg placeholder-gray-300" placeholder="Profile Photo URL" required />

            {error && <div className="bg-red-600/20 border border-red-500 text-red-300 p-2 rounded-lg text-center">{error}</div>}

            <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
              {isLoading ? <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full"></div> : "Create Account"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center">
            Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Log In</Link>
          </p>
        </div>
      </motion.div>

      {/* Success Popup */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle size={24} />
            Signup Successful! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Signup;
