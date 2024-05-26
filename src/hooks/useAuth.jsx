import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { isTokenExpired } from "../utils/helpers/helpers";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    const res = await axios.post("http://localhost:8080/auth/login", {
      email: email,
      password: password,
    });
    if (res.data) {
      Cookies.set("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    }
  };
  const register = async ({ email, username, password }) => {
    const res = await axios.post("http://localhost:8080/auth/signup", {
      email: email,
      password: password,
      username: username,
    });
    if (res.data) {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/auth/login");
        return;
      }
      if (isTokenExpired(token)) {
        Cookies.remove("token");
        navigate("/auth/login");
        return;
      }

      const res = await axios.get("http://localhost:8080/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) {
        setUser(res.data);
        Cookies.set("token", token); // Refresh the token (if applicable)
      }
    };

    checkTokenValidity();

    const interval = setInterval(checkTokenValidity, 10 * 1000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  const logout = () => {
    ["token"].forEach((obj) => Cookies.remove(obj)); // remove data save in cookies
    navigate("/auth/login");
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      register,
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
