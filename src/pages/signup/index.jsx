import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Collapse,
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
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
const schema = yup
  .object({
    email: yup.string().required("email is required"),

    username: yup.string().required("username is required"),
    password: yup.string().required("password is required"),
  })
  .required();

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register } = useAuth();
  const onSubmit = (values) => {
    // Navigate("/login");
    register(values);
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
            Sign Up
          </Typography>
          <Collapse sx={{ marginBottom: "10px" }} in={showErrorAlert}>
            <Alert
              variant="filled"
              severity="error"
              open={showErrorAlert}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowErrorAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Email alread token{" "}
            </Alert>
          </Collapse>

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
                        fontSize: ".9375rem",
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
            <Box sx={{ margin: "20px 0" }}>
              <Controller
                rules={{ required: true }}
                control={control}
                name="username"
                render={({ field }) => (
                  <TextField
                    placeholder="Username"
                    sx={{
                      "& .MuiInputBase-input": {
                        fontSize: ".9375rem",
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
                {errors?.username?.message}
              </Typography>
            </Box>
            <Box>
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

            <Button
              sx={{ margin: "30px 0" }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>
            <Box textAlign="center">
              <Typography component="span">
                Already have an account?
              </Typography>
              <Link to="/auth/login" style={{ fontWeight: "500" }}>
                Login
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </AuthProvider>
  );
};

export default SignUp;
