// Типы для UTM-меток
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

// Источники трафика для вашего сайта
export const TRAFFIC_SOURCES = {
  SOURCE_1: 'yoga_fest',
  SOURCE_2: 'yoga_club', 
  SOURCE_3: 'yoga_tg',
  SOURCE_4: 'yoga_chat',
  SOURCE_5: 'yoga_personal',
  SOURCE_6: 'yoga_reg',
} as const;

// Функция для парсинга UTM-меток из URL
export const parseUTMParams = (url: string): UTMParams => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_content: params.get('utm_content') || undefined,
      utm_term: params.get('utm_term') || undefined,
    };
  } catch (error) {
    console.error('Error parsing UTM params:', error);
    return {};
  }
};

// Функция для парсинга UTM-меток из hash-роутинга
export const parseUTMParamsFromHash = (hash: string): UTMParams => {
  try {
    // Убираем # из начала hash
    const hashWithoutHash = hash.startsWith('#') ? hash.slice(1) : hash;
    
    // Разделяем путь и параметры
    const [path, queryString] = hashWithoutHash.split('?');
    
    if (!queryString) return {};
    
    const params = new URLSearchParams(queryString);
    
    return {
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_content: params.get('utm_content') || undefined,
      utm_term: params.get('utm_term') || undefined,
    };
  } catch (error) {
    console.error('Error parsing UTM params from hash:', error);
    return {};
  }
};

// Функция для отправки данных в Яндекс.Метрику
export const trackUTMInYandexMetrika = (utmParams: UTMParams) => {
  if (typeof window !== 'undefined' && (window as any).ym) {
    const ym = (window as any).ym;
    
    // Отправляем данные о UTM-метках
    ym(103508983, 'params', {
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_content: utmParams.utm_content,
      utm_term: utmParams.utm_term,
    });
    
    console.log('UTM params sent to Yandex.Metrika:', utmParams);
  }
};

// Функция для сохранения UTM-меток в localStorage
export const saveUTMParams = (utmParams: UTMParams) => {
  if (typeof window !== 'undefined') {
    const hasUTMParams = Object.values(utmParams).some(value => value);
    
    if (hasUTMParams) {
      localStorage.setItem('utm_params', JSON.stringify(utmParams));
      localStorage.setItem('utm_timestamp', Date.now().toString());
      console.log('UTM params saved to localStorage:', utmParams);
    }
  }
};

// Функция для получения сохраненных UTM-меток
export const getSavedUTMParams = (): UTMParams => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('utm_params');
      const timestamp = localStorage.getItem('utm_timestamp');
      
      if (saved && timestamp) {
        const params = JSON.parse(saved);
        const savedTime = parseInt(timestamp);
        const currentTime = Date.now();
        
        // UTM-метки действительны в течение 30 дней
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        
        if (currentTime - savedTime < thirtyDaysInMs) {
          return params;
        } else {
          // Удаляем устаревшие данные
          localStorage.removeItem('utm_params');
          localStorage.removeItem('utm_timestamp');
        }
      }
    } catch (error) {
      console.error('Error getting saved UTM params:', error);
    }
  }
  
  return {};
};

// Функция для создания ссылок с UTM-метками
export const createUTMLink = (
  baseUrl: string,
  source: string,
  medium: string = 'referral',
  campaign?: string,
  content?: string,
  term?: string
): string => {
  const url = new URL(baseUrl);
  
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', medium);
  
  if (campaign) url.searchParams.set('utm_campaign', campaign);
  if (content) url.searchParams.set('utm_content', content);
  if (term) url.searchParams.set('utm_term', term);
  
  return url.toString();
};

// Генератор ссылок для ваших 6 источников
export const generateSourceLinks = (): Record<string, string> => {
  const baseUrl = 'https://oneen.ru';
  
  return {
    [TRAFFIC_SOURCES.SOURCE_1]: createUTMLink(baseUrl, TRAFFIC_SOURCES.SOURCE_1, 'referral', 'source1_campaign'),
    [TRAFFIC_SOURCES.SOURCE_2]: createUTMLink(baseUrl, TRAFFIC_SOURCES.SOURCE_2, 'referral', 'source2_campaign'),
    [TRAFFIC_SOURCES.SOURCE_3]: createUTMLink(baseUrl, TRAFFIC_SOURCES.SOURCE_3, 'referral', 'source3_campaign'),
    [TRAFFIC_SOURCES.SOURCE_4]: createUTMLink(baseUrl, TRAFFIC_SOURCES.SOURCE_4, 'referral', 'source4_campaign'),
    [TRAFFIC_SOURCES.SOURCE_5]: createUTMLink(baseUrl, TRAFFIC_SOURCES.SOURCE_5, 'referral', 'source5_campaign'),
    [TRAFFIC_SOURCES.SOURCE_6]: createUTMLink(baseUrl, TRAFFIC_SOURCES.SOURCE_6, 'referral', 'source6_campaign'),
  };
}; 