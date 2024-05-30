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
    isLoading,
    error,
  } = useGetUserProfileQuery({
    skip: !Cookies.get("token"),
  });

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      setUser(response.user);
      Cookies.set("token", response.token);
      setAuthError(null);
      navigate("/auth/login");
    } catch (error) {
      if (error.data) {
        setAuthError(error.data?.message);
      }
    }
  };

  const register = async (values) => {
    try {
      const response = await registerUser(values).unwrap();
      navigate("/auth/login");
      setAuthError(null);
    } catch (error) {
      setAuthError(error?.data.message);
    }
  };

  useEffect(() => {
    console.log(userInfo);
    setAuthError(null);
    console.log(userInfo);
    if (!userInfo) {
      setUser(null);
      navigate("/auth/login");
      Cookies.remove("token");
    } else {
      setUser(userInfo);
    }
  }, [userInfo]);

  const logout = () => {
    Cookies.remove("token");
    navigate("/auth/login");
    setUser(null);
  };

  const loggedIn = () => {
    const token = Cookies.get("token");
    return token;
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
