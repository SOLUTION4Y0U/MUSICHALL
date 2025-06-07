import WebApp from '@twa-dev/sdk';

export const showMainButton = (text: string, onClick: () => void) => {
  WebApp.MainButton.setText(text);
  WebApp.MainButton.onClick(onClick);
  WebApp.MainButton.show();
};

export const hideMainButton = () => {
  WebApp.MainButton.hide();
  WebApp.MainButton.offClick();
};

export const enableBackButton = (onClick: () => void) => {
  WebApp.BackButton.onClick(onClick);
  WebApp.BackButton.show();
};

export const disableBackButton = () => {
  WebApp.BackButton.hide();
  WebApp.BackButton.offClick();
};

export const showAlert = (message: string) => {
  WebApp.showAlert(message);
};

// Функция навигации для TMA - использует прямые URL переходы
export const navigateTo = (path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  window.location.hash = `#${cleanPath}`;
};