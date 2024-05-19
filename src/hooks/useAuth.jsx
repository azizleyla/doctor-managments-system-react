import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "l" });
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const logout = () => {
    navigate("/login");
  };
  const login = () => {
    navigate(from, { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      login,
    }),
    [user],
  );
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
