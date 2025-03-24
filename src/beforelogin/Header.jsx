import { Code, Menu, ChevronDown, X, User, Handshake, LogOut, Edit, Users } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Login&signup/Logout";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = Boolean(user && typeof user === "object" && Object.keys(user).length > 0);

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

  const getUserName = () => user?.Name || user?.username || "User";
  const getPhotoUrl = () => user?.photoUrl || user?.avatar || null;

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-lg py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to={isLoggedIn ? "/feed" : "/"} className="flex items-center space-x-2 group">
          <Code size={28} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-xl font-bold text-blue-400">Connectify</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-3 cursor-pointer bg-gray-700/40 hover:bg-gray-700/60 px-3 py-2 rounded-full" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {getPhotoUrl() ? (
                  <img src={getPhotoUrl()} alt="User" className="w-8 h-8 rounded-full border-2 border-blue-400 shadow-sm" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {getUserName()[0].toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-100">{getUserName()}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </div>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700" onClick={() => setDropdownOpen(false)}>
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link to="/profile/edit" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700" onClick={() => setDropdownOpen(false)}>
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </Link>
                    <Link to="/requests" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700" onClick={() => setDropdownOpen(false)}>
                      <Users size={16} />
                      <span>Requests</span>
                    </Link>
                    <Link to="/connections" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700" onClick={() => setDropdownOpen(false)}>
                      <Handshake size={16} />
                      <span>Connections</span>
                    </Link>
                    <Logout closeDropdown={() => setDropdownOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login" className="border-2 border-blue-400 text-blue-400 px-5 py-2 rounded-lg hover:bg-blue-400 hover:text-gray-900 font-medium">Log In</Link>
              <Link to="/signup" className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 font-medium shadow-md">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-700" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-6 text-white"
          >
            <button className="absolute top-5 right-5 text-gray-400" onClick={() => setMobileMenuOpen(false)}>
              <X size={30} />
            </button>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                <Link to="/profile/edit" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Edit Profile</Link>
                <Link to="/requests" className="text-xl" onClick={() => setMobileMenuOpen(false)}>Requests</Link>
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
