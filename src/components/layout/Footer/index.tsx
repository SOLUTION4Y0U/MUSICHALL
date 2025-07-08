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
              <a href="https://maria-nik.github.io/landing-page-store-/" target="_blank" rel="noopener noreferrer" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                О нас
              </a>
              <a href="/#/contact" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                Контакты
              </a>
              <a href="/#/help" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                Помощь
              </a>
              <a href="/#/test-spline" className="block text-sm text-brand-light-gray hover:text-brand-copper transition-colors duration-300">
                Spline Test
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-md font-secondary font-semibold text-brand-white">
              Контакты
            </h4>
            <div className="space-y-2 text-sm text-brand-light-gray">
              <p>Email: info@oneenergy.ru</p>
              <p>Телефон: 8 800 505 22 75</p>
              <p>Адрес: Российская Федерация, Московская область, городской округ Красногорск, территория автодорога «Балтия», 26-й километр, дом 5, строение 3</p>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-brand-mid-gray mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-brand-mid-gray">
              © {currentYear} ONEENERGY. Все права защищены.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;