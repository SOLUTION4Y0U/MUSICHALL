import { getSavedUTMParams } from './utmTracking';

// Типы событий для отслеживания
export enum EventType {
  PAGE_VIEW = 'page_view',
  ADD_TO_CART = 'add_to_cart',
  REMOVE_FROM_CART = 'remove_from_cart',
  VIEW_PRODUCT = 'view_product',
  VIEW_CATEGORY = 'view_category',
  SEARCH = 'search',
  CHECKOUT_START = 'checkout_start',
  PURCHASE = 'purchase',
  SIGN_UP = 'sign_up',
  CONTACT_FORM = 'contact_form',
}

// Интерфейс для данных события
export interface EventData {
  event_type: EventType;
  event_name: string;
  product_id?: string;
  product_name?: string;
  category?: string;
  value?: number;
  currency?: string;
  search_query?: string;
  [key: string]: any;
}

// Функция для отправки события в Яндекс.Метрику
export const trackEvent = (eventData: EventData) => {
  if (typeof window !== 'undefined' && (window as any).ym) {
    const ym = (window as any).ym;
    const utmParams = getSavedUTMParams();
    
    // Подготавливаем параметры события
    const params = {
      ...eventData,
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      utm_content: utmParams.utm_content,
      utm_term: utmParams.utm_term,
      timestamp: Date.now(),
    };
    
    // Отправляем событие
    ym(103508983, 'reachGoal', eventData.event_name, params);
    
    console.log(`Event "${eventData.event_name}" tracked:`, params);
  }
};

// Специализированные функции для частых событий

// Отслеживание просмотра страницы
export const trackPageView = (pageTitle: string, pageUrl?: string) => {
  trackEvent({
    event_type: EventType.PAGE_VIEW,
    event_name: 'page_view',
    page_title: pageTitle,
    page_url: pageUrl || window.location.href,
  });
};

// Отслеживание добавления в корзину
export const trackAddToCart = (productId: string, productName: string, price?: number) => {
  trackEvent({
    event_type: EventType.ADD_TO_CART,
    event_name: 'add_to_cart',
    product_id: productId,
    product_name: productName,
    value: price,
    currency: 'RUB',
  });
};

// Отслеживание просмотра товара
export const trackViewProduct = (productId: string, productName: string, category?: string) => {
  trackEvent({
    event_type: EventType.VIEW_PRODUCT,
    event_name: 'view_product',
    product_id: productId,
    product_name: productName,
    category,
  });
};

// Отслеживание начала оформления заказа
export const trackCheckoutStart = (cartValue: number, itemCount: number) => {
  trackEvent({
    event_type: EventType.CHECKOUT_START,
    event_name: 'checkout_start',
    value: cartValue,
    currency: 'RUB',
    item_count: itemCount,
  });
};

// Отслеживание покупки
export const trackPurchase = (orderId: string, totalValue: number, itemCount: number) => {
  trackEvent({
    event_type: EventType.PURCHASE,
    event_name: 'purchase',
    order_id: orderId,
    value: totalValue,
    currency: 'RUB',
    item_count: itemCount,
  });
};

// Отслеживание поиска
export const trackSearch = (query: string, resultsCount?: number) => {
  trackEvent({
    event_type: EventType.SEARCH,
    event_name: 'search',
    search_query: query,
    results_count: resultsCount,
  });
};

// Отслеживание отправки формы контактов
export const trackContactForm = (formType: string) => {
  trackEvent({
    event_type: EventType.CONTACT_FORM,
    event_name: 'contact_form',
    form_type: formType,
  });
};

// Хук для использования в React компонентах
export const useEventTracking = () => {
  return {
    trackEvent,
    trackPageView,
    trackAddToCart,
    trackViewProduct,
    trackCheckoutStart,
    trackPurchase,
    trackSearch,
    trackContactForm,
  };
}; 