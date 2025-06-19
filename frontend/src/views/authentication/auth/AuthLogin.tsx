import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  CircularProgress,
  Alert,
  AlertColor,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomTextField from 'src/components/shared/CustomTextField';
import { login } from 'src/components/auth/auth';

interface AuthLoginProps {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthLogin = ({ title, subtitle, subtext }: AuthLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: AlertColor; message: string } | null>(null);

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!validateForm()) {
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate('/', { state: { success: 'Login successful!' } });
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error?.response?.data?.message || 'Login failed',
      });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Stack spacing={2} mt={2}>
        <Box>
          <Typography variant="subtitle1" fontWeight={500} component="label" htmlFor="email">
            Email
          </Typography>
          <CustomTextField
            id="email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={500} component="label" htmlFor="password">
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
        </Box>

        <Stack justifyContent="space-between" direction="row" alignItems="center">
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Remember this device" />
          </FormGroup>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            Forgot Password?
          </Typography>
        </Stack>

        {alert && (
          <Alert severity={alert.type} variant="filled" sx={{ mt: 2 }}>
            {alert.message}
          </Alert>
        )}

        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </Box>
      </Stack>

      {subtitle}
    </form>
  );
};

export default AuthLogin;
