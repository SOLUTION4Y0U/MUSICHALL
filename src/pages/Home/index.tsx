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
  const { brands, loading } = useBrands();
  //const { products } = useProducts({ sortBy: 'rating-desc' });
  const { showMainButton, hideMainButton, navigateTo } = usePlatformUIControls();
  const { isTma } = usePlatform();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  

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

  // Обработчик прокрутки
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const slideWidth = sliderRef.current.clientWidth;
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    }
  };

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
      const nextSlide = (currentSlide + 1) % Math.min(brands.length, 4);
      goToSlide(nextSlide);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, brands.length]);

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

  // Берем топ-4 бренда для отображения
  const topBrands = brands.slice(0, 4);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-copper border-t-transparent"></div>
      </div>
    );
  }

  const brandImages = [
    './philips_banner1.png',
    './music_banner.jpg',
    './emtop_banner1.jpg',
    './others_banner1.jpg'
  ];

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero Section */}
      <div className="relative flex h-screen">
        {/* Левая часть: текст и кнопки */}
        <div className="absolute top-[150px] left-0 flex flex-col justify-center px-8 md:px-16 py-12 text-brand-light-gray z-10">
          <img
            src="./logo main light.svg"
            alt="Логотип MusicHall"
            className="mx-auto md:mx-0 mb-6 h-[150px] w-[500px] object-contain"
          />
          <p className="text-lg md:text-6xl mb-6 md:mb-8 text-brand-light-gray/90 leading-relaxed w-2/3">
            международный поставщик мобильных телефонов, портативной электроники и бытовой техники
          </p>
          <Link
            to={ROUTES.CATALOG}
            className="inline-flex items-center justify-center rounded-full bg-brand-copper text-brand-black font-bold text-sm md:text-3xl px-6 py-3 md:px-8 md:py-4 w-1/2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-brand-dark-copper shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-copper focus:ring-offset-2"
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
      <section className="py-8 md:py-16 px-[18px]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-secondary text-2xl md:text-3xl font-bold text-brand-white mb-4">
            Наши бренды
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-copper to-transparent mb-6 md:mb-8"></div>

          {/* Slider Container */}
          <div className="relative overflow-hidden">
            <div
              ref={sliderRef}
              className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
              onScroll={handleScroll}
              style={{ scrollBehavior: 'smooth' }}
            >
              {topBrands.map((brand, index) => (
                <div
                  key={brand.id}
                  className="flex-shrink-0 w-full snap-start px-1 md:px-2"
                >
                  <Link
                    to={index === topBrands.length - 1 ? ROUTES.BRANDS : `/brands/${brand.id}`}
                    className="block relative h-[600px] sm:h-[600px] md:h-[600px] lg:h-[600px] group"
                  >
                    <div className="w-full h-full rounded-lg md:rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={brandImages[index] || brandImages[3]}
                        alt={brand.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
                      <h3 className="text-xl md:text-2xl font-bold text-brand-white group-hover:text-brand-copper transition-colors duration-300">
                        {index === topBrands.length - 1 ? 'Все бренды' : brand.name}
                      </h3>
                      {index !== topBrands.length - 1 && (
                        <p className="text-brand-light-gray/80 text-sm md:text-base mt-1">
                          {brand.productsCount} товаров • Рейтинг {brand.averageRating}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 md:mt-6 space-x-2">
              {topBrands.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-brand-copper w-4 md:w-6'
                      : 'bg-brand-mid-gray'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-8 md:mt-12">
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

      
      <section
            className="mt-5 flex min-h-[80vh] w-full flex-col place-content-center place-items-center p-[2%]"
        >
            <h3
                className="text-4xl font-medium text-gray-200 max-md:text-2xl"
                id = "contacts"
            >
                Контакты
            </h3>
            
            <div
                className="mt-6 flex max-w-[80%] flex-wrap place-content-center gap-8 max-lg:flex-col"
            >
                <div
                    className="reveal-up flex h-fit w-[500px] break-inside-avoid flex-col gap-4 rounded-lg border-[1px] border-outlineColor bg-secondary p-4 max-lg:w-[320px]"
                >
                    <p className="mt-4 text-gray-300">
                        Общество с ограниченной ответственностью "ТЕЛЕКОМ РИТЕЙЛ"
                    </p>    
                    <div className="flex flex-col gap-1">
                        
                        <div className="text-gray-400">Москва, Пресненская Набережная, 12
                        Башня Федерация Восток,
                        этаж 56, офис 20 </div>
                        <div className="text-gray-400">ИНН 7703417810, ОГРН 5167746195667</div>
                    </div>
                    
                </div>
                
                <div
                    className="reveal-up flex h-fit w-[500px] break-inside-avoid flex-col gap-4 rounded-lg border-[1px] border-outlineColor bg-secondary p-4 max-lg:w-[320px]"
                >
                    <p className="mt-4 text-gray-300">
                        По вопросам сотрудничества:
                    </p>
                    <div className="flex flex-col gap-1">
                            <div className="font-semibold">info@telecom-retail.ru</div>
                            <div className="font-semibold">8 800 505 22 75</div>
                            <div className="text-gray-400">Общество с ограниченной ответственностью «ТЕЛЕКОМ РИТЕЙЛ»

Юридический адрес: 123 112, город Москва, Пресненская набережная, дом 12, этаж 56, офис 20; Фактический адрес: Фактический адрес: 123 112, город Москва, Пресненская набережная, дом 12, этаж 56, офис 20

ИНН 7 703 417 810, ОГРН 5 167 746 195 667 сообщает, что на имеющихся 11 (одиннадцати) рабочих местах компании силами Автономной некоммерческой организация дополнительного профессионального образования «Учебно-консультационный центр «Труд», Регистрационный номер 136 от 19.10.2015, была проведена специальная оценка условий труда. Отчет утвержден 21.10.2020 г.

По результатам идентификации не выявлены вредные и (или) опасные производственные факторы или условия труда по результатам исследований (испытаний) и измерений вредных и (или) опасных производственных факторов признаны оптимальными или допустимыми, условия труда соответствуют государственным нормативным требованиям охраны труда.</div>
                        </div>
                    
                </div>
                
                
                
            </div>
        </section>
        <section className="mt-20 flex justify-center px-4">
        <div className="overflow-hidden rounded-xl shadow-lg w-full max-w-[800px]">
            <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A4d02973b5d70e6f56f4f3d16a840a1ef04d1d03e6faa85d6a9046b69d3d01186&amp;source=constructor" 
            width="800" 
            height="400" 
            
            className="block w-full"
            ></iframe>
        </div>
        </section>

    </div>
  );
};

export default Home;