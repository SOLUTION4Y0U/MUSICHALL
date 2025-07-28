import { useEffect } from 'react'
// Удаляем неиспользуемые импорты
// import reactLogo from './assets/react.svg'
// import twaLogo from './assets/tapps.png'
// import viteLogo from '/vite.svg'
import './index.css'

import WebApp from '@twa-dev/sdk'
import { AppProvider } from './context/AppContext'
import { Router } from './router'
import { useUTMTracking } from './hooks/useUTMTracking'

function App() {
  // Инициализируем UTM-отслеживание
  const { trackPageView } = useUTMTracking();

  useEffect(() => {
    // Инициализация Telegram Mini App
    WebApp.ready()

    // Отключаем индикатор загрузки, если он есть
    if (WebApp.isVersionAtLeast('6.2')) {
      WebApp.disableClosingConfirmation()
    }

    // Принудительно применяем наши стили, игнорируя тему Telegram
    if (WebApp?.ready) {
      // Принудительно устанавливаем светлый цвет фона
      document.body.classList.add('force-light-theme')
      document.documentElement.style.colorScheme = 'light'

      // Меняем цвет сенсорной панели (если в TMA)
      try {
        WebApp.setHeaderColor('#FEFEFE')
        WebApp.setBackgroundColor('#FEFEFE')
      } catch (e) {
        console.log('Not in Telegram Mini App environment')
      }
    }

    // Отключаем любые слушатели событий темы
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const originalListener = mediaQuery.onchange
    mediaQuery.onchange = null

    // Отслеживаем просмотр главной страницы
    trackPageView('Главная страница');

    return () => {
      // Восстанавливаем слушатель при размонтировании (хотя это не должно происходить)
      mediaQuery.onchange = originalListener
    }
  }, [trackPageView])

  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}

export default App
