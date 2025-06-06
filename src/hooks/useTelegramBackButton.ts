import { useEffect, useState, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import { usePlatform } from './usePlatform';
import { useNavigate, useLocation } from 'react-router-dom';

interface BackButtonOptions {
  onClick?: () => void;
  isVisible?: boolean;
  enableNavigationHistory?: boolean;
}

export const useTelegramBackButton = (options?: BackButtonOptions) => {
  const { isTma } = usePlatform();
  const [visible, setVisible] = useState(options?.isVisible ?? false);
  const navigate = useNavigate();
  const location = useLocation();

  const show = useCallback(() => {
    if (!isTma) return;

    WebApp.BackButton.show();
    setVisible(true);
  }, [isTma]);

  const hide = useCallback(() => {
    if (!isTma) return;

    WebApp.BackButton.hide();
    setVisible(false);
  }, [isTma]);

  const setOnClick = useCallback((callback: () => void) => {
    if (!isTma) return;

    WebApp.BackButton.onClick(callback);
  }, [isTma]);

  // Автоматическое управление BackButton для навигации
  useEffect(() => {
    if (!isTma) return;

    const enableNavigationHistory = options?.enableNavigationHistory ?? true;

    if (enableNavigationHistory) {
      // Показываем BackButton только если мы не на главной странице
      if (location.pathname !== '/') {
        WebApp.BackButton.show();
        setVisible(true);

        // Устанавливаем действие по умолчанию - возврат назад
        const defaultBackAction = () => {
          navigate(-1);
        };

        WebApp.BackButton.onClick(options?.onClick || defaultBackAction);
      } else {
        WebApp.BackButton.hide();
        setVisible(false);
      }
    } else if (options?.isVisible) {
      WebApp.BackButton.show();
      setVisible(true);

      if (options?.onClick) {
        WebApp.BackButton.onClick(options.onClick);
      }
    }

    // Очистка при размонтировании
    return () => {
      WebApp.BackButton.offClick();
      if (!options?.enableNavigationHistory) {
        WebApp.BackButton.hide();
      }
    };
  }, [isTma, location.pathname, navigate, options]);

  return {
    show,
    hide,
    setOnClick,
    visible,
    isSupported: isTma
  };
};