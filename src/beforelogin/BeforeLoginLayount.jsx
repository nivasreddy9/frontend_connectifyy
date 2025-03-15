import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Features from "./Features";
import Footer from "./Footer";

const BeforeLoginLayout = () => {
  const location = useLocation();

  // Conditionally render additional components based on the current route
  const shouldShowAdditionalContent = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
     
    </div>
  );
};

export default BeforeLoginLayout;