import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { checkJWTToken } from "./utils/helpers/helpers";

const ProtectedRoute = ({ isAuthPage, children }) => {
  const isAuthenticated = checkJWTToken();

  if (isAuthPage && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthPage && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
