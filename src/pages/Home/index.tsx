import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useBrands } from '../../hooks/useBrands';
//import { useProducts } from '../../hooks/useProducts';
// import ProductList from '../../components/features/ProductList';
import { usePlatformUIControls } from '../../platform';
import { usePlatform } from '../../hooks/usePlatform';

import type { SplineProps } from '@splinetool/react-spline';


const Home = () => {
  const { loading } = useBrands();
  //const { products } = useProducts({ sortBy: 'rating-desc' });
  const { showMainButton, hideMainButton, navigateTo } = usePlatformUIControls();
  const { isTma } = usePlatform();
  const [currentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  

  const brandImages = [
    './philips_banner1.png',
    './music_banner.jpg',
    './emtop_banner1.jpg',
    './others_banner1.jpg'
  ];

  const [Spline, setSpline] = useState<React.ComponentType<SplineProps> | null>(null);
  useEffect(() => {
    // Асинхронно загружаем компонент
    import('@splinetool/react-spline').then((module) => {
      setSpline(() => module.default);
    });
  }, []);

  const SplineComponent = Spline || (() => <div>Загрузка...</div>);
  // Очищаем данные скролла каталога при переходе на главную
  useEffect(() => {
    sessionStorage.removeItem('catalogScrollPosition');
    sessionStorage.removeItem('fromCatalog');
  }, []);

  // Handle navigation to contacts section
  useEffect(() => {
    const scrollToContacts = () => {
      const contactsSection = document.getElementById('contacts');
      if (contactsSection) {
        setTimeout(() => {
          contactsSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    // Check for hash navigation
    if (window.location.hash === '#contacts') {
      scrollToContacts();
    }
    
    // Check for sessionStorage intent to scroll to contacts
    const shouldScrollToContacts = sessionStorage.getItem('scrollToContacts');
    if (shouldScrollToContacts === 'true') {
      sessionStorage.removeItem('scrollToContacts');
      // Use a longer timeout to ensure the component is fully mounted
      setTimeout(() => {
        scrollToContacts();
      }, 300);
    }
  }, []);

  

  // Переключение слайдов по клику на точки
  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * sliderRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  // Автоматическая прокрутка (опционально)
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % brandImages.length;
      goToSlide(nextSlide);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, brandImages.length]);

  useEffect(() => {
    showMainButton('Перейти в каталог', () => {
      if (isTma) {
        navigateTo(ROUTES.CATALOG);
      } else {
        window.location.href = ROUTES.CATALOG;
      }
    });
    return () => hideMainButton();
  }, [showMainButton, hideMainButton, navigateTo, isTma]);

  //const featuredProducts = products.slice(0, 4);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-copper border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero Section */}
      <div className="relative flex h-screen">
        {/* Левая часть: текст и кнопки */}
        <div className="absolute top-[80px] left-0 flex flex-col justify-center px-8 md:px-16 py-12 text-brand-light-gray z-10">
          <img
            src="./logo main light.svg"
            alt="Логотип MusicHall"
            className="mx-auto md:mx-0 mb-6 h-[150px] w-[500px] object-contain"
          />
          <p className="text-lg md:text-6xl mb-6 md:mb-8 text-brand-light-gray/90 leading-relaxed w-2/3">
            Международный мультибрендовый дистрибьютор музыкальных инструментов, цифровой и портативной техники, аксессуаров, ручных и электроинструментов
          </p>
          <Link
            to={ROUTES.CATALOG}
            className="inline-flex items-center justify-center rounded-full bg-brand-white text-brand-black font-bold text-sm md:text-3xl px-6 py-3 md:px-8 md:py-4 w-1/2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-brand-dark-copper shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-copper focus:ring-offset-2"
          >
            <span className="hidden md:inline">Перейти в каталог</span>
            <span className="md:hidden">Каталог</span>
          </Link>
          
        </div>

        {/* Правая часть: Spline компонент */}
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute top-[-50px] left-[400px] h-full w-[calc(100%-400px)]">
            <SplineComponent
              scene="https://prod.spline.design/VOvM5rREhyEgRYbe/scene.splinecode" 
            />
          </div>
        </div>
      </div>


      {/* Brands Section */}
      <section className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-8">
        <h2 className="reveal-up text-3xl max-md:text-xl">
          Наши бренды
        </h2>

        <div className="reveal-up carousel-container mt-10">
          <div className="carousel lg:w-place-content-center mt-6 flex w-full gap-5 max-md:gap-2">
            {/* First row of brands - duplicated for infinite scroll */}
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/philips.svg"
                alt="Philips"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[50px] w-[180px] mb-[-40px]">
              <img
                src="/assets/images/brand-logos/Nothing.png"
                alt="Nothing"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/emtop.svg"
                alt="EMTOP"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/Garmin.png"
                alt="Garmin"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/music_hall.svg"
                alt="MusicHall"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/onmusic_full_green.svg"
                alt="ON"
                className="h-full w-full object-contain"
              />
            </div>
            {/* Duplicate the same brands for seamless loop */}
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/philips.svg"
                alt="Philips"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[50px] w-[180px] mb-[-40px]">
              <img
                src="/assets/images/brand-logos/Nothing.png"
                alt="Nothing"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/emtop.svg"
                alt="EMTOP"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/Garmin.png"
                alt="Garmin"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/music_hall.svg"
                alt="MusicHall"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/onmusic_full_green.svg"
                alt="ON"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="reveal-up carousel-container">
          <div className="carousel lg:w-place-content-center mt-6 flex w-full gap-5 max-md:gap-2">
            {/* Second row of brands - duplicated for infinite scroll */}
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/cmf-by-nothing.png.webp"
                alt="cmf"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/kyvol.png"
                alt="Kyvol"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/viwoods.png"
                alt="Viwoods"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/apple.svg"
                alt="Apple"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/Samsung.png"
                alt="Samsung"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/imiki.png"
                alt="imiki"
                className="h-full w-full object-contain"
              />
            </div>
            {/* Duplicate the same brands for seamless loop */}
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/cmf-by-nothing.png.webp"
                alt="cmf"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/kyvol.png"
                alt="Kyvol"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/viwoods.png"
                alt="Viwoods"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/apple.svg"
                alt="Apple"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/Samsung.png"
                alt="Samsung"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="carousel-img h-[30px] w-[150px]">
              <img
                src="/assets/images/brand-logos/imiki.png"
                alt="imiki"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="text-center mt-8 mb-8 md:mt-12">
            <Link to={ROUTES.BRANDS} className="btn-secondary">
              Посмотреть все бренды
            </Link>
          </div>
        </div>
      </section>

      

      {/* Featured Products Section */}
      {/* <section className="space-y-6 px-[18px] pb-8 md:pb-16">
        <div>
          <h2 className="text-2xl md:text-3xl font-secondary font-bold text-brand-white mb-2">
            Популярные товары
          </h2>
          <div className="w-20 h-1 bg-gradient-copper rounded-full"></div>
        </div>

        <ProductList products={featuredProducts} loading={loading} variant="home" />

        <div className="text-center mt-8">
          <Link
            to={ROUTES.CATALOG}
            className="inline-flex items-center space-x-2 text-brand-white border-2 border-brand-copper px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-brand-copper hover:text-brand-white transition-all duration-300 font-medium text-sm md:text-base"
          >
            <span>Посмотреть все товары</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section> */}

      
      {/* Contacts Section */}
      <section className="mt-5 flex min-h-[80vh] w-full flex-col place-content-center place-items-center p-[2%]">
        <h3 className="text-4xl font-medium text-gray-200 max-md:text-2xl" id="contacts">
          Контакты
        </h3>
        <div className="mt-6 flex max-w-[90%] place-content-center gap-8 max-lg:flex-col">
          

          <div className="reveal-up flex h-fit w-[600px] break-inside-avoid flex-col gap-4 rounded-lg border-[1px] border-outlineColor bg-secondary p-4 max-lg:w-[400px]">
            <p className="mt-4 text-gray-300">
              По вопросам сотрудничества:
            </p>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">info@oneenergy.ru</div>
              <div className="font-semibold">8 800 505 22 75</div>
              <div className="text-gray-400">
                Общество с ограниченной ответственностью «ВАНЭНЕРДЖИ»
                <br /><br />
                Юридический адрес: Российская Федерация, Московская область, городской округ Красногорск, территория автодорога «Балтия», 26-й километр, дом 5, строение 3.
                <br />
                Фактический адрес: Российская Федерация, Московская область, городской округ Красногорск, территория автодорога «Балтия», 26-й километр, дом 5, строение 3.
                <br /><br />
                Адрес склада: г. Истра, посёлок Октябрьской Фабрики, д.17
                <br /><br />
                ИНН 7725305764 КПП 770301001
              </div>
            </div>
          </div>
          <div className="reveal-up overflow-hidden rounded-xl shadow-lg w-[800px] h-[400px] max-lg:w-[320px] max-lg:h-[300px]">
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A4d02973b5d70e6f56f4f3d16a840a1ef04d1d03e6faa85d6a9046b69d3d01186&amp;source=constructor" 
            width="800" 
            height="400" 
            className="block w-full h-full"
            title="Карта офиса"
          ></iframe>
        </div>
        </div>
      </section>

    </div>
  );
};

export default Home;