import { Code, Menu, ChevronDown, Edit, Settings, LogOut, User, Handshake, MessageSquare, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Login&signup/Logout";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = Boolean(user && typeof user === 'object' && Object.keys(user).length > 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [isLoggedIn]);

  const getPhotoUrl = () => {
    if (!user) return null;
    if (user.photoUrl) return user.photoUrl;
    if (user.data?.photoUrl) return user.data.photoUrl;
    if (user.photo) return user.photo;
    if (user.profilePic) return user.profilePic;
    if (user.avatar) return user.avatar;
    if (user.image) return user.image;
    return null;
  };

  const getUserName = () => {
    if (!user) return "User";
    if (user.Name) return user.Name;
    if (user.data?.Name) return user.data.Name;
    if (user.name) return user.name;
    if (user.username) return user.username;
    if (user.fullName) return user.fullName;
    return "User";
  };

  const getUserEmail = () => {
    if (!user) return "";
    if (user.Email) return user.Email;
    if (user.data?.Email) return user.data.Email;
    if (user.email) return user.email;
    return "";
  };

  const photoUrl = getPhotoUrl();
  const userName = getUserName();
  const userEmail = getUserEmail();

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow-lg py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
          <Code size={28} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Connectify
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
              <div className="flex items-center space-x-3 cursor-pointer bg-gray-700/40 hover:bg-gray-700/60 px-3 py-2 rounded-full" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {photoUrl ? (
                  <img src={photoUrl} alt="User profile" className="w-8 h-8 rounded-full border-2 border-blue-400 shadow-sm" onError={(e) => e.target.style.display = 'none'} />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {userName[0].toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-100">{userName}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="border-2 border-blue-400 text-blue-400 px-5 py-2 rounded-lg hover:bg-blue-400 hover:text-gray-900 font-medium">Log In</Link>
              <Link to="/signup" className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 font-medium shadow-md">Sign Up</Link>
            </div>
          )}
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-gray-700" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-6 text-white">
            <button className="absolute top-5 right-5 text-gray-400" onClick={() => setMobileMenuOpen(false)}>
              <X size={30} />
            </button>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                <Link to="/connections" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Connections</Link>
                <Logout closeDropdown={() => setMobileMenuOpen(false)} />
              </>
            ) : (
              <>
                <Link to="/login" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
                <Link to="/signup" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
