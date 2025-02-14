import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  // FormControlLabel,
  // Checkbox,
  CardContent,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useExecuteToast } from "../../context/ToastContext";
import { useLoader } from "../../context/LoaderContext";
import logo from "../../assets/images/logo.png";

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const toast = useExecuteToast();
  const { isLoading, showLoader, hideLoader } = useLoader();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = "Login Page"; 
  }, []);
  
  const onSubmit = async (data: FormData) => {
    showLoader();
    try {
      const response = await loginUser(data.username, data.password);
      toast.executeToast(response?.message, "top-center", true, {
        type: "success",
      });
      navigate("/dashboard");
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        setError("Invalid username or password. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(45deg, #62cff4 30%, #2c67f2 90%)",
          padding: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            width: "100px",
            height: "100px",
            background: "linear-gradient(145deg, #ffffff, #d1d9e6)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "8px 8px 16px #c3cfd9, -8px -8px 16px #ffffff",
            marginBottom: theme.spacing(4),
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "90%", objectFit: "contain" }}
          />
        </Box>
        <Card
          elevation={10}
          sx={{
            width: isMobile ? "100%" : "400px",
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ padding: theme.spacing(4) }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Ticketing System
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              align="center"
              sx={{ marginBottom: theme.spacing(3) }}
            >
              Please sign in to your account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {error && (
                <Typography color="error" sx={{ textAlign: "center" }}>
                  {error}
                </Typography>
              )}

              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ""}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {/* <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                /> */}
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: "linear-gradient(90deg, #0056FF, #007FFF)",
                  color: "#fff",
                  fontWeight: "bold",
                }}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Box>
            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: theme.spacing(2) }}
            ></Typography>
          </CardContent>
        </Card>
        <Box
          sx={{
            position: "relative",
            top: "50px",
            right: 0,
            left: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "600",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            © 2024
            <span style={{ margin: "0 8px", fontWeight: "bold" }}>
              SAFC Information Technology Group.
            </span>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "600",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            All rights reserved.
          </Typography>
          {/* <Box
          sx={{
            display: "flex",
            gap: 2,
            fontWeight: "600",
            fontSize: "12px",
            color: "blue",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href="/privacy-policy" sx={{ color: "blue" }}>
            Privacy Policy |
          </Link>
          <Link href="/terms-of-service" sx={{ color: "blue" }}>
            Terms of Service |
          </Link>
          <Link href="/support" sx={{ color: "blue" }}>
            Support |
          </Link>
          <Link href="/contact-us" sx={{ color: "blue" }}>
            Contact Us
          </Link>
        </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
