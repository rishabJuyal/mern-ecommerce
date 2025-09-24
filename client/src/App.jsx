import React, { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { useDispatch } from "react-redux";
import { refreshToken } from "./store/authSlice";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Runs every time the route changes

  return null;
}; 

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(refreshToken());
  },[])
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <AppRoutes />
      <Footer />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
