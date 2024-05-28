import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { isTokenExpired } from "../utils/helpers/helpers";
import {
  useGetUserProfileQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/Auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();
  const { data: userInfo } = useGetUserProfileQuery(undefined, {
    skip: !Cookies.get("token"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values);

      if (response.error) {
        if (
          response.error.status === 500 ||
          response.error.status === 401
        ) {
          setAuthError("Email or password is incorrect");
        } else {
          setAuthError("An unknown error occurred");
        }
      } else {
        Cookies.set("token", response.data.token);
        setUser(response.data.user);
        navigate("/");
        setAuthError(null);
      }
    } catch (error) {
      setAuthError("An error occurred during login");
    }
    console.log(authError);
  };

  const register = async (values) => {
    const response = await registerUser(values);
    if (response.data) {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = Cookies.get("token");
      // if (!token) {
      //   navigate("/auth/login");
      //   return;
      // }
      if (isTokenExpired(token)) {
        Cookies.remove("token");
        navigate("/auth/login");
        return;
      }
      if (userInfo) {
        setUser(userInfo);
        Cookies.set("token", token); // Refresh the token (if applicable)
      }
    };

    checkTokenValidity();

    const interval = setInterval(checkTokenValidity, 10 * 1000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [navigate, userInfo]);

  const logout = () => {
    ["token"].forEach((obj) => Cookies.remove(obj)); // remove data save in cookies
    navigate("/auth/login");
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      authError,
      register,
      handleLogin,
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
