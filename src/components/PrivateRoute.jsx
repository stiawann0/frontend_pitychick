import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Kalau belum login, redirect ke /login
    return <Navigate to="/login" replace />;
  }

  // Kalau sudah login, tampilkan komponen anak (children)
  return children;
};

export default PrivateRoute;
