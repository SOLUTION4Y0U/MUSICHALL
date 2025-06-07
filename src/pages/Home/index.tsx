import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import ProductList from '../../components/features/ProductList';
import { usePlatformUIControls } from '../../platform';
import { usePlatform } from '../../hooks/usePlatform';

const Home = () => {
  const { categories, loading } = useCategories();
  const { products } = useProducts({ sortBy: 'rating-desc' });
  const { showMainButton, hideMainButton, navigateTo } = usePlatformUIControls();
  const { isTma } = usePlatform();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

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
      const nextSlide = (currentSlide + 1) % Math.min(categories.length, 4);
      goToSlide(nextSlide);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, categories.length]);

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

  const featuredProducts = products.slice(0, 4);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-copper border-t-transparent"></div>
      </div>
    );
  }

  const categoryImages = [
    './philips_banner.jpg',
    './music_banner.jpg',
    './emtop_banner.jpg',
    './others_banner.jpg'
  ];

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-black via-brand-dark to-brand-mid-gray/20 text-brand-light-gray py-12 md:py-20 px-[18px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-brand-copper/10 via-transparent to-transparent opacity-30"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="font-secondary text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-4 md:mb-6 drop-shadow-lg">
            ONEENERGY
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-brand-light-gray/90 leading-relaxed">
            международный поставщик мобильных телефонов, портативной электроники и бытовой техники
          </p>
          <Link
            to={ROUTES.CATALOG}
            className="btn-primary inline-block text-base md:text-lg shadow-lg transform hover:scale-105"
          >
            Открыть каталог
          </Link>
        </div>
      </div>

      {/* Categories Section */}
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
              {categories.slice(0, 4).map((category, index) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 w-full snap-start px-1 md:px-2"
                >
                  <Link
                    to={`${ROUTES.CATALOG}?category=${category.id}`}
                    className="block relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px]"
                  >
                    <div className="w-full h-full rounded-lg md:rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={categoryImages[index]}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
                      <h3 className="text-xl md:text-2xl font-bold text-brand-white group-hover:text-brand-copper transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 md:mt-6 space-x-2">
              {categories.slice(0, 4).map((_, index) => (
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
            <Link to={ROUTES.CATALOG} className="btn-secondary">
              Посмотреть все категории
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="space-y-6 px-[18px] pb-8 md:pb-16">
        <div>
          <h2 className="text-2xl md:text-3xl font-secondary font-bold text-brand-white mb-2">
            Популярные товары
          </h2>
          <div className="w-20 h-1 bg-gradient-copper rounded-full"></div>
        </div>

        <ProductList products={featuredProducts} loading={loading} />

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
      </section>
    </div>
  );
};

export default Home;