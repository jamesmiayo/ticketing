import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {error && <Typography color="error">{error}</Typography>}

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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isLoading} 
            startIcon={isLoading ? <CircularProgress size={20} /> : null} 
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
