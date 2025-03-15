import React, { useEffect } from "react";
import Header from "../beforelogin/Header";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFeed = async () => {
      if (feed) return;

      try {
        const res = await axios.get("http://localhost:1999/feed", { withCredentials: true });
        dispatch(addFeed(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    getFeed();
  }, [feed, dispatch]); // Dependency array ensures it runs only when `feed` changes

  return(
    <div>
      <Header />
      <div className="feed">
        {/* <UserCard user={feed[0]}/> */}
        <UserCard user={feed?.[0] || {}} />
        
      </div>
    </div>
  )

};

export default Feed;
