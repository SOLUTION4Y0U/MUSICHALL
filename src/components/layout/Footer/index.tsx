import { FC } from 'react';
import './Footer.css';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Контакты</h3>
          <ul className="footer-list">
            <li className="footer-item">
              <span className="footer-label">Email:</span>
              <a href="mailto:info@example.com" className="footer-link">info@example.com</a>
            </li>
            <li className="footer-item">
              <span className="footer-label">Телефон:</span>
              <a href="tel:+79991234567" className="footer-link">+7 (999) 123-XX-XX</a>
            </li>
            <li className="footer-item">
              <span className="footer-label">Адрес:</span>
              <span>г. Москва, ул. Пушкина, д. 666</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Социальные сети</h3>
          <div className="social-links">
            <a href="https://t.me/example" className="social-link" aria-label="Telegram">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2s-.16-.05-.23-.03c-.1.03-1.62 1.03-4.58 3.03-.43.3-.82.45-1.17.44-.39-.01-1.13-.22-1.68-.4-.68-.23-1.22-.35-1.17-.74.02-.2.3-.4.79-.61 3.16-1.37 5.26-2.28 6.3-2.71 3-.13 3.62.21 3.94.68.1.14.17.57.13.85z"/>
              </svg>
            </a>
            <a href="https://vk.com/example" className="social-link" aria-label="VK">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M19.915 13.028c-.388-.49-.277-.708 0-1.146.005-.005 3.208-4.431 3.538-5.932l.002-.001c.164-.547 0-.949-.793-.949h-2.624c-.668 0-.976.345-1.141.731 0 0-1.336 3.198-3.226 5.271-.61.599-.892.791-1.225.791-.164 0-.419-.192-.419-.739V5.949c0-.656-.187-.949-.74-.949H9.161c-.419 0-.668.306-.668.591 0 .622.945.765 1.043 2.515v3.797c0 .832-.151.985-.486.985-.892 0-3.057-3.211-4.34-6.886-.259-.713-.512-1.001-1.185-1.001H.9c-.749 0-.9.345-.9.731 0 .682.892 4.073 4.148 8.553C6.318 17.343 9.374 19 12.154 19c1.671 0 1.875-.368 1.875-1.001 0-2.922-.151-3.198.686-3.198.388 0 1.056.192 2.616 1.667C19.114 18.217 19.407 19 20.405 19h2.625c.749 0 1.126-.368.909-1.094-.499-1.527-3.862-4.668-4.024-4.878z"/>
              </svg>
            </a>
            <a href="https://youtube.com/example" className="social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M21.582 7.15c-.252-1.043-1.026-1.865-2.028-2.124C17.505 4.5 12 4.5 12 4.5s-5.505 0-7.554.526c-1.002.26-1.776 1.081-2.028 2.124C2 9.305 2 12 2 12s0 2.695.418 4.85c.252 1.043 1.026 1.865 2.028 2.124C6.495 19.5 12 19.5 12 19.5s5.505 0 7.554-.526c1.002-.26 1.776-1.081 2.028-2.124C22 14.695 22 12 22 12s0-2.695-.418-4.85zM9.75 15.338V8.662l5.945 3.338-5.945 3.338z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">© {currentYear} Telegram Mini App Store. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;