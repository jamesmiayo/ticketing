import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useExecuteToast } from "../../context/ToastContext";
import { useLoader } from "../../context/LoaderContext";

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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Login to your account
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
        >
          Enter your details to log in and access your account.
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
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />
            <Link href="#" underline="none" sx={{ fontSize: "14px" }}>
              Forgot password?
            </Link>
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
      </Box>
    </Box>
  );
};

export default LoginPage;
