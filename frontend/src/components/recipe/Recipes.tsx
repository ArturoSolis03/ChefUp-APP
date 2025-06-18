import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Pagination,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@mui/material';
import CardRecipe from './CardRecipe';
import { fetchRecipes } from '../shared/api';

interface RecipesProps {
  title?: string;
  endpoint: 'recipes' | 'favorites';
  isFavoritesView?: boolean;
}

const Recipes: React.FC<RecipesProps> = ({ title, endpoint, isFavoritesView = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const pageQuery = parseInt(searchParams.get('page') || '1');

  const loadData = async () => {
    setIsLoading(true);
    setAlert(null);
    try {
      const res = await fetchRecipes(endpoint, searchQuery, pageQuery);
      if(endpoint == 'favorites'){
        setRecipes(res);
      }else {
        setRecipes(res.results);
        setTotal(res.totalPages);
      }
    } catch(error) {
      console.error(error);
      setAlert({ message: 'An error occurred while fetching recipes.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [endpoint, searchQuery, pageQuery]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    searchParams.set('page', newPage.toString());
    navigate(`/${endpoint}?${searchParams.toString()}`);
  };

  const handleFavoriteToggle = (id: string) => {
    if (isFavoritesView) {
      setRecipes(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      {title && (
        <CardHeader
          title={<Typography variant="h5">{title}</Typography>}
        />
      )}

      <Divider />

      <CardContent>
        {alert && (
          <Snackbar open autoHideDuration={6000} onClose={() => setAlert(null)}>
            <Alert severity={alert.severity} variant="filled">
              {alert.message}
            </Alert>
          </Snackbar>
        )}

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
        ) : recipes.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <Typography variant="body1" color="text.secondary">
              No recipes available to display.
            </Typography>
          </Box>
        ) : (
          <>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-around">
              {recipes.map((recipe) => (
                <CardRecipe key={recipe.id} recipe={recipe} onFavoriteToggle={() => handleFavoriteToggle(recipe.id)} isFavoriteProp={recipe.isFavorite ?? true} />
              ))}
            </Box>
            
            {recipes.length > 1 &&
            (<Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={total}
                page={pageQuery}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>)}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Recipes;
