import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="mt-5 space-y-4">
            <img
              src="./logo main light.svg"
              alt="Логотип MusicHall"
              className="h-[34px] w-[200px] object-contain"
            />
            <p className="text-sm text-brand-light-gray">
              Ваш надежный партнер в мире электроники.

            </p>
            <p className="text-sm text-brand-light-gray">

              Качественные товары по доступным ценам.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-md font-secondary font-semibold text-brand-white">
              Быстрые ссылки
            </h4>
            <nav className="space-y-2">
              <a href="/#/catalog" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                Каталог
              </a>
              <a href="/#/brands" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                Бренды
              </a>
              <a href="/#/about" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                О нас
              </a>
              <a href="/#/contact" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                Контакты
              </a>
              <a href="/#/help" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                Помощь
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-md font-secondary font-semibold text-brand-white">
              Контакты
            </h4>
            <div className="space-y-2 text-sm text-brand-light-gray">
              <p>Email: info@musichall.com</p>
              <p>Телефон: +7 (999) 123-45-67</p>
              <p>Адрес: г. Москва, ул. Музыкальная, 15</p>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-brand-mid-gray mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-brand-mid-gray">
              © {currentYear} MusicHall. Все права защищены.
            </p>
            <div className="flex space-x-4">
              <a href="/privacy" className="text-sm text-brand-mid-gray hover:text-brand-copper transition-colors duration-300">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="text-sm text-brand-mid-gray hover:text-brand-copper transition-colors duration-300">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;