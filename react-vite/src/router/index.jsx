import { createBrowserRouter } from 'react-router-dom';
import SignupFormPage from '../components/SignupFormPage';
import AllRestaurantsPage from '../components/AllRestaurantsPage/AllRestaurantsPage';
import OneRestaurant from '../components/OneRestaurantPage/OneRestaurant';
import Layout from './Layout';
import Landing from '../components/Landing/Landing';
import CreateRestaurantForm from '../components/CreateRestaurantForm/CreateRestaurantForm';
import UpdateRestaurantForm from '../components/UpdateRestaurantForm/UpdateRestaurant';
import CreateItemForm from '../components/CreateItemForm/CreateItemForm';
import UpdateItemForm from '../components/UpdateItemForm/UpdateItemForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
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
      {
        path:"manage",
        element: <AllRestaurantsPage myRestaurants={true} />
      },
      {
        path:"restaurants/:restaurantId/add-item",
        element: <CreateItemForm />
      },
      {
        path: "restaurants/:restaurantId/items/:itemId/update",
        element: <UpdateItemForm />
      }
    ],
  },
]);
