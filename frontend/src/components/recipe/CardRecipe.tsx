import { useState, MouseEvent } from 'react';
import {
  Card,
  CardMedia,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Recipe } from './recipe';
import { useNavigate } from 'react-router';

interface RecipeCardProps {
  recipe: Recipe;
  isFavoriteProp: boolean;
}

const CardRecipe = ({ recipe, isFavoriteProp = false }: RecipeCardProps) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(isFavoriteProp);

  const handleToggleFavorite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      if (isFavorite) {
        // await api.delete(`/favorites/${recipe.id}`);
      } else {
        // await api.post('/favorites', { recipeId: recipe.id });
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };
const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
        cursor: 'pointer',
        ':hover': { boxShadow: 6 },
        transition: '0.3s',
      }}
      onClick={handleCardClick}
    >
      <IconButton
        onClick={handleToggleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255,255,255,0.75)',
          zIndex: 2,
        }}
        aria-label="Agregar a favoritos"
      >
        {isFavorite ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <CardMedia
        component="img"
        height="200"
        image={recipe.image}
        alt={recipe.name}
        sx={{ objectFit: 'cover' }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          bgcolor: 'rgba(0,0,0,0.6)',
          color: 'white',
          p: 1.5,
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {recipe.name}
        </Typography>
      </Box>
    </Card>
  );
};

export default CardRecipe;
