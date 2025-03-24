import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import BeforeLoginLayout from "./beforelogin/BeforeLoginLayount.jsx";
import LandingPage from "./beforelogin/Landingpage.jsx";
import Signup from "./Login&signup/Signup.jsx";
import Login from "./Login&signup/Login.jsx";
import EditProfile from "./afterLogin/EditProfile.jsx"
import appStore from "./utils/appStore.js";
import { addUser } from "./utils/userSlice.js";
import Feed from "./afterLogin/Feed.jsx";
import Profile from "./afterLogin/Profileview.jsx";
import Connections from "./connections/Connections.jsx";
import Requests from "./connections/Requests.jsx";
import Base_url from "./utils/baseurl.js";

// Protected route component that checks for token
const ProtectedRoute = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(Base_url+"/profile/view", {
          withCredentials: true,
        });
        
        if (res.data) {
          dispatch(addUser(res.data));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log("Auth error:", err);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };
    
    checkAuth();
  }, [dispatch]);
  
  // Show loading while checking authentication
  if (!authChecked) {
    return <div>Loading...</div>;
  }
  
  // Redirect to landing page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Render child routes if authenticated
  return <Outlet />;
};

// Public route component that redirects to dashboard if already authenticated
const PublicRoute = () => {
  const userData = useSelector((state) => state.user);
  
  // If user data exists, redirect to dashboard
  if (userData) {
    return <Navigate to="/feed" replace />;
  }
  
  // Otherwise render the public routes
  return <Outlet />;
};

// App Routes wrapper component with Redux context
const AppWithRedux = () => {
  return (
    <Routes>
      {/* Public routes - redirect to dashboard if already logged in */}
      <Route element={<PublicRoute />}>
        <Route element={<BeforeLoginLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<Profile/>} /> */}
        </Route>
      </Route>
      
      {/* Protected routes - require authentication */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

// Main App component
function App() {
  return (
    <Provider store={appStore}>
      <AppWithRedux />
    </Provider>
  );
}

export default App;