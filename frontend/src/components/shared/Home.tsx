import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link, useLocation } from 'react-router';

const imageUrl =
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80';

const Home: React.FC = () => {
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.success) {
      setSuccessMsg(location.state.success);
      // Limpia el estado después para evitar que se repita si el usuario refresca
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  
  return (
    <>
      <Card sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          {/* Image Section */}
          <CardMedia
            component="img"
            image={imageUrl}
            alt="Delicious dish"
            sx={{
              width: { xs: '100%', md: '50%' },
              height: { xs: 260, md: 'auto' },
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />

          {/* Text Section */}
          <CardContent
            sx={{
              width: { md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 5,
              gap: 3,
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Welcome to Chef Up
            </Typography>

            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ lineHeight: 1.8, fontSize: '1.1rem', textAlign: 'justify' }}
            >
              Chef Up is your culinary companion for discovering and organizing your favorite recipes.
              Whether you're a beginner or a seasoned home chef, explore hundreds of delicious, step-by-step
              recipes curated from around the world.
            </Typography>

            <Box>
              <Button component={Link} to="/recipes" variant="contained" color="primary" size="large">
                Explore Recipes
              </Button>
            </Box>
          </CardContent>
        </Box>
      </Card>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={4000}
        onClose={() => setSuccessMsg(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessMsg(null)}>
          {successMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
