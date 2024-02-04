import { Navigate, createBrowserRouter } from "react-router-dom"

import Orders from "./views/admin/Orders";
import AdminDashboard from "./views/admin/AdminDashboard";
import Store from "./views/public/Store";
import SignUp from "./views/public/SignUp";
import Login from "./views/public/Login";
import AdminLayout from "./components/admin/AdminLayout";
import MyOrders from "./views/client/MyOrders";
import Cart from "./views/public/Cart";


import Profile from "./views/client/Profile";
import ClientLayout from "./components/client/ClientLayout";
import PublicLayout from "./components/public/PublicLayout";
import ProductView from "./views/public/ProductView";

import ProductsList from "./views/admin/ProductsList";

import Colections from "./views/public/Colections";
import ProductsByCategory from "./views/public/ProductsByCategory";
import ProductsBySubcategory from "./views/public/ProductsBySubcategory";


const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '/store',
        element: <Navigate to='/' />,
      },
      {
        index: true,
        element: <Store />,
      },
      {
        path: 'colections',
        element: <Colections/>,
      },
      {
        path: '/categories-slug',
        element: <ProductsByCategory/>,
      },
      {
        path: '/subcategories-slug',
        element: <ProductsBySubcategory/>,
      },

      {
        path: 'item-slug',
        element: <ProductView />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },

  {
    path: '/profile',
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: 'my-orders',
        element: <MyOrders />,
      },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'items',
        element: <ProductsList />,
      },
      {
        path: 'item:id',
        element: <ProductsList />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },

])

export default router;
