import { useNavigate } from 'react-router-dom';
import { usePlatform } from './usePlatform';

export const useTmaSafeNavigation = () => {
  const navigate = useNavigate();
  const { isTma } = usePlatform();

  const tmaSafeNavigate = (path: string, options?: { replace?: boolean }) => {
    if (isTma) {
      // В TMA используем прямое изменение window.location.hash
      // Убираем ведущий слэш если он есть, так как hash router ожидает путь без слэша
      const hashPath = path.startsWith('/') ? path.substring(1) : path;

      if (options?.replace) {
        // Заменяем текущую запись в истории
        window.location.replace(`${window.location.pathname}${window.location.search}#${hashPath}`);
      } else {
        // Добавляем новую запись в историю
        window.location.hash = hashPath;
      }
    } else {
      // В обычном браузере используем стандартную навигацию
      navigate(path, options);
    }
  };

  const goBack = () => {
    if (isTma) {
      // В TMA используем history.back()
      window.history.back();
    } else {
      navigate(-1);
    }
  };

  return {
    navigate: tmaSafeNavigate,
    goBack
  };
};