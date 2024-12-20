import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFirebaseAuth } from "../Auth/AuthProvider";
import { FaSpinner } from "react-icons/fa";
import { ThemeProvider } from "../Auth/ThemeContext";

const MainLayout = () => {
  const { user, loading } = useFirebaseAuth();
  return (
    <div className="font_poppins">
      <ToastContainer />

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <FaSpinner className="animate-spin text-4xl text-[#A91D3A]" />
        </div>
      ) : (
        <>
    
          <Navbar />
          <div className="pt-16">
            <Outlet />
          </div>
          <Footer />
     
        </>
      )}
    </div>
  );
};

export default MainLayout;
