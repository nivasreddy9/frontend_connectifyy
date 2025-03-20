import { Code, Menu, ChevronDown, Edit, Settings, LogOut, User, Handshake, MessageSquare } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "../Login&signup/Logout";

const Header = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Log user state for debugging
  // console.log("User state in header:", user);

  // Check if user is logged in - robust check
  const isLoggedIn = Boolean(user && typeof user === 'object' && Object.keys(user).length > 0);

  // Handle clicks outside the dropdown to close it
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

  // Reset dropdown when auth state changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [isLoggedIn]);

  // Get photo URL - handle different possible data structures
  const getPhotoUrl = () => {
    if (!user) return null;
    // Check all possible paths where the photo URL might be stored
    if (user.photoUrl) return user.photoUrl;
    if (user.data?.photoUrl) return user.data.photoUrl;
    if (user.photo) return user.photo;
    if (user.profilePic) return user.profilePic;
    if (user.avatar) return user.avatar;
    if (user.image) return user.image;
    return null;
  };

  // Get user name - handle different possible data structures
  const getUserName = () => {
    if (!user) return "User";
    if (user.Name) return user.Name;
    if (user.data?.Name) return user.data.Name;
    if (user.name) return user.name;
    if (user.username) return user.username;
    if (user.fullName) return user.fullName;
    return "User";
  };

  // Get user email
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
        {/* Logo and Brand Name */}
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center space-x-2 group"
        >
          <Code size={28} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Connectify
          </span>
        </Link>

        {/* Navigation based on auth state */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            // User is logged in - show profile section with dropdown
            <div
              className="flex items-center space-x-4 relative"
              ref={dropdownRef}
            >
              {/* Profile info - clickable to open dropdown */}
              <div
                className="flex items-center space-x-3 cursor-pointer bg-gray-700/40 hover:bg-gray-700/60 px-3 py-2 rounded-full transition-all duration-200"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {photoUrl ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-400 shadow-sm transform transition-transform duration-200 hover:scale-105">
                    <img
                      src={photoUrl}
                      alt="User profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // console.log("Image failed to load:", photoUrl);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                    {userName ? userName[0].toUpperCase() : "U"}
                  </div>
                )}
                
                {userName && (
                  <span className="text-sm font-medium text-gray-100">
                    {userName}
                  </span>
                )}
                
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-56 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden z-50 border border-gray-700 transform origin-top-right transition-all duration-200"
                  style={{
                    animation: "dropdownFade 0.2s ease-out forwards"
                  }}
                >
                  <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
                    {photoUrl ? (
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-blue-400 shadow-md">
                        <img
                          src={photoUrl}
                          alt="User profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // console.log("Image failed to load in dropdown");
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
                        {userName ? userName[0].toUpperCase() : "U"}
                      </div>
                    )}
                    
                    <p className="text-base font-semibold text-white text-center">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-400 text-center truncate mt-1">
                      {userEmail}
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} className="mr-3 text-blue-400" />
                      View Profile
                    </Link>
                    <Link
                      to="/profile/edit"
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Edit size={16} className="mr-3 text-green-400" />
                      Edit Profile
                    </Link>
                    <Link
                      to="/connections"
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Handshake size={16} className="mr-3 text-yellow-400" /> 
                      Connections
                    </Link>
                    <Link
                      to="/requests"
                      className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <MessageSquare size={16} className="mr-3 text-purple-400" />
                      Requests
                    </Link>
                    
                    <div className="px-4 py-2">
                      <div className="border-t border-gray-700 my-1"></div>
                    </div>
                    <Logout closeDropdown={() => setDropdownOpen(false)} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            // User is not logged in - show auth buttons
            // Removed the isPostLoginRoute condition to always show login/signup when logged out
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <button className="border-2 border-blue-400 text-blue-400 px-5 py-2 rounded-lg hover:bg-blue-400 hover:text-gray-900 font-medium transition-all duration-200">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 font-medium shadow-md transition-all duration-200">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-1 rounded-lg hover:bg-gray-700 transition-colors" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>
      
      {/* CSS Animation for Dropdown */}
      <style jsx>{`
        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;