// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import PrivateRoute from 'src/components/auth/PrivateRoute';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

/* ****Pages***** */
const Home = lazy(() => import("../components/shared/Home"));
const Profile = lazy(() => import("../components/shared/Profile"));
const Error = lazy(() => import('../views/authentication/NotFound'));
const Register = lazy(() => import('../views/authentication/Register'));
const Login = lazy(() => import('../views/authentication/Login'));
const Logout = lazy(() => import('../views/authentication/Logout'));
const Recipes = lazy(() => import('../components/recipe/Recipes'));
const RecipeDetails = lazy(() => import('../components/recipe/CardRecipeDetails'));

const Router = [
  {
    // path: '/',
    // element: <PrivateRoute />,
    // children: [
    //   {
        path: '/',
        element: <FullLayout />,
        children: [
          { path: '/', exact: true, element: <Home /> },
          { path: "/recipes", element: <Recipes title='Recipes' endpoint='recipes' /> },
          { path: "/recipe/:id", element: <RecipeDetails /> },
          { path: "/favorites", element: <Recipes title='Favorites' endpoint='favorites' /> },
	        { path: "/profile", element: <Profile /> },
          { path: '*', element: <Navigate to="/auth/404" /> },
        ],
      },
  //   ],
  // },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/logout', element: <Logout /> },
    ],
  },
  { basename: '/' }
];

const router = createBrowserRouter(Router);
export default router;
