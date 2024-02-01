import { Navigate, createBrowserRouter } from "react-router-dom"

import ClientDashboard from "./views/client/ClientDashboard";
import Products from "./views/admin/Products";
import Orders from "./views/admin/Orders";
import AdminDashboard from "./views/admin/AdminDashboard";
import Store from "./views/public/Store";
import SignUp from "./views/public/SignUp";
import Login from "./views/public/Login";
import AdminLayout from "./components/admin/AdminLayout";
import DefaultLayout from "./components/client/DefaultLayout";
import GuestLayout from "./components/client/GuestLayout";
import MyOrders from "./views/client/MyOrders";
import Cart from "./views/public/Cart";
import Items from "./views/public/Items";
import ItemView from "./views/public/ItemView";


const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/store',
        element: <Navigate to='/' />,
      },
      {
        path: '/',
        element: <Store />,
      },
      {
        path: '/items',
        element: <Items />,
      },
      {
        path: '/item:id',
        element: <ItemView />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },

  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/client',
        element: <Navigate to='/' />,
      },
      {
        path: '/profile',
        element: <ClientDashboard />,
      },
      {
        path: '/my-orders',
        element: <MyOrders />,
      },
    ],
  },

  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <Navigate to='/' />,
      },
      {
        path: '/',
        element: <AdminDashboard />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },

])

export default router;
