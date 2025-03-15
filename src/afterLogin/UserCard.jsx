import React, { useState } from 'react';

const UserCard = ({ user }) => {
  const { Name, Email, Phone, photoUrl, Age, Gender, About } = user;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px), radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* Soft Pastel Glow */}
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-40 top-20 left-20 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-40 bottom-20 right-20 animate-pulse"></div>

      {/* User Card */}
      <div
        className={`relative z-10 card w-96 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-all duration-500 
          ${isHovered ? 'scale-105 shadow-xl border-gray-300' : 'scale-100'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Profile Picture */}
        <figure className="relative h-60 overflow-hidden">
          <img
            src={photoUrl}
            alt={Name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 via-gray-500/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h2 className="text-2xl font-bold text-white">{Name}</h2>
            {Age && Gender && (
              <p className="text-sm text-gray-200 mt-1 flex items-center">
                <span className="inline-block mr-2 bg-blue-400 rounded-full px-2 py-1 text-white text-xs font-medium">
                  {Age}
                </span>
                <span className="text-gray-200">{Gender}</span>
              </p>
            )}
          </div>
        </figure>

        {/* Card Body */}
        <div className="card-body p-6 text-gray-800">
          {/* About Section */}
          {About && (
            <div className="mb-4 p-4 bg-gray-100 rounded-lg border-l-4 border-blue-400">
              <p>{About}</p>
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-3 mb-4">
            <p className="flex items-center text-sm text-gray-600 hover:text-blue-500 transition-colors duration-200">
              📧 {Email}
            </p>
            <p className="flex items-center text-sm text-gray-600 hover:text-green-500 transition-colors duration-200">
              📞 {Phone}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="card-actions justify-between mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-all duration-200 flex items-center shadow-md">
              🤝 Connect
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md transition-all duration-200 flex items-center shadow-md">
              ❌ Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
