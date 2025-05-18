import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WebApp from '@twa-dev/sdk';
import './AppLayout.css';
import { useFullScreen } from '../../hooks/useFullScreen';

const AppLayout = () => {
  // Активируем полноэкранный режим
  useFullScreen();

  // Расширить мини-приложение на полный экран при загрузке
  useEffect(() => {
    if (WebApp?.ready) {
      try {
        // Расширяем приложение на весь доступный экран
        WebApp.expand();
      } catch (e) {
        console.log('Not in Telegram Mini App environment or cannot expand');
      }
    }
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;