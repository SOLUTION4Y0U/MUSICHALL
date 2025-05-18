import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useProduct } from '../../hooks/useProduct';
import ImageGallery from '../../components/features/ImageGallery';
import ProductInfo from '../../components/features/ProductInfo';
import RecommendedProducts from '../../components/features/RecommendedProducts';
import { useTelegramMainButton } from '../../hooks/useTelegramMainButton';
import { useTelegramUI } from '../../context/TelegramUIContext';
import { useCartStore } from '../../store/cart';
import { ROUTES } from '../../constants/routes';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const { hapticFeedback } = useTelegramUI();

  // Используем улучшенные хуки для кнопок Telegram
  const mainButton = useTelegramMainButton({
    text: 'Добавить в корзину',
    isVisible: !loading && !error && !!product,
    isActive: product?.stock ? product.stock > 0 : false
  });

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    if (!product) return;

    // Показываем индикатор загрузки на кнопке
    mainButton.showProgress(true);

    // Добавляем товар в корзину
    setTimeout(() => {
      addToCart(product, 1);

      // Скрываем индикатор загрузки
      mainButton.hideProgress();

      // Даем тактильный отклик
      hapticFeedback.notificationOccurred('success');

      // Меняем текст кнопки
      mainButton.setText('Перейти в корзину');

      // Меняем функцию кнопки
      mainButton.setOnClick(() => {
        navigate(ROUTES.CART);
      });
    }, 500);
  };

  // Установка обработчика для MainButton при загрузке товара
  useEffect(() => {
    if (!product) return;

    mainButton.setOnClick(handleAddToCart);

    // Деактивируем кнопку, если товара нет в наличии
    if (product.stock <= 0) {
      mainButton.disable();
    } else {
      mainButton.enable();
    }
  }, [product, mainButton]);

  if (loading) {
    return <div className="product-loading">Загрузка товара...</div>;
  }

  if (error || !product) {
    return (
      <div className="product-error">
        <h2>Ошибка</h2>
        <p>{error || 'Товар не найден'}</p>
        <Link to={ROUTES.CATALOG} className="button">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-breadcrumbs">
        <Link to={ROUTES.HOME}>Главная</Link> &gt;
        <Link to={ROUTES.CATALOG}>Каталог</Link> &gt;
        <span>{product.title}</span>
      </div>

      <div className="product-detail-grid">
        <div className="product-images">
          <ImageGallery images={product.images} alt={product.title} />
        </div>

        <div className="product-details">
          <ProductInfo
            product={product}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      <RecommendedProducts
        currentProductId={product.id}
        categoryId={product.category}
      />
    </div>
  );
};

export default ProductDetail;