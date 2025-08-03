import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { usePlatform } from '../../hooks/usePlatform';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isTma } = usePlatform();

  // Функция-помощник для навигации
  const handleNavigation = (path: string) => {
    if (isTma) {
      window.location.hash = `#${path}`;
    } else {
      navigate(path);
    }
  };

  // Перенаправляем на корзину, так как функциональность заказов отключена
  useEffect(() => {
    handleNavigation(ROUTES.CART);
  }, [handleNavigation]);

  return null;
};

export default CheckoutPage;