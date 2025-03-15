import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Features from "./Features";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <main className="flex-grow">
        <Header />
        <Navbar />
        <Features />
      <Footer />
      </main>
    </div>
  );
};

export default LandingPage;