import { createBrowserRouter } from "react-router-dom"
import {DashboardLayout, ShopPrivateLayout, ShopPublicLayout} from "./layouts";
import {SignUp, Login, AuthProvider, RequireAuth} from "./features/auth";
import {Dashboard} from "./features/dashboard";
import {ProductsList, ProductDetail, ProductEdit, ProductCreate} from "./features/dashboard/products";
import {CategoriesList, CategoryDetail, CategoryCreate, CategoryEdit} from "./features/dashboard/categories";
import {OrdersList, OrderDetail } from "./features/dashboard/orders";
import {Home} from "./features/shop";
import {Products, ProductView, ProductsByCategory} from "./features/shop/shopProducts";
import {MyOrders, Profile, MyOrderView} from "./features/shop/shopper";
import NotFound from "./shared/NotFound";

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/',
    element: <ShopPublicLayout />,
    meta: { requiresAuth: true },
    children: [
      { index: true, element: <Home /> },
      { path: 'all', element: <Products /> },
      { path: ':categorySlug', element: <ProductsByCategory /> },
      { path: ':categorySlug/:productSlug', element: <ProductView /> },
    ],
  },
  {
    path: '/profile',
    element: <ShopPrivateLayout />,
    meta: { requiresAuth: true, requiresPrivate: true },
    children: [
      { index: true, element: <Profile /> },
      { path: 'my-orders', element: <MyOrders /> },
      { path: 'my-orders/:id', element: <MyOrderView /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'products', element: <ProductsList /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'products/create', element: <ProductCreate /> },
      { path: 'products/edit/:id', element: <ProductEdit /> },
      { path: 'categories', element: <CategoriesList /> },
      { path: 'categories/:id', element: <CategoryDetail /> },
      { path: 'categories/create', element: <CategoryCreate /> },
      { path: 'categories/edit/:id', element: <CategoryEdit /> },
      { path: 'orders', element: <OrdersList /> },
      { path: 'orders/:id', element: <OrderDetail /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/not-found',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(
  routes.map((route) => {
    if (route.meta?.requiresAuth) {
      return {
        ...route,
        element: (
          <AuthProvider >
            <RequireAuth
              requiresAdmin={route?.meta?.requiresAdmin}
              requiresPrivate={route?.meta?.requiresPrivate}
            >
              {route.element}
            </RequireAuth>
          </AuthProvider>
        ),
      };
    }
    return route;
  })
);

export default router;
