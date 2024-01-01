import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllRestaurantsPage from '../components/AllRestaurantsPage/AllRestaurantsPage';
import OneRestaurant from '../components/OneRestaurantPage/OneRestaurant';
import Layout from './Layout';
import CreateRestaurantForm from '../components/CreateRestaurantForm/CreateRestaurantForm';
import UpdateRestaurantForm from '../components/UpdateRestaurantForm/UpdateRestaurant';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "restaurants",
        element: <AllRestaurantsPage />
      },
      {
        path: "restaurants/:restaurantId",
        element: <OneRestaurant />
      },
      {
        path:"restaurants/new",
        element: <CreateRestaurantForm />
      },
      {
        path:"restaurants/:restaurantId/update",
        element: <UpdateRestaurantForm />
      },
    ],
  },
]);
