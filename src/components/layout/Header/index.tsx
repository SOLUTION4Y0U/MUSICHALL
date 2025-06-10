import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useAppContext } from '../../../context/AppContext';

const Header = () => {
  const { platformInfo } = useAppContext();

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-[60px] w-full items-center justify-between bg-brand-black px-4 md:px-[5%] shadow-md">
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
          to="https://maria-nik.github.io/landing-page-store-/"
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
          onClick={scrollToFooter}
          className="text-brand-white hover:text-brand-copper transition-colors whitespace-nowrap"
        >
          Контакты
        </button>
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
          className="rounded-full bg-brand-copper px-2 py-1 md:px-4 md:py-2 text-sm md:text-base text-brand-black transition-all hover:bg-brand-dark-copper hover:translate-x-0.5"
        >
          <span className="hidden md:inline">Перейти в каталог</span>
          <span className="md:hidden">Каталог</span>
        </Link>

        {/* Индикатор платформы */}
        <div className="hidden sm:block rounded border border-brand-mid-gray bg-brand-mid-gray px-2 py-1 text-xs text-brand-white">
          {platformInfo.isTma ? 'TMA' : 'Web'}
        </div>
      </div>
    </header>
  );
};

export default Header;