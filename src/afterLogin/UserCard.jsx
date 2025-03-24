import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import Base_url from "../utils/baseurl";

const UserCard = ({ user }) => {
  const { _id, Name, Email, Phone, photoUrl, Age, Gender, About } = user;
  const [isHovered, setIsHovered] = useState(false);
  const [requestStatus, setRequestStatus] = useState({
    loading: false,
    error: null,
  });
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    setRequestStatus({ loading: true, error: null });

    try {
      const requestUrl = Base_url+`/request/send/${status}/${userId}`;
      console.log("Sending request to:", requestUrl);

      const res = await axios.post(requestUrl, {}, { withCredentials: true });

      console.log("Response:", res.data);

      dispatch(removeUserFromFeed(userId));
      setRequestStatus({ loading: false, error: null });
    } catch (err) {
      console.error("Error details:", err);
      setRequestStatus({
        loading: false,
        error: err.response?.data?.message || "Request failed",
      });
    }
  };

  if (!_id || !Name) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
          <p className="text-xl">No profile available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="relative w-96 bg-gray-800 text-white shadow-xl rounded-lg border border-gray-700 overflow-hidden transform transition duration-300 hover:scale-105">
        <figure className="relative h-60 overflow-hidden">
          <img
            src={photoUrl}
            alt={Name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h2 className="text-2xl font-bold">{Name}</h2>
            {Age && Gender && (
              <p className="text-sm flex items-center space-x-2">
                <span className="bg-blue-500 text-xs font-medium px-2 py-1 rounded">
                  {Age}
                </span>
                <span>{Gender}</span>
              </p>
            )}
          </div>
        </figure>

        <div className="p-6">
          {requestStatus.error && (
            <div className="mb-4 p-3 bg-red-500 text-white rounded-md">
              <p>{requestStatus.error}</p>
            </div>
          )}

          {About && (
            <div className="mb-4 p-4 bg-gray-700 rounded-lg border-l-4 border-blue-500">
              <p>{About}</p>
            </div>
          )}

          <div className="space-y-3 mb-4">
            <p className="flex items-center text-gray-400">
              📧 {Email}
            </p>
            <p className="flex items-center text-gray-400">
              📞 {Phone}
            </p>
          </div>

          <div className="flex justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center transition-all duration-200 shadow-md ${
                requestStatus.loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleSendRequest("interested", _id)}
              disabled={requestStatus.loading}
            >
              💙 Interested
            </button>
            <button
              className={`bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center transition-all duration-200 shadow-md ${
                requestStatus.loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={requestStatus.loading}
            >
              ❌ Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
