import { useEffect, useState, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import { usePlatform } from './usePlatform';

interface MainButtonOptions {
  text: string;
  onClick?: () => void;
  color?: string;
  textColor?: string;
  isVisible?: boolean;
  isActive?: boolean;
  isProgressVisible?: boolean;
}

export const useTelegramMainButton = (options?: MainButtonOptions) => {
  const { isTma } = usePlatform();
  const [visible, setVisible] = useState(options?.isVisible ?? false);
  const [active, setActive] = useState(options?.isActive ?? true);
  const [loading, setLoading] = useState(options?.isProgressVisible ?? false);

  const show = useCallback(() => {
    if (!isTma) return;

    WebApp.MainButton.show();
    setVisible(true);
  }, [isTma]);

  const hide = useCallback(() => {
    if (!isTma) return;

    WebApp.MainButton.hide();
    setVisible(false);
  }, [isTma]);

  const enable = useCallback(() => {
    if (!isTma) return;

    WebApp.MainButton.enable();
    setActive(true);
  }, [isTma]);

  const disable = useCallback(() => {
    if (!isTma) return;

    WebApp.MainButton.disable();
    setActive(false);
  }, [isTma]);

  const showProgress = useCallback((leaveActive: boolean = false) => {
    if (!isTma) return;

    WebApp.MainButton.showProgress(leaveActive);
    setLoading(true);
    if (!leaveActive) {
      setActive(false);
    }
  }, [isTma]);

  const hideProgress = useCallback(() => {
    if (!isTma) return;

    WebApp.MainButton.hideProgress();
    setLoading(false);
    setActive(true);
  }, [isTma]);

  const setOnClick = useCallback((callback: () => void) => {
    if (!isTma) return;

    WebApp.MainButton.onClick(callback);
  }, [isTma]);

  const setText = useCallback((text: string) => {
    if (!isTma) return;

    WebApp.MainButton.setText(text);
  }, [isTma]);

  // Установка текста и обработчика при инициализации или изменении опций
  useEffect(() => {
    if (!isTma || !options) return;

    if (options.text) {
      WebApp.MainButton.setText(options.text);
    }

    if (options.onClick) {
      WebApp.MainButton.onClick(options.onClick);
    }

    if (options.color) {
      WebApp.MainButton.setParams({
        color: options.color
      });
    }

    if (options.textColor) {
      WebApp.MainButton.setParams({
        text_color: options.textColor
      });
    }

    if (options.isVisible) {
      WebApp.MainButton.show();
      setVisible(true);
    } else {
      WebApp.MainButton.hide();
      setVisible(false);
    }

    if (options.isActive === false) {
      WebApp.MainButton.disable();
      setActive(false);
    } else {
      WebApp.MainButton.enable();
      setActive(true);
    }

    if (options.isProgressVisible) {
      WebApp.MainButton.showProgress(options.isActive !== false);
      setLoading(true);
      if (options.isActive === false) {
        setActive(false);
      }
    }

    // Очистка при размонтировании
    return () => {
      WebApp.MainButton.offClick();
      WebApp.MainButton.hide();
    };
  }, [isTma, options]);

  return {
    show,
    hide,
    enable,
    disable,
    showProgress,
    hideProgress,
    setOnClick,
    setText,
    visible,
    active,
    loading,
    isSupported: isTma
  };
};