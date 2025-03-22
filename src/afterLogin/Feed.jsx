import React, { useEffect, useState } from "react";
import Header from "../beforelogin/Header";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(!feed);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeed = async () => {
      if (feed) return 

      try {
        setLoading(true);
        const res = await axios.get("https://connectify-backend-app.onrender.com/feed", { withCredentials: true });
        dispatch(addFeed(res.data));
      } catch (err) {
        console.error("Error fetching feed:", err);
        setError("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [feed, dispatch]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl text-gray-700">Loading profiles...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="feed">
        {feed && feed.length > 0 ? (
          <UserCard user={feed[0]} />
        ) : (
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-xl text-gray-700">No more profiles to show</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;