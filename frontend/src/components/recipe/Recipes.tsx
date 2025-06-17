import { useEffect, useState } from 'react';
// import api from '../services/api';
import { Box, Typography, Pagination, CircularProgress, Card, CardContent } from '@mui/material';
import { Recipe } from './recipe';
import CardRecipe from './CardRecipe';

interface RecipeListProps {
  title: string;
  endpoint: string; // e.g. "/recipes" or "/favorites"
}

const Recipes = ({ title, endpoint }: RecipeListProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // const res = await api.get(`${endpoint}?page=${page}`);
        const res = {
          data: {
            recipes: [{
            id: "4n3kr3emrfelmfe",
            name: "Test 1",
            image: "https://img.spoonacular.com/recipes/716406-312x231.jpg"
            },{
            id: "849tnjrgnrkgmrrg",
            name: "Test 2",
            image: "https://img.spoonacular.com/recipes/716406-312x231.jpg"
            },{
            id: "dfenogtgefrgr",
            name: "Test 3",
            image: "https://img.spoonacular.com/recipes/716406-312x231.jpg"
            },{
            id: "48thoiwenffg",
            name: "Test 4 ver very long text to be tested",
            image: "https://img.spoonacular.com/recipes/716406-312x231.jpg"
            },{
            id: "48thoiwenffg",
            name: "Test 5 ver very long text to be tested",
            image: "https://img.spoonacular.com/recipes/716406-312x231.jpg"
            }]
          }
        }
        setRecipes(res.data.recipes);
        // setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching recipes', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  return (
    <Card
      sx={{ padding: 2, border: 'none' }}
      elevation={ 9}
      variant={ undefined}

    >
      <CardContent>
        <Typography variant="h4" mb={2}>
          {title}
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-around">
              {recipes.map((recipe) => (
                <CardRecipe key={recipe.id} recipe={recipe} isFavoriteProp={false} />
              ))}
            </Box>

            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Recipes;
