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
// import api from '../services/api';
import { useParams } from 'react-router-dom';

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string;
  isFavorite?: boolean;
}

const CardRecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // const res = await api.get(`/recipes/${id}`);
        const res = {
            data: {
            id: "4n3kr3emrfelmfe",
            name: "Test 1",
            image: "https://img.spoonacular.com/recipes/716406-312x231.jpg",
            ingredients: ["ingredient 1", "ingredient 2","ingredient 3"],
            instructions: "Lorem insup djngfgh dgfhhsgs errrgrg rht h dg eg r wrh tg r gsgshte htr hrhthth",
            isFavorite: true
            }
        }
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
        // await api.delete(`/favorites/${recipe.id}`);
      } else {
        // await api.post('/favorites', { recipeId: recipe.id });
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
          Receta no encontrada
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
          alt={recipe.name}
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
          {recipe.name}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Ingredientes
        </Typography>
        <List dense>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={`• ${ingredient}`} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Preparación
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {recipe.instructions}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardRecipeDetails;
