import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { usePlatform } from './usePlatform';

export const useFullScreen = () => {
  const { isTma } = usePlatform();

  useEffect(() => {
    if (!isTma || !WebApp?.ready) return;

    try {
      // При запуске приложения максимально расширяем его
      WebApp.expand();

      // Отключаем индикатор загрузки TMA
      if (WebApp.isVersionAtLeast('6.2')) {
        WebApp.disableClosingConfirmation();
      }

      // Установка нужного ViewportHeight
      const setCorrectHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      // Вызываем сразу и при изменении размера окна
      setCorrectHeight();
      window.addEventListener('resize', setCorrectHeight);

      return () => {
        window.removeEventListener('resize', setCorrectHeight);
      };
    } catch (error) {
      console.error('Error setting up full screen mode:', error);
    }
  }, [isTma]);
};