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
  const {
    data: userInfo,
    isError,
    error,
  } = useGetUserProfileQuery(undefined, {
    skip: !Cookies.get("token"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values);

      if (response.error) {
        if (response.error.status == 500 || response.error.status == 404) {
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
  };

  const register = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.error) {
        const { data } = response.error;
        setAuthError(
          data.message || "An error occurred during registration",
        );
      } else {
        navigate("/auth/login");
        setAuthError(null);
      }
    } catch (error) {
      setAuthError("An error occurred during registration");
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const checkTokenValidity = async () => {
      // if (!loggedIn()) {
      //   Cookies.remove("token");
      //   navigate("/auth/login");
      //   return;
      // }
      if (userInfo) {
        setUser(userInfo);
        Cookies.set("token", token);
      }
    };

    checkTokenValidity();
  }, [navigate, userInfo]);

  const logout = () => {
    Cookies.remove("token");
    navigate("/auth/login");
    setUser(null);
  };

  const loggedIn = () => {
    const token = Cookies.get("token");
    return !!token && !isTokenExpired(token);
  };

  const value = useMemo(
    () => ({
      user,
      logout,
      loggedIn,
      setAuthError,
      authError,
      register,
      handleLogin,
    }),
    [user, authError],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
