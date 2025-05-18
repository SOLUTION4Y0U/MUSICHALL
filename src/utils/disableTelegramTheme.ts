/**
 * Утилита для отключения влияния темы Telegram на приложение
 */
export const disableTelegramTheme = () => {
  // Запускаем периодическую проверку на наличие переменных Telegram и их перезапись
  const interval = setInterval(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    // Список переменных, которые нужно переопределить
    const telegramVars = [
      '--tg-theme-bg-color',
      '--tg-theme-text-color',
      '--tg-theme-hint-color',
      '--tg-theme-link-color',
      '--tg-theme-button-color',
      '--tg-theme-button-text-color',
      '--tg-theme-secondary-bg-color'
    ];

    // Проверяем, есть ли переменные Telegram
    for (const varName of telegramVars) {
      if (rootStyles.getPropertyValue(varName)) {
        // Если переменная существует, перезаписываем её собственным стилем
        document.documentElement.style.setProperty(varName, 'none', 'important');
      }
    }

    // Принудительно устанавливаем цвета
    document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff', 'important');
    document.documentElement.style.setProperty('--tg-theme-text-color', '#333333', 'important');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', '#f9f9f9', 'important');

    // Устанавливаем светлое цветовое оформление
    document.documentElement.style.colorScheme = 'light';
  }, 500); // Проверяем каждые 500 мс

  // Возвращаем функцию для отключения проверки
  return () => clearInterval(interval);
};