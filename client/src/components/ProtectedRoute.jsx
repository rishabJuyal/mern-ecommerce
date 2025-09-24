import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const location =useLocation();

  if (!accessToken) {
    if (location.pathname === redirectPath) {
      return null; // already on login page, don’t redirect again
    }
    return (
        <Navigate
          to={redirectPath}
          replace
          state={{ from: location }} // 👈 save where user came from
        />
      );
  }

  // If children exist, render them, otherwise render nested routes (Outlet)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
