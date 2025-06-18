import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect, MouseEvent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import api from '../shared/api';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Recipe } from './recipe';

const CardRecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api().get(`/recipes/${id}`);
        setRecipe(res.data);
        setFavorite(res.data.isFavorite || false);
      } catch (err) {
        console.error('Error loading recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  const handleToggleFavorite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!recipe) return;

    try {
      if (favorite) {
        await api(true).delete(`/favorites/${recipe.id}`);
      } else {
        const {id, title, image, imageType} = recipe;
        await api(true).post('/favorites', { id, title, image, imageType });
      }
      setFavorite(!favorite);
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!recipe) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Typography variant="h6" color="error">
          Recipe not found
        </Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mt: 4, boxShadow: 4, borderRadius: 2 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="350"
          image={recipe.image}
          alt={recipe.title}
          sx={{ objectFit: 'cover' }}
        />
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(255,255,255,0.8)',
          }}
        >
          {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {recipe.title}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Ingredients
        </Typography>
        <List dense>
          {recipe.ingredients?.map((ingredient, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`• ${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Instructions
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }} >
          {parse(recipe.instructions ?? "No instructions founded")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardRecipeDetails;
