import { useEffect } from 'react';

import '../../styles/landing.css';

const Landing = () => {
  


  // Partner logos array
  const partnerLogos = [
    'logos_partners/globus.png',
    'logos_partners/связь_он.png',
    'logos_partners/ofismag.png',
    'logos_partners/medium_13bf1bbde2f3cb111ac33d5214dc1fe5.png',
    'logos_partners/Magnit_market_logo.svg.png',
    'logos_partners/yandex_market.png',
    'logos_partners/beeline.png',
    'logos_partners/logo-restore.png',
    'logos_partners/komus-min.png',
    'logos_partners/T2_(Tele2)_logo_2024.svg.png',
    'logos_partners/Wildberries_Logo.png',
    'logos_partners/Sbermm_logo.png',
    'logos_partners/logo-mts.png',
    'logos_partners/Логотип_Ситилинк.svg.png',
    'logos_partners/logo-familiya.png',
    'logos_partners/medium_193ea5be318e4658a7571d32a2c3b966.png',
    'logos_partners/1-2.png',
    'logos_partners/logo-holodilnik-ru.png',
    'logos_partners/logo-mvideo.png',
    'logos_partners/logo-tehnopark.jpg',
    'logos_partners/logo-onlayn-treyd.png',
    'logos_partners/1200px-ОЗОН_ЛОГО.png',
    'logos_partners/Market_DA_Logo.png'
  ];

  
  

  

  // Responsive adjustments
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  

  

  // Responsive: 2 rows on mobile/tablet, 3 on desktop
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
  const rowsCount = isMobile ? 2 : isTablet ? 2 : 3;
  const logosPerRow = Math.ceil(partnerLogos.length / rowsCount);

  // Split partnerLogos into rows for full-width grid
  const logoRows = [];
  for (let i = 0; i < partnerLogos.length; i += logosPerRow) {
    logoRows.push(partnerLogos.slice(i, i + logosPerRow));
  }

  



  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // GSAP animations (if needed)
  useEffect(() => {
    // Add any GSAP animations here if needed
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-up');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-[100vh] flex-col bg-black text-white">
      

      {/* Hero Section */}
      <section
        className="relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px]"
        id="hero-section"
      >
        <img 
          src="/assets/images/Maskgroup.svg" 
          alt="Фон hero-section" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="relative z-10 flex h-full min-h-[100vh] w-full flex-col place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:p-4">
          <div className="flex flex-col place-content-center items-center">
            <div className="reveal-up gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
              <span>Международный</span>
              <br />
              <span>дистрибьютор</span>
            </div>
            <div className="reveal-up mt-10 max-w-[600px] text-4xl p-2 text-center text-gray-300 max-lg:max-w-full">
            музыкальных инструментов, цифровой и портативной техники, аксессуаров, ручных и электроинструментов
            </div>
            

            <div className="reveal-up mt-10 flex place-items-center">
              <button
                className="btn shadow-lg transition-transform duration-[0.3s] hover:scale-x-[1.03] text-white"
                onClick={() => scrollToSection('contacts')}
              >
                Свяжитесь с нами
              </button>
            </div>
          </div>
        </div>
      </section>

      

      {/* Animated Partners Section */}
      <section className="relative flex w-screen max-w-none flex-col place-content-center place-items-center overflow-visible p-8 px-4 bg-black" style={{minHeight: isMobile ? 180 : 260, width: '100vw'}}>
        <h2 className="reveal-up text-3xl max-md:text-xl text-center mb-10 mt-8">
          Наши партнеры
        </h2>
        <div
          className="partners-fullwidth-grid mx-auto"
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${rowsCount}, 1fr)`,
            gridAutoFlow: 'column',
            width: '100%',
            maxWidth: '100vw',
            alignItems: 'center',
            justifyItems: 'center',
            gap: isMobile ? 10 : 18,
          }}
        >
          {logoRows.map((row) =>
            row.map((logo) => {
              const duration = 2.5 + Math.random() * 2.5;
              const delay = Math.random() * 2;
              return (
                <div
                  key={logo}
                  className="partner-logo-alive"
                  style={{
                    width: isMobile ? '14vw' : '8vw',
                    minWidth: 40,
                    maxWidth: 100,
                    height: isMobile ? '8vw' : '5vw',
                    minHeight: 24,
                    maxHeight: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: `logoAliveScale ${duration}s ease-in-out ${delay}s infinite alternate`,
                    background: 'none',
                    border: 'none',
                    boxShadow: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <img
                    src={`/${logo}`}
                    alt={`Partner logo`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      background: 'none',
                      border: 'none',
                      boxShadow: 'none',
                      padding: 0,
                      margin: 0,
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="relative flex min-h-[80vh] w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-6">
        <div className="reveal-up flex min-h-[60vh] place-content-center place-items-center gap-[10%] max-lg:flex-col max-lg:gap-20">
          <div className="flex">
            <div className="max-h-[650px] max-w-[850px] overflow-hidden rounded-lg shadow-lg shadow-[rgba(75,156,120,0.44)]">
              <img
                src="/assets/images/brand-logos/logo main light.svg"
                alt="coding"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-6 flex max-w-[450px] flex-col gap-4" id="info">
            <h3 className="text-4xl font-medium max-md:text-2xl">
              О компании
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-xl font-medium">
                <i className="bi bi-check-all !text-2xl"></i>
                Долгосрочные стратегии
              </h4>
              <span className="text-lg text-gray-300 max-md:text-base">
                Мы не просто заключаем выгодные коммерческие сделки — мы выстраиваем настоящие дружественные и долгосрочные партнёрские отношения в стратегии win — win
              </span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <h4 className="text-xl font-medium">
                <i className="bi bi-check-all !text-2xl"></i>
                Гарантия качества
              </h4>
              <span className="text-lg text-gray-300 max-md:text-base">
                Все наши товары имеют 100% гарантию, отвечающую всем стандартам сервисного обслуживания в Российской Федерации
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="relative flex w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-6">
        <div className="mt-8 flex flex-col place-items-center gap-5">
          <div className="reveal-up mt-5 flex flex-col gap-3 text-center">
            <h2 className="text-4xl font-medium text-gray-200 max-md:text-3xl">
              Наши преимущества
            </h2>
          </div>
          <div className="mt-6 flex max-w-[80%] flex-wrap place-content-center gap-8 max-lg:flex-col">
            <div className="reveal-up flex h-[400px] w-[450px] flex-col gap-3 text-center max-md:w-[320px]">
              <div className="border-gradient h-[200px] w-full overflow-hidden max-md:h-[150px]">
                <div className="flex h-full w-full place-content-center place-items-end p-2">
                  <i className="bi bi-people text-7xl text-gray-200 max-md:text-5xl"></i>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-2">
                <h3 className="mt-8 text-primary text-2xl font-medium max-md:text-xl italic">
                  КОМАНДА ПРОФЕССИОНАЛОВ РЫНКА
                </h3>
                <div className="text-gray-300 text-xl">
                  Благодаря слаженной работе и нашему более чем 15-летнему опыту, основанная в 2016 году, наша Компания стала быстрорастущим поставщиком для оптового и розничного каналов и надёжным партнёром в B2B-сегменте
                </div>
              </div>
            </div>
            <div className="reveal-up flex h-[400px] w-[450px] flex-col gap-3 text-center max-md:w-[320px]">
              <div className="border-gradient h-[200px] w-full overflow-hidden max-md:text-[150px]">
                <div className="flex h-full w-full place-content-center place-items-end p-2">
                  <i className="bi bi-briefcase text-7xl text-gray-200 max-md:text-5xl"></i>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-2">
                <h3 className="mt-8 text-2xl text-primary font-medium max-md:text-xl">
                  ПОРТФЕЛЬ ПЕРЕДОВЫХ ПРЕДЛОЖЕНИЙ
                </h3>
                <div className="text-gray-300 text-xl">
                  Эффективный поиск новых партнёров и постоянное расширение ассортиментного порфеля позволяют нам предлагать все самые передовые продукты и новинки в различных товарных категориях
                </div>
              </div>
            </div>
            <div className="reveal-up flex h-[400px] w-[450px] flex-col gap-3 text-center max-md:w-[320px]">
              <div className="border-gradient h-[200px] w-full overflow-hidden max-md:h-[150px]">
                <div className="flex h-full w-full place-content-center place-items-end p-2">
                  <i className="bi bi-bar-chart-line text-7xl text-gray-200 max-md:text-5xl"></i>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-2">
                <h3 className="mt-8 text-2xl text-primary font-medium max-md:text-xl">
                  СТАБИЛЬНОСТЬ И УВАЖЕНИЕ ИНТЕРЕСОВ
                </h3>
                <div className="text-gray-300 text-xl">
                  Ценность каждого бизнес-партнёра для нас — в его уникальности, и мы знаем, как сделать коммерческие отношения действительно взаимовыгодными, удобными и стабильными
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative flex min-h-[80vh] w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-6">
        <div className="mt-8 flex flex-col place-items-center gap-5">
          <div className="reveal-up mt-5 flex flex-col gap-3 text-center">
            <h2 className="text-4xl font-medium text-gray-200 max-md:text-2xl">
              Ключевые особенности
            </h2>
          </div>
          <div className="mt-6 flex max-w-[80%] flex-wrap place-content-center gap-8 max-lg:flex-col">
            <div className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]">
              <div className="text-4xl max-md:text-2xl">
                <i className="bi bi-globe-europe-africa"></i>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl max-md:text-xl">
                  Международная деятельность
                </h3>
                <p className="text-gray-300 max-md:text-sm">
                  Работаем на территории России и стран-участниц Евразийского экономического союза (ЕАЭС)
                </p>
              </div>
            </div>

            <div className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]">
              <div className="text-4xl max-md:text-2xl">
                <i className="bi bi-bar-chart"></i>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl max-md:text-xl">
                  Развитие
                </h3>
                <p className="text-gray-300 max-md:text-sm">
                  Строим долгосрочные партнерские отношения
                </p>
              </div>
            </div>

            <div className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]">
              <div className="text-4xl max-md:text-2xl">
                <i className="bi bi-sliders2"></i>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl max-md:text-xl">
                  Гибкость
                </h3>
                <p className="text-gray-300 max-md:text-sm">
                  Предлагаем широкий выбор продукции для дистрибуции
                </p>
              </div>
            </div>

            <div className="reveal-up flex h-[200px] w-[450px] gap-8 rounded-xl border-[1px] border-outlineColor bg-secondary p-8 max-md:w-[320px]">
              <div className="text-4xl max-md:text-2xl">
                <i className="bi bi-gear"></i>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl max-md:text-xl">
                  Поддержка
                </h3>
                <p className="text-sm text-gray-300">
                  Предоставляем гарантию и сотрудничаем с сервисными центрами
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



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

export default Landing; 