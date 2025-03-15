import React from "react";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Import the action to remove user data
// Change this import to match your actual action
import { removeUser } from "../utils/userSlice"; 

const Logout = ({ closeDropdown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call your logout API
      await axios.post("http://localhost:1999/logout", {}, {
        withCredentials: true
      });
      
      // Clear user data from Redux
      dispatch(removeUser());
      
      // Close the dropdown
      if (closeDropdown) closeDropdown();
      
      // Navigate to landing page
      navigate("/");
      
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      
      // Even if API fails, still clear Redux and redirect
      dispatch(removeUser());
      if (closeDropdown) closeDropdown();
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center px-4 py-3 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
    >
      <LogOut size={16} className="mr-3" />
      Log Out
    </button>
  );
};

export default Logout;