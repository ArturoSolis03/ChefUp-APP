import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import CustomTextField from 'src/components/shared/CustomTextField';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import api from './api';

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api().post('/auth/validate');
        setUserData({
          name: response.data.name,
          email: response.data.email
        });
      } catch (err) {
        console.error('Error validating user:', err);
        setError('Error retrieving user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 700,
        margin: '0 auto 0',
        boxShadow: 6,
        borderRadius: 4,
        padding: 3,
      }}
    >
      <CardContent>
        <Stack spacing={4} alignItems="center" mb={4}>
          <Avatar
            src={ProfileImg}
            alt="ProfileImg"
            sx={{
              width: 96,
              height: 96,
            }}
          />
          <Typography variant="h4" fontWeight={600}>
            User Profile
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate autoComplete="off" sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                mb={1}
                component="label"
                htmlFor="name"
              >
                Full Name
              </Typography>
              <CustomTextField
                id="name"
                value={userData.name}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                mb={1}
                component="label"
                htmlFor="email"
              >
                Email Address
              </Typography>
              <CustomTextField
                id="email"
                value={userData.email}
                type="email"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
