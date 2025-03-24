{isLoggedIn ? (
  <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
    <div 
      className="flex items-center space-x-3 cursor-pointer bg-gray-700/40 hover:bg-gray-700/60 px-3 py-2 rounded-full" 
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      {photoUrl ? (
        <img 
          src={photoUrl} 
          alt="User profile" 
          className="w-8 h-8 rounded-full border-2 border-blue-400 shadow-sm" 
          onError={(e) => e.target.style.display = 'none'} 
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {userName[0].toUpperCase()}
        </div>
      )}
      <span className="text-sm font-medium text-gray-100">{userName}</span>
      <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
    </div>

    {/* Dropdown Menu */}
    {dropdownOpen && (
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -10 }} 
        transition={{ duration: 0.2 }} 
        className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg overflow-hidden"
      >
        <Link 
          to="/profile" 
          className="flex items-center px-4 py-3 hover:bg-gray-700"
          onClick={() => setDropdownOpen(false)}
        >
          <User size={18} className="mr-2 text-blue-400" />
          Profile
        </Link>
        <Link 
          to="/connections" 
          className="flex items-center px-4 py-3 hover:bg-gray-700"
          onClick={() => setDropdownOpen(false)}
        >
          <Handshake size={18} className="mr-2 text-green-400" />
          Connections
        </Link>
        <Link 
          to="/messages" 
          className="flex items-center px-4 py-3 hover:bg-gray-700"
          onClick={() => setDropdownOpen(false)}
        >
          <MessageSquare size={18} className="mr-2 text-yellow-400" />
          Messages
        </Link>
        <div className="border-t border-gray-600"></div>
        <Logout closeDropdown={() => setDropdownOpen(false)} />
      </motion.div>
    )}
  </div>
) : (
  <div className="flex items-center space-x-3">
    <Link to="/login" className="border-2 border-blue-400 text-blue-400 px-5 py-2 rounded-lg hover:bg-blue-400 hover:text-gray-900 font-medium">Log In</Link>
    <Link to="/signup" className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 font-medium shadow-md">Sign Up</Link>
  </div>
)}
