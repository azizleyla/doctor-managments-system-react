import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ isAuthPage, children }) => {
  const { user } = useAuth();

  if (!isAuthPage && !user) {
    // login
    // signup
    return <Navigate to="/auth/signup" />;
  }

  if (isAuthPage && user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
