import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { PlatformInfo, Platform } from '../types/platform';

export const usePlatform = (): PlatformInfo => {
  const [platform, setPlatform] = useState<Platform>('browser');

  useEffect(() => {
    const detectPlatform = () => {
      // Проверяем, запущено ли приложение в Telegram WebApp
      try {
        if (WebApp.initData && WebApp.initData.length > 0) {
          setPlatform('tma');
          return;
        }
      } catch (e) {
        console.warn('Error detecting TMA platform:', e);
      }

      setPlatform('browser');
    };

    detectPlatform();
  }, []);

  return {
    platform,
    isTma: platform === 'tma',
    isBrowser: platform === 'browser',
  };
};