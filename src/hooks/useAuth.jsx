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
import {
  useGetUserProfileQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/Auth.service";
import { Cookie } from "@mui/icons-material";

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
  } = useGetUserProfileQuery(Cookies.get("token"), {
    skip: !Cookies.get("token"),
  });
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  console.log(sp);
  const redirect = sp.get("redirect") || "/";

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      setUser(response.user);
      Cookies.set("token", response.token);
      setAuthError(null);
      navigate(redirect);
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
    setAuthError(null);
    let isLoggedIn = loggedIn();
    if (isLoading) {
      // Do nothing while loading
      return;
    }
    if (isLoggedIn && (!userInfo || isError)) {
      setUser(null);
      // navigate("/auth/login");
    } else {
      setUser(userInfo);
    }
  }, [userInfo, isError, navigate, isLoading]);

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
