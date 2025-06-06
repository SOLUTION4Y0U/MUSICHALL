import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './constants/routes';

// Импорт страниц (заглушки, реализуем позже)
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AppLayout from './components/layout/AppLayout';

const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.CATALOG,
        element: <Catalog />,
      },
      {
        path: ROUTES.PRODUCT,
        element: <ProductDetail />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: `${ROUTES.CHECKOUT}/*`,
        element: <Checkout />,
      },
      {
        path: '*',
        element: <Home />
      }
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};