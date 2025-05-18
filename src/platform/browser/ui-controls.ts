export const showMainButton = (_text: string, _onClick?: () => void) => {
  // Для браузера можно реализовать аналог через фиксированную кнопку внизу экрана
  console.log('Browser MainButton is not implemented natively');
};

export const hideMainButton = () => {
  console.log('Browser MainButton hide');
};

export const enableBackButton = (_onClick: () => void) => {
  // В браузере можно использовать window.history или просто обычную кнопку "Назад"
  console.log('Browser BackButton is not implemented natively');
};

export const disableBackButton = () => {
  console.log('Browser BackButton hide');
};

export const showAlert = (message: string) => {
  alert(message);
};