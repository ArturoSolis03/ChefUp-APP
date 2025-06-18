import {
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
  AlertColor
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomTextField from '../../../components/shared/CustomTextField';
import { register } from 'src/components/auth/auth';
import { User } from 'src/components/auth/User';

interface AuthRegisterProps {
  title?: string;
  subtitle: React.ReactNode;
  subtext: React.ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: AuthRegisterProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: AlertColor; message: string } | null>(null);

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setAlert({ type: 'error', message: 'Name is required.' });
      return false;
    }
    if (name.length < 3 || name.length > 40) {
      setAlert({ type: 'error', message: 'Name must be between 3 and 40 characters.' });
      return false;
    }
    if (!email.trim()) {
      setAlert({ type: 'error', message: 'Email is required.' });
      return false;
    }
    if (!emailRegex.test(email)) {
      setAlert({ type: 'error', message: 'Enter a valid email address.' });
      return false;
    }
    if (!password) {
      setAlert({ type: 'error', message: 'Password is required.' });
      return false;
    }
    if (password.length < 6) {
      setAlert({ type: 'error', message: 'Password must be at least 6 characters long.' });
      return false;
    }

    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!validateForm()) {
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    setLoading(true);
    try {
      await register(new User({ name, email, password }));
      setAlert({ type: 'success', message: 'Registration successful!' });

      setTimeout(() => {
        navigate('/auth/login');
      }, 1000);
    } catch (err: any) {
      setAlert({
        type: 'error',
        message: err?.response?.data?.message || 'Registration failed',
      });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}
      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography variant="subtitle1" fontWeight={500} component="label" htmlFor="name" mb="5px">
            Name
          </Typography>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />

          <Typography variant="subtitle1" fontWeight={500} component="label" htmlFor="email" mb="5px" mt="25px">
            Email Address
          </Typography>
          <CustomTextField
            id="email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <Typography variant="subtitle1" fontWeight={500} component="label" htmlFor="password" mb="5px" mt="25px">
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </Stack>

        {alert && (
          <Alert severity={alert.type} variant="filled" sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <Button type="submit" color="primary" variant="contained" size="large" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </Button>
      </Box>

      {subtitle}
    </form>
  );
};

export default AuthRegister;
