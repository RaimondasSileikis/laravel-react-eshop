import { createBrowserRouter } from "react-router-dom"

import Orders from "./views/admin/Orders";
import AdminDashboard from "./views/admin/AdminDashboard";
import Home from "./views/public/Home";
import SignUp from "./views/public/SignUp";
import Login from "./views/public/Login";
import AdminLayout from "./components/admin/AdminLayout";
import MyOrders from "./views/client/MyOrders";



import Profile from "./views/client/Profile";
import ClientLayout from "./components/client/ClientLayout";
import PublicLayout from "./components/public/PublicLayout";
import ProductView from "./views/public/ProductView";

import ProductsList from "./views/admin/ProductsList";

import ProductsByCategory from "./views/public/ProductsByGroup";



const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      // {
      //   path: '/home',
      //   element: <Navigate to='/' />,
      // },
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/:groupSlug',
        element: <ProductsByCategory/>,
      },
      {
        path: '/:groupSlug/:productID',
        element: <ProductView />,
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
