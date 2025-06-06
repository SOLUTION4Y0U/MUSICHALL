import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import WebApp from '@twa-dev/sdk';
import { useFullScreen } from '../../../hooks/useFullScreen';

const AppLayout = () => {
  useFullScreen();

  useEffect(() => {
    if (WebApp?.ready) {
      try {
        WebApp.expand();
      } catch (e) {
        console.log('Not in Telegram Mini App environment or cannot expand');
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-dark font-primary">
      <Header />
      <main className="flex-1 p-4 max-w-screen-xl mx-auto w-full telegram-safe-area">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;