import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './constants/routes';

// Импорт страниц (заглушки, реализуем позже)
import Home from './pages/Home';
import Landing from './pages/Landing';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BrandsList from './pages/BrandsList';
import BrandDetail from './pages/BrandDetail';
import FAQ from './pages/FAQ';
import AppLayout from './components/layout/AppLayout';
// TEST: Import TestSpline page
import TestSpline from './pages/TestSpline';

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
        path: ROUTES.LANDING,
        element: <Landing />,
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
        path: ROUTES.BRANDS,
        element: <BrandsList />,
      },
      {
        path: ROUTES.BRAND_DETAIL,
        element: <BrandDetail />,
      },
      {
        path: ROUTES.FAQ,
        element: <FAQ />,
      },
      // TEST: Add /test-spline route
      {
        path: 'test-spline',
        element: <TestSpline />,
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