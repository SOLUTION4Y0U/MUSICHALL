import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Прокручиваем наверх при каждом изменении пути
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Используем 'auto' для мгновенной прокрутки
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;