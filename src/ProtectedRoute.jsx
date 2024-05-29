import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { checkJWTToken, isTokenExpired } from "./utils/helpers/helpers";
import Cookies from "js-cookie";

const ProtectedRoute = ({ isAuthPage, children }) => {
  const { loggedIn } = useAuth();
  const isAuthenticated = loggedIn();

  if (isAuthPage && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthPage && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
