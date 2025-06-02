import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import WebApp from '@twa-dev/sdk';
import { useFullScreen } from '../../hooks/useFullScreen';

const AppLayout = () => {
  // Активируем полноэкранный режим
  useFullScreen();

  // Расширить мини-приложение на полный экран при загрузке
  useEffect(() => {
    document.documentElement.style.backgroundColor = '#040404';
    document.body.style.backgroundColor = '#040404';
    document.documentElement.classList.add('scrollbar-thin', 'scrollbar-webkit');
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
    <div className="app-container bg-brand-black">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;