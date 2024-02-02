import { Navigate, createBrowserRouter } from "react-router-dom"
import Products from "./views/admin/Products";
import Orders from "./views/admin/Orders";
import AdminDashboard from "./views/admin/AdminDashboard";
import Store from "./views/public/Store";
import SignUp from "./views/public/SignUp";
import Login from "./views/public/Login";
import AdminLayout from "./components/admin/AdminLayout";
import MyOrders from "./views/client/MyOrders";
import Cart from "./views/public/Cart";
import Items from "./views/public/Items";
import ItemView from "./views/public/ItemView";
import Profile from "./views/client/Profile";
import ClientLayout from "./components/client/ClientLayout";
import PublicLayout from "./components/public/PublicLayout";


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
        element: <Login />
      },
      {
        path: '/signup',
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
        path: 'products',
        element: <Products />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },

])

export default router;
