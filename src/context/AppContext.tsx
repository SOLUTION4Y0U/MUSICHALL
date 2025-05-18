import React, { createContext, useContext, ReactNode } from 'react';
import { usePlatform } from '../hooks/usePlatform';
import { PlatformInfo } from '../types/platform';
import { TelegramUIProvider } from './TelegramUIContext';

interface AppContextProps {
  platformInfo: PlatformInfo;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const platformInfo = usePlatform();

  return (
    <AppContext.Provider value={{ platformInfo }}>
      <TelegramUIProvider>
        {children}
      </TelegramUIProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};