import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
} from '@mui/material';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';

const UserProfile: React.FC = () => {
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
          alt={'ProfileImg'}
          sx={{
            width: 96,
            height: 96,
          }}
          />
          <Typography variant="h4" fontWeight={600}>
            User Profile
          </Typography>
        </Stack>

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
                value="Name Example"
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
                value="youremail@gmail.com"
                type="email"
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
                htmlFor="password"
              >
                Password
              </Typography>
              <CustomTextField
                id="password"
                value={"password".replace(/./g, '•')}
                type="password"
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
