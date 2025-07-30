import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ROUTES } from '../../../constants/routes';
import { useAppContext } from '../../../context/AppContext';

const Header = () => {
  const { platformInfo } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactsClick = () => {
    if (location.pathname === ROUTES.HOME) {
      // If we're already on the home page, scroll to contacts section
      scrollToContacts();
    } else {
      // If we're on another page, navigate to home and then scroll to contacts
      // Store the intent to scroll to contacts in sessionStorage
      sessionStorage.setItem('scrollToContacts', 'true');
      navigate(ROUTES.HOME);
    }
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-[60px] w-full items-center justify-between bg-black px-4 md:px-[5%] shadow-md">
        {/* Логотип */}
        <Link to={ROUTES.HOME} className="h-[40px] w-[160px] md:h-[50px] md:w-[240px] shrink-0">
          <img
            src="./logo main light.svg"
            alt="Логотип MusicHall"
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Основная навигация - скрыта на мобильных */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 px-4">
          <Link
            to={ROUTES.LANDING}
            className="text-brand-white hover:text-brand-copper transition-colors whitespace-nowrap"
          >
            О нас
          </Link>

          <Link
            to={ROUTES.CATALOG}
            className="text-brand-white hover:text-brand-copper transition-colors whitespace-nowrap"
          >
            Каталог
          </Link>

          <Link
            to={ROUTES.BRANDS}
            className="text-brand-white hover:text-brand-copper transition-colors whitespace-nowrap"
          >
            Бренды
          </Link>
          
          <button
            onClick={handleContactsClick}
            className="text-brand-white hover:text-brand-copper transition-colors whitespace-nowrap"
          >
            Контакты
          </button>
          <Link
            to={ROUTES.FAQ}
            className="text-brand-white hover:text-brand-copper transition-colors whitespace-nowrap"
          >
            Дополнительная информация
          </Link>
        </nav>

        {/* Правая часть с корзиной и кнопкой */}
        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <Link
            to={ROUTES.CART}
            className="flex items-center gap-1 md:gap-2 text-brand-white hover:text-brand-copper transition-colors"
            title="Корзина"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            <span className="hidden sm:inline">Корзина</span>
          </Link>

          <Link
            to={ROUTES.CATALOG}
            className="flex items-center justify-center rounded-full bg-[#47B139] px-2 py-1 md:px-4 md:py-2 text-sm md:text-base text-brand-black transition-all hover:bg-brand-dark-copper hover:translate-x-0.5"
          >
            <span className="hidden md:inline">Перейти в каталог</span>
            <span className="md:hidden">Каталог</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden flex items-center justify-center w-8 h-8 text-brand-white hover:text-brand-copper transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Индикатор платформы */}
          <div className="hidden sm:block rounded border border-brand-mid-gray bg-brand-mid-gray px-2 py-1 text-xs text-brand-white">
            {platformInfo.isTma ? 'TMA' : 'Web'}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={handleMobileMenuToggle}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-brand-black shadow-2xl transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-6">
          {/* Close button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={handleMobileMenuToggle}
              className="text-brand-white hover:text-brand-copper transition-colors"
              aria-label="Close mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile navigation links */}
          <nav className="flex flex-col space-y-6">
            <Link
              to={ROUTES.LANDING}
              onClick={handleMobileNavClick}
              className="text-brand-white hover:text-brand-copper transition-colors text-lg font-medium"
            >
              О нас
            </Link>

            <Link
              to={ROUTES.CATALOG}
              onClick={handleMobileNavClick}
              className="text-brand-white hover:text-brand-copper transition-colors text-lg font-medium"
            >
              Каталог
            </Link>

            <Link
              to={ROUTES.BRANDS}
              onClick={handleMobileNavClick}
              className="text-brand-white hover:text-brand-copper transition-colors text-lg font-medium"
            >
              Бренды
            </Link>
            
            <button
              onClick={handleContactsClick}
              className="text-brand-white hover:text-brand-copper transition-colors text-lg font-medium text-left"
            >
              Контакты
            </button>

            <Link
              to={ROUTES.FAQ}
              onClick={handleMobileNavClick}
              className="text-brand-white hover:text-brand-copper transition-colors text-lg font-medium"
            >
              Дополнительная информация
            </Link>
          </nav>

          {/* Platform indicator for mobile */}
          <div className="mt-auto pt-6 border-t border-brand-mid-gray">
            <div className="rounded border border-brand-mid-gray bg-brand-mid-gray px-3 py-2 text-sm text-brand-white text-center">
              {platformInfo.isTma ? 'Telegram Mini App' : 'Web Browser'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;