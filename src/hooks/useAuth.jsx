import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { isTokenExpired, loggedIn } from "../utils/helpers/helpers";
import {
  useGetUserProfileQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/Auth.service";
import { Cookie } from "@mui/icons-material";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  const { data: userInfo, isLoading } = useGetUserProfileQuery(
    Cookies.get("token"),
    {
      skip: !Cookies.get("token"),
    },
  );

  const handleLogin = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      Cookies.set("token", response.token);
      navigate("/");
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

  const logout = () => {
    Cookies.remove("token");
    navigate("/auth/login");
  };

  //reset error when switch page
  useEffect(() => {
    setAuthError(null);
  }, [location.pathname]);

  const value = useMemo(
    () => ({
      userInfo,
      logout,
      loggedIn,
      setAuthError,
      authError,
      register,
      handleLogin,
    }),
    [userInfo, authError],
  );
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
