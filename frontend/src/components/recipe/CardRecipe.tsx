import { useState, MouseEvent } from 'react';
import {
  Card,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import api from '../shared/api';
import { Recipe } from './recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isFavoriteProp: boolean;
  onFavoriteToggle?: () => void; // callback to notify parent
}

const CardRecipe: React.FC<RecipeCardProps> = ({
  recipe,
  isFavoriteProp,
  onFavoriteToggle,
}) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(isFavoriteProp);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const handleToggleFavorite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${recipe.id}`);
        setAlert({ message: 'Removed from favorites.', severity: 'success' });
        onFavoriteToggle?.(); // notify parent that it was removed
      } else {
        await api.post('/favorites', { recipeId: recipe.id });
        setAlert({ message: 'Added to favorites!', severity: 'success' });
      }

      setIsFavorite(prev => !prev);
    } catch (err) {
      console.error('Error updating favorite:', err);
      setAlert({ message: 'Failed to update favorite.', severity: 'error' });
    }
  };

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <>
    <Card
      sx={{
        maxWidth: 300,
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
        cursor: 'pointer',
        transition: '0.3s ease-in-out',
        ':hover': { boxShadow: 6 },
      }}
      onClick={handleCardClick}
    >
      {/* Favorite Button */}
      <IconButton
        onClick={handleToggleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255,255,255,0.85)',
          zIndex: 2,
        }}
        aria-label="Add to favorites"
      >
        {isFavorite ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={recipe.image}
        alt={recipe.title}
        sx={{ objectFit: 'cover' }}
      />

      {/* Title Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          bgcolor: 'rgba(0,0,0,0.6)',
          color: 'white',
          py: 1,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          noWrap
          title={recipe.title}
        >
          {recipe.title}
        </Typography>
      </Box>
    </Card>
    {/* Snackbar Alert */}
      {alert && (
        <Snackbar
          open
          autoHideDuration={4000}
          onClose={() => setAlert(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={alert.severity}
            variant="filled"
            onClose={() => setAlert(null)}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CardRecipe;
