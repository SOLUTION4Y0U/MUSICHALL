import React, { useState } from 'react';
import { usePlatformUIControls } from '../../platform';
import { usePlatform } from '../../hooks/usePlatform';

interface Article {
  id: string;
  title: string;
  publication: string;
  url: string;
  description: string;
  thumbnail?: string;
  date?: string;
}

interface BrandSection {
  name: string;
  articles: Article[];
}

const Articles = () => {
  const { hideMainButton } = usePlatformUIControls();
  const { isTma } = usePlatform();
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  // Hide main button in TMA
  React.useEffect(() => {
    if (isTma) {
      hideMainButton();
    }
  }, [isTma, hideMainButton]);

  // Article data organized by brand
  const brandSections: BrandSection[] = [
    {
      name: 'Viwoods',
      articles: [
        {
          id: 'viwoods-1',
          title: 'Viwoods AIPaper и AIPaper Mini — новые бумажные планшеты',
          publication: 'Trashbox',
          url: 'https://trashbox.ru/link/2025-07-07-aipaper-aipaper-mini',
          description: 'Обзор новых бумажных планшетов Viwoods AIPaper и AIPaper Mini с E-ink экранами и поддержкой ChatGPT.',
          date: '2025-07-07'
        },
        {
          id: 'viwoods-2',
          title: 'В России представлены ридеры с ИИ с ценой от 69 999 рублей',
          publication: 'Mobile Review',
          url: 'https://mobile-review.com/all/news/v-rossii-predstavleny-ridery-s-ii-s-czenoj-ot-69-999-rublej/',
          description: 'Анонс новых ридеров Viwoods с искусственным интеллектом по доступной цене на российском рынке.',
        },
        {
          id: 'viwoods-3',
          title: 'В России представлены два бумажных планшета нового поколения Viwoods AIPaper и Viwoods AIPaper Mini',
          publication: 'Ferralabs',
          url: 'https://ferralabs.ru/hitech_news/37840-v-rossii-predstavleny-dva-bumazhnykh-plansheta-novogo-pokoleniya-viwoods-aipaper-i-viwoods-aipaper-mini/?ysclid=md2vz1d6q5859937452',
          description: 'Детальный обзор инновационных бумажных планшетов нового поколения с E-ink технологией.',
        },
        {
          id: 'viwoods-4',
          title: 'Viwoods AIPaper: инновационный планшет с E-ink экраном',
          publication: 'Коммерсант',
          url: 'https://www.kommersant.ru/doc/7906964',
          description: 'Публикация о выходе на рынок новых планшетов Viwoods с технологией электронных чернил.',
        },
        {
          id: 'viwoods-5',
          title: 'В России представлены два бумажных планшета нового поколения Viwoods AIPaper и AIPaper Mini',
          publication: 'Cubiq',
          url: 'https://cubiq.ru/v-rossii-predstavleny-dva-bumazhnyh-plansheta-novogo-pokoleniya-viwoods-aipaper-i-aipaper-mini/',
          description: 'Обзор новых планшетов с E-ink экранами и интегрированным искусственным интеллектом.',
        },
        {
          id: 'viwoods-6',
          title: 'Viwoods AIPaper: обзор и впечатления',
          publication: 'Коммерсант',
          url: 'https://www.kommersant.ru/doc/7991860?ysclid=mf30qi1fl2252357219',
          description: 'Детальный обзор планшета Viwoods AIPaper с анализом функциональности и возможностей.',
        },
        {
          id: 'viwoods-7',
          title: 'Forget the Kindle Scribe: I just finished testing the Viwoods AIPaper',
          publication: 'TechRadar',
          url: 'https://www.techradar.com/tablets/ereaders/forget-the-kindle-scribe-i-just-finished-testing-the-viwoods-aipaper-and-i-cant-recommend-it-highly-enough-especially-at-33-percent-off',
          description: 'International review comparing Viwoods AIPaper to Kindle Scribe, highlighting its advantages and value proposition.',
        },
        {
          id: 'viwoods-8',
          title: 'Планшеты Viwoods AIPaper и AIPaper Mini вышли в России с E-ink экранами и ChatGPT',
          publication: 'The Geek',
          url: 'https://the-geek.ru/news/planshety-viwoods-aipaper-i-aipaper-mini-vyshli-v-rossii-s-e-ink-jekranami-i-chatgpt',
          description: 'Новость о выходе планшетов Viwoods с поддержкой ChatGPT и E-ink технологией.',
        },
        {
          id: 'viwoods-9',
          title: 'Обзор Viwoods AIPaper',
          publication: 'DGL.ru',
          url: 'https://www.dgl.ru/reviews/obzor-viwoods-aipaper.html?ysclid=mf30nu6ggz75705651',
          description: 'Профессиональный обзор планшета Viwoods AIPaper с детальным анализом характеристик.',
        },
        {
          id: 'viwoods-10',
          title: 'Viwoods AIPaper — инновационный планшет',
          publication: 'Технопарк',
          url: 'https://t.me/technopark_ru/3479',
          description: 'Анонс нового планшета Viwoods AIPaper в канале Технопарк.',
        },
      ]
    },
    {
      name: 'Philips',
      articles: [
        {
          id: 'philips-1',
          title: 'Обзор зарядных устройств Philips',
          publication: 'Megaobzor',
          url: 'https://megaobzor.com/review-philips-zaryadnoe.html',
          description: 'Детальный обзор линейки зарядных устройств и аксессуаров Philips от компании OneEnergy.',
        },
        {
          id: 'philips-2',
          title: 'Компания OneEnergy выводит на рынок аксессуары Philips',
          publication: 'CNews',
          url: 'https://www.cnews.ru/news/line/2025-04-18_kompaniya_vanenerdzhi_vyvodit',
          description: 'Новость о выходе на российский рынок аксессуаров Philips от компании OneEnergy.',
        },
        {
          id: 'philips-3',
          title: 'Обзор аксессуаров Philips',
          publication: 'SetPhone',
          url: 'https://setphone.ru/obzory/philips-accessories-review/',
          description: 'Обзор новой линейки аксессуаров Philips, включая USB-хабы и зарядные устройства.',
        },
        {
          id: 'philips-4',
          title: 'Philips запустила в России многофункциональный USB-хаб за 3899 рублей',
          publication: 'iTzine',
          url: 'https://itzine.ru/news/gadgets/philips-zapustila-v-rossii-mnogofunkczionalnyj-usb-hab-za-3899-rublej.html',
          description: 'Анонс многофункционального USB-хаба Philips по доступной цене на российском рынке.',
        },
        
        {
          id: 'philips-6',
          title: 'Philips: новые аксессуары на российском рынке',
          publication: 'Коммерсант',
          url: 'https://www.kommersant.ru/doc/7755341',
          description: 'Публикация о выходе аксессуаров Philips на российский рынок.',
        },
        {
          id: 'philips-7',
          title: 'Обзор USB-хаба Philips',
          publication: 'IT-World',
          url: 'https://www.it-world.ru/tech/qmhuwf1hynko0gww4scgs8o48wsggc0.html',
          description: 'Технический обзор USB-хаба Philips с анализом функциональности и характеристик.',
        },
        {
          id: 'philips-8',
          title: 'Обзор USB-хаба Philips SWV6113G/59',
          publication: 'Vyborok',
          url: 'https://vyborok.com/obzor-usb-haba-philips-swv6113g-59/',
          description: 'Детальный обзор USB-хаба Philips с оценкой качества и функциональности.',
        },
      ]
    },
    {
      name: 'MusicHall & ON Music',
      articles: [
        {
          id: 'musichall-1',
          title: 'В России появился новый бренд музыкальных инструментов MusicHall',
          publication: 'iTzine',
          url: 'https://itzine.ru/news/culture/v-rossii-poyavilsya-novyj-brend-muzykalnyh-instrumentov-musichall.html',
          description: 'Анонс нового бренда музыкальных инструментов MusicHall на российском рынке.',
        },
        {
          id: 'musichall-2',
          title: 'MusicHall: новый бренд музыкальных инструментов',
          publication: 'Коммерсант',
          url: 'https://www.kommersant.ru/doc/7692570',
          description: 'Публикация о выходе нового бренда музыкальных инструментов MusicHall.',
        },
        {
          id: 'musichall-3',
          title: 'Российский бренд MusicHall',
          publication: 'Trashbox',
          url: 'https://trashbox.ru/link/2025-05-12-rossijskij-brend-musichall',
          description: 'Новость о российском бренде музыкальных инструментов MusicHall.',
        },
        {
          id: 'musichall-4',
          title: 'В России стартовали продажи новой линейки акустических систем MusicHall SoundMaster',
          publication: 'DigiMedia',
          url: 'https://digimedia.ru/latest-news/v-rossii-startovali-prodazhi-novoj-linejki-akusticheskih-sistem-musichall-soundmaster/',
          description: 'Анонс новой линейки акустических систем MusicHall SoundMaster на российском рынке.',
        },
        {
          id: 'musichall-5',
          title: 'На российский рынок выходит новый бренд музыкальных инструментов MusicHall',
          publication: 'DigiMedia',
          url: 'https://digimedia.ru/latest-news/na-rossijskij-rynok-vyhodit-novyj-brend-muzykalnyh-instrumentov-musichall/',
          description: 'Информация о выходе бренда MusicHall на российский рынок музыкальных инструментов.',
        },
        {
          id: 'musichall-6',
          title: 'В России стартовала новая линейка акустических систем MusicHall SoundMaster',
          publication: 'Cubiq',
          url: 'https://cubiq.ru/v-rossii-startovala-novaya-lineyka-akusticheskih-sistem-musichall-soundmaster/',
          description: 'Обзор новой линейки акустических систем MusicHall SoundMaster.',
        },
        {
          id: 'musichall-7',
          title: 'Акустика MusicHall SoundMaster в России',
          publication: 'Gamers Life',
          url: 'https://gamers-life.ru/technic/akustika-musichall-soundmaster-v-rossii/',
          description: 'Обзор акустических систем MusicHall SoundMaster для геймеров и аудиофилов.',
        },
        {
          id: 'musichall-8',
          title: 'Портативные акустические системы MusicHall SoundMaster подходят для любых сценариев',
          publication: 'MPP News',
          url: 'https://mpp-news.ru/2025/08/17/portativnye-akusticheskie-sistemy-musichall-soundmaster-podhodjat-dlja-ljubyh-scenariev/',
          description: 'Обзор портативных акустических систем MusicHall SoundMaster с универсальным применением.',
        },
        {
          id: 'musichall-9',
          title: 'MusicHall SoundMaster Maestro',
          publication: 'Hi-Fi.ru',
          url: 'https://www.hi-fi.ru/magazine/audio/musichall-soundmaster-maestro/',
          description: 'Профессиональный обзор акустической системы MusicHall SoundMaster Maestro для аудиофилов.',
        },
        {
          id: 'musichall-10',
          title: 'MusicHall: обзор аксессуаров',
          publication: 'IT-World',
          url: 'https://www.it-world.ru/tech/1d7v4ztjx09wsgw8w0cwccswkskggcs.html',
          description: 'Обзор музыкальных инструментов и аксессуаров бренда MusicHall.',
        },
        {
          id: 'musichall-11',
          title: 'MusicHall Inspiration Fantasia Plus',
          publication: 'Hi-Fi.ru',
          url: 'https://www.hi-fi.ru/magazine/audio/musichall-inspiration-fantasia-plus/',
          description: 'Детальный обзор музыкального инструмента MusicHall Inspiration Fantasia Plus.',
        },
      ]
    }
  ];

  // Generate thumbnail URL from article metadata
  const getThumbnailUrl = (article: Article): string => {
    // Use a placeholder service or generate from URL
    // For now, using a gradient placeholder based on brand
    const brandColors: Record<string, { primary: string; secondary: string }> = {
      'Viwoods': { primary: '#6366f1', secondary: '#8b5cf6' },
      'Philips': { primary: '#3b82f6', secondary: '#06b6d4' },
      'MusicHall & ON Music': { primary: '#ec4899', secondary: '#f43f5e' }
    };
    
    const brand = brandSections.find(section => 
      section.articles.some(a => a.id === article.id)
    )?.name || 'default';
    
    const colors = brandColors[brand] || { primary: '#64748b', secondary: '#475569' };
    
    // Use a simple gradient placeholder service
    // If the service fails, we'll use CSS gradient fallback
    const text = encodeURIComponent(article.title.substring(0, 25));
    return `https://via.placeholder.com/400x250/${colors.primary.replace('#', '')}/${colors.secondary.replace('#', '')}?text=${text}`;
  };

  // Extract domain from URL for publication badge
  const getDomainFromUrl = (url: string): string => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    } catch {
      return 'Source';
    }
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      {/* Hero Header */}
      <div className="sticky top-[60px] z-[15] bg-brand-black/95 backdrop-blur-sm border-b border-brand-mid-gray/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-secondary font-bold text-brand-white mb-4">
              Пресса о наших брендах
            </h1>
            <p className="text-brand-mid-gray text-lg md:text-xl max-w-2xl mx-auto">
              Коллекция статей и обзоров из ведущих изданий о продуктах Viwoods, Philips и MusicHall
            </p>
          </div>

          {/* Brand Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {brandSections.map((section) => (
              <button
                key={section.name}
                onClick={() => {
                  const element = document.getElementById(`brand-${section.name}`);
                  if (element) {
                    const headerOffset = 200; // Account for both headers (60px main + ~140px articles header)
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                  setActiveBrand(section.name);
                  setTimeout(() => setActiveBrand(null), 2000);
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeBrand === section.name
                    ? 'bg-brand-copper text-brand-black scale-105'
                    : 'bg-brand-dark/50 text-brand-light-gray hover:bg-brand-dark hover:text-brand-white border border-brand-mid-gray/20'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
        {brandSections.map((section, sectionIndex) => (
          <section
            key={section.name}
            id={`brand-${section.name}`}
            className={`mb-20 ${sectionIndex > 0 ? 'mt-20' : ''}`}
          >
            {/* Brand Section Header */}
            <div className="mb-8 pb-6 border-b border-brand-mid-gray/20">
              <h2 className="text-3xl md:text-4xl font-secondary font-bold text-brand-white mb-2">
                {section.name}
              </h2>
              <p className="text-brand-mid-gray">
                {section.articles.length} {section.articles.length === 1 ? 'статья' : section.articles.length < 5 ? 'статьи' : 'статей'}
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.articles.map((article) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card block h-full"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-brand-dark">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-copper/20 via-brand-dark to-brand-black" />
                    <img
                      src={getThumbnailUrl(article)}
                      alt={article.title}
                      className="relative w-full h-full object-cover card-image z-10"
                      onError={(e) => {
                        // Fallback to CSS gradient if image fails
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const brand = brandSections.find(section => 
                            section.articles.some(a => a.id === article.id)
                          )?.name;
                          const gradients: Record<string, string> = {
                            'Viwoods': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            'Philips': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                            'MusicHall & ON Music': 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
                          };
                          parent.style.background = gradients[brand || ''] || 'linear-gradient(135deg, #69B897 0%, #173B29 100%)';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col h-full">
                    {/* Publication Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-brand-copper/20 text-brand-copper border border-brand-copper/30">
                        {article.publication || getDomainFromUrl(article.url)}
                      </span>
                      {article.date && (
                        <span className="text-xs text-brand-mid-gray">
                          {new Date(article.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-brand-white mb-3 line-clamp-2 group-hover:text-brand-copper transition-colors duration-300">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-brand-mid-gray mb-4 line-clamp-3 flex-grow">
                      {article.description}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center text-brand-copper text-sm font-medium mt-auto">
                      <span>Читать статью</span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 border-t border-brand-mid-gray/20">
        <div className="text-center">
          <p className="text-brand-mid-gray mb-4">
            Хотите узнать больше о наших продуктах?
          </p>
          <a
            href="/#catalog"
            className="inline-block btn-primary"
          >
            Перейти в каталог
          </a>
        </div>
      </div>
    </div>
  );
};

export default Articles;

