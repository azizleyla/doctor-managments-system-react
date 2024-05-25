import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthProvider, useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required"),
  })
  .required();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { email, password } = values;
    login({ email, password });
  };

  return (
    <AuthProvider>
      <Box
        sx={{ paddingTop: "150px" }}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          boxShadow="0 0 3px #3c485826"
          sx={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "400px",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            mt={1}
            mb={2}
            fontWeight="600"
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                rules={{ required: true }}
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    placeholder="Email"
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: "1rem",
                        margin: 0,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        padding: ".375rem .75rem",
                      },
                    }}
                    {...field}
                  />
                )}
              />
              <Typography
                variant="span"
                sx={{ color: "red", fontSize: "10px" }}
              >
                {errors?.email?.message}
              </Typography>
            </Box>
            <Box sx={{ marginTop: "15px" }}>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    placeholder="Password"
                    fullWidth
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: ".9375rem",
                        fontWeight: 400,
                        lineHeight: 1.5,
                        padding: ".375rem .75rem",
                      },
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              <Typography
                variant="span"
                sx={{ color: "red", fontSize: "10px" }}
              >
                {errors?.password?.message}
              </Typography>
            </Box>
            <Link style={{ fontSize: "12px", color: "#140108" }}>
              Forgot Username/Password?
            </Link>

            <Button
              sx={{ margin: "30px 0" }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Login
            </Button>
            <Box textAlign="center">
              <Typography component="span">
                Don't have an account?
              </Typography>
              <Link to="/auth/signup" style={{ fontWeight: "500" }}>
                {" "}
                Sign Up
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </AuthProvider>
  );
};

export default Login;
