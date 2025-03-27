import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Lock, Mail } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Base_url from "../utils/baseurl";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ Email: "narendramodi685@gmail.com", Password: "Modi685@" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${Base_url}/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ Ensures cookies are sent
        }
      );

      console.log("Response:", response.data);

      if (response.data?.message?.toLowerCase().includes("login successful")) {
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        dispatch(addUser(response.data.data));

        navigate("/feed", {
          state: { user: response.data.data, message: "Welcome back!" },
        });
      } else {
        setError(response.data?.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login Error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Something went wrong.");
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
        <div className="p-4 space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <LogIn className="text-blue-400" size={24} /> Login
            </h2>
            <p className="text-xs text-gray-300">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-2 top-3 text-gray-400" size={16} />
              <input 
                type="email" 
                name="Email" 
                value={formData.Email} 
                onChange={handleChange} 
                className="w-full p-2 pl-8 text-sm bg-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 border border-white/30"
                placeholder="Email Address" 
                required 
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-2 top-3 text-gray-400" size={16} />
              <input 
                type={passwordVisible ? "text" : "password"} 
                name="Password" 
                value={formData.Password} 
                onChange={handleChange} 
                className="w-full p-2 pl-8 text-sm bg-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 border border-white/30"
                placeholder="Password" 
                required 
              />
              <button 
                type="button" 
                className="absolute right-2 top-2 text-gray-400"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-blue-400 hover:underline">
                Forgot Password?
              </Link>
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
              className="w-full p-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full"></div>
              ) : "Login"}
            </button>
          </form>

          {/* Alternative Login */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="h-px w-1/4 bg-white/20"></div>
              <span className="text-xs text-gray-400">Or continue with</span>
              <div className="h-px w-1/4 bg-white/20"></div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button className="bg-white/10 p-2 rounded-full hover:bg-white/20">
                <FaGoogle className="text-red-500" size={20} />
              </button>
              <button className="bg-white/10 p-2 rounded-full hover:bg-white/20">
                <FaGithub className="text-white" size={20} />
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
