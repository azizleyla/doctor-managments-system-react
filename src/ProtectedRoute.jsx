import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        replace
        state={{ from: `${location.pathname}` }}
        to="/login"
      />
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
