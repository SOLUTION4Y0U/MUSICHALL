import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useAppContext } from '../../../context/AppContext';
import './Header.css';

const Header = () => {
  const { platformInfo } = useAppContext();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to={ROUTES.HOME}>Marketplace</Link>
        </div>
        <div className="header-right">
          <nav className="nav">
            <Link to={ROUTES.CATALOG} className="nav-link" title="Каталог">
              <svg className="nav-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
              </svg>
              <span className="nav-text">Каталог</span>
            </Link>
            <Link to={ROUTES.CART} className="nav-link" title="Корзина">
              <svg className="nav-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span className="nav-text">Корзина</span>
            </Link>
          </nav>
          <div className="platform-indicator">
            {platformInfo.isTma ? 'TMA' : 'Web'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;