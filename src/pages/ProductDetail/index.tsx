import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { useCartStore } from '../../store/cart';
import { ROUTES } from '../../constants/routes';
import RecommendedProducts from '../../components/features/RecommendedProducts';
import { useTelegramMainButton } from '../../hooks/useTelegramMainButton';
import { useTelegramUI } from '../../context/TelegramUIContext';
import { useTmaSafeNavigation } from '../../hooks/useTmaSafeNavigation';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { navigate } = useTmaSafeNavigation();
  const { product, loading, error } = useProduct(id);
  const { addToCart, isInCart } = useCartStore();
  const { hapticFeedback } = useTelegramUI();
  const [selectedImage, setSelectedImage] = useState(0);

  const inCart = product ? isInCart(product.id) : false;

  const mainButton = useTelegramMainButton({
    text: 'Добавить в корзину',
    isVisible: !loading && !!product,
    isActive: product?.stock ? product.stock > 0 : false
  });

  const handleAddToCart = () => {
    if (!product) return;
    mainButton.showProgress(true);
    setTimeout(() => {
      addToCart(product, 1);
      mainButton.hideProgress();
      hapticFeedback.notificationOccurred('success');
      mainButton.setText('Перейти в корзину');
      mainButton.setOnClick(() => {
        navigate(ROUTES.CART);
      });
    }, 500);
  };

  useEffect(() => {
    if (!loading && (error || !product)) {
      console.log('❌ Товар не найден, перенаправляем в каталог');
      navigate(ROUTES.CATALOG);
    }
  }, [loading, product, error, navigate]);

  useEffect(() => {
    console.log('🔍 ProductDetail Debug:');
    console.log('URL ID:', id);
    console.log('Found product:', product);
  }, [id, product]);

  useEffect(() => {
    if (!product) return;
    mainButton.setOnClick(handleAddToCart);
    if (product.stock <= 0) {
      mainButton.disable();
    } else {
      mainButton.enable();
    }
  }, [product, mainButton]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-copper border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const discountedPrice = product.discountPercentage
    ? product.price - (product.price * product.discountPercentage / 100)
    : null;

  return (
    <div className="space-y-8 bg-brand-black">
      {/* Breadcrumb */}
      <nav className="text-sm">
        <ol className="flex items-center space-x-2 text-brand-mid-gray">
          <li>
            <button
              onClick={() => navigate(ROUTES.HOME)}
              className="hover:text-brand-copper transition-colors duration-300"
            >
              Главная
            </button>
          </li>
          <li>/</li>
          <li>
            <button
              onClick={() => navigate(ROUTES.CATALOG)}
              className="hover:text-brand-copper transition-colors duration-300"
            >
              Каталог
            </button>
          </li>
          <li>/</li>
          <li className="text-brand-mid-gray font-medium">{product.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 bg-brand-black lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-brand-light-gray rounded-lg overflow-hidden">
            <img
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-brand-copper'
                      : 'border-transparent hover:border-brand-mid-gray'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-secondary font-bold text-brand-white mb-2">
              {product.title}
            </h1>
            <p className="text-brand-mid-gray">
              Бренд: {product.brand}
            </p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-brand-white">
                ${discountedPrice ? discountedPrice.toFixed(2) : product.price.toFixed(2)}
              </span>
              {discountedPrice && (
                <span className="text-xl text-brand-mid-gray line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
              {product.discountPercentage && (
                <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-brand-mid-gray">
              {product.rating} из 5
            </span>
          </div>

          {/* Stock */}
          <div className="flex items-center space-x-2">
            <span className="text-brand-mid-gray">В наличии:</span>
            <span className={`font-medium ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {product.stock > 0 ? `${product.stock} шт.` : 'Нет в наличии'}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-secondary font-semibold text-brand-black">
              Описание
            </h3>
            <p className="text-brand-mid-gray leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-all duration-300 ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : inCart
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-brand-copper text-white hover:bg-brand-dark-copper'
              }`}
            >
              {product.stock === 0
                ? 'Нет в наличии'
                : inCart
                  ? 'Товар в корзине'
                  : 'Добавить в корзину'
              }
            </button>

            <button
              onClick={() => navigate(ROUTES.CATALOG)}
              className="w-full py-3 px-6 border border-brand-copper text-brand-copper rounded-lg font-medium transition-all duration-300 hover:bg-brand-copper hover:text-white"
            >
              Продолжить покупки
            </button>
          </div>
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