import React, { createContext, useContext, ReactNode } from 'react';
import WebApp from '@twa-dev/sdk';
import { usePlatform } from '../hooks/usePlatform';

interface TelegramUIContextProps {
  hapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  expandApp: () => void;
  closeApp: () => void;
  openLink: (url: string) => void;
  isExpanded: boolean;
}

const TelegramUIContext = createContext<TelegramUIContextProps | undefined>(undefined);

export const TelegramUIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isTma } = usePlatform();

  // Отслеживаем состояние расширения приложения
  const [isExpanded, setIsExpanded] = React.useState(
    isTma ? WebApp.isExpanded : true
  );

  React.useEffect(() => {
    if (!isTma) return;

    // Принудительно применяем светлую тему
    try {
      WebApp.setHeaderColor('#ffffff');
      WebApp.setBackgroundColor('#ffffff');
    } catch (e) {
      console.log('Error setting Telegram colors');
    }

    const handleViewportChanged = () => {
      setIsExpanded(WebApp.isExpanded);
    };

    WebApp.onEvent('viewportChanged', handleViewportChanged);

    return () => {
      WebApp.offEvent('viewportChanged', handleViewportChanged);
    };
  }, [isTma]);

  // Функции для работы с haptic feedback
  const hapticFeedback = {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {
      if (!isTma) return;
      WebApp.HapticFeedback.impactOccurred(style);
    },
    notificationOccurred: (type: 'error' | 'success' | 'warning') => {
      if (!isTma) return;
      WebApp.HapticFeedback.notificationOccurred(type);
    },
    selectionChanged: () => {
      if (!isTma) return;
      WebApp.HapticFeedback.selectionChanged();
    }
  };

  const expandApp = () => {
    if (!isTma) return;
    WebApp.expand();
  };

  const closeApp = () => {
    if (!isTma) return;
    WebApp.close();
  };

  const openLink = (url: string) => {
    if (!isTma) {
      window.open(url, '_blank');
      return;
    }
    WebApp.openLink(url);
  };

  const contextValue: TelegramUIContextProps = {
    hapticFeedback,
    expandApp,
    closeApp,
    openLink,
    isExpanded
  };

  return (
    <TelegramUIContext.Provider value={contextValue}>
      {children}
    </TelegramUIContext.Provider>
  );
};

export const useTelegramUI = (): TelegramUIContextProps => {
  const context = useContext(TelegramUIContext);
  if (!context) {
    throw new Error('useTelegramUI must be used within a TelegramUIProvider');
  }
  return context;
};