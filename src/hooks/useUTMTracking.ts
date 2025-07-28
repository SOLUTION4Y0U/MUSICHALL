import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  UTMParams,
  parseUTMParamsFromHash,
  trackUTMInYandexMetrika,
  saveUTMParams,
  getSavedUTMParams,
} from '../utils/utmTracking';

export const useUTMTracking = () => {
  const location = useLocation();
  const [utmParams, setUtmParams] = useState<UTMParams>({});

  useEffect(() => {
    // Парсим UTM-метки из текущего URL
    const currentUTMParams = parseUTMParamsFromHash(location.hash);
    
    // Если есть UTM-метки в URL, используем их
    if (Object.values(currentUTMParams).some(value => value)) {
      setUtmParams(currentUTMParams);
      saveUTMParams(currentUTMParams);
      trackUTMInYandexMetrika(currentUTMParams);
    } else {
      // Если нет UTM-меток в URL, проверяем сохраненные
      const savedUTMParams = getSavedUTMParams();
      if (Object.values(savedUTMParams).some(value => value)) {
        setUtmParams(savedUTMParams);
        trackUTMInYandexMetrika(savedUTMParams);
      }
    }
  }, [location.hash]);

  // Функция для принудительного отслеживания события с UTM-метками
  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      const ym = (window as any).ym;
      
      const params = {
        ...eventParams,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_content: utmParams.utm_content,
        utm_term: utmParams.utm_term,
      };
      
      ym(103508983, 'reachGoal', eventName, params);
      console.log(`Event "${eventName}" tracked with UTM params:`, params);
    }
  };

  // Функция для отслеживания просмотра страницы с UTM-метками
  const trackPageView = (pageTitle?: string) => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      const ym = (window as any).ym;
      
      const params = {
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_content: utmParams.utm_content,
        utm_term: utmParams.utm_term,
      };
      
      ym(103508983, 'hit', window.location.href, {
        title: pageTitle || document.title,
        ...params,
      });
      
      console.log('Page view tracked with UTM params:', params);
    }
  };

  return {
    utmParams,
    trackEvent,
    trackPageView,
    hasUTMParams: Object.values(utmParams).some(value => value),
  };
}; 