import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "lel" });
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      logout,
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
