import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginPageProps {
  onLogin: (user: any) => void; // Function to pass user data upon login
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.username || !formData.password) {
      setError('Both fields are required');
      return;
    }

    // Simulate API call (in a real app, you'd call an API here)
    if (formData.username === 'admin' && formData.password === 'admin123') {
      // Simulated user data after successful login
      const user = {
        name: 'James Miayo',
        branch: 'Head office',
        position: 'Fullstack developer',
        number: '1239456890',
        computer: 'Dell XPS 13',
        userType: 'Tech',
      };

      setError('');
      onLogin(user); // Pass the user data to the parent component
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {error && <Typography color="error">{error}</Typography>}

          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
            required
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
