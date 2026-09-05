import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../types/cart';
import { useCartStore } from '../../../store/cart';
import { getOzonProductUrl } from '../../../utils/productSkuMapping';
import { formatPrice } from '../../../utils/formatPrice';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange?: () => void;
  onRemove?: () => void;
}

const CartItem: FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove();
      return;
    }
    updateQuantity(item.product.id, newQuantity);
    onQuantityChange?.();
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
    onRemove?.();
  };

  const itemTotal = item.product.price * item.quantity;
  const ozonUrl = item.product.sku ? getOzonProductUrl(item.product.sku) : null;

  return (
    <div className="bg-brand-light-gray rounded-lg p-3 md:p-4 mb-3">
      {/* Мобильная версия - вертикальная компоновка */}
      <div className="block lg:hidden">
        {/* Верхняя часть: изображение, название, цена, кнопка удаления */}
        <div className="flex items-start space-x-3 mb-3">
          <Link
            to={`/product/${item.product.id}`}
            className="w-16 h-16 bg-brand-white rounded-md overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img
              src={item.product.thumbnail}
              alt={item.product.title}
              className="w-full h-full object-cover"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <Link to={`/product/${item.product.id}`} className="hover:text-brand-copper transition-colors">
              <h3 className="font-secondary font-semibold text-brand-black text-sm leading-tight mb-1">
                {item.product.title}
              </h3>
            </Link>
            <p className="text-xs text-brand-mid-gray mb-1">
              Бренд: {item.product.brand}
            </p>
            <p className="text-base font-bold text-brand-copper">
              {formatPrice(item.product.price)}
            </p>
          </div>

          <button
            onClick={handleRemove}
            className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 flex-shrink-0"
            aria-label="Удалить товар"
          >
            <span className="text-sm">✕</span>
          </button>
        </div>

        {/* Нижняя часть: количество, общая стоимость и кнопка покупки */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-brand-black font-medium">Количество:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-7 h-7 bg-brand-copper text-brand-white rounded-full flex items-center justify-center hover:bg-brand-dark-copper transition-colors duration-300"
                >
                  <span className="text-sm">-</span>
                </button>
                <span className="w-8 text-center font-medium text-brand-black text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-7 h-7 bg-brand-copper text-brand-white rounded-full flex items-center justify-center hover:bg-brand-dark-copper transition-colors duration-300"
                >
                  <span className="text-sm">+</span>
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-brand-mid-gray">Итого:</p>
              <p className="text-base font-bold text-brand-black">
                {formatPrice(itemTotal)}
              </p>
            </div>
          </div>

          {/* Кнопка покупки на Ozon */}
          {ozonUrl && (
            <a
              href={ozonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-brand-copper hover:bg-brand-dark-copper text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <span>🛒</span>
              <span>Купить на Ozon</span>
            </a>
          )}
        </div>
      </div>

      {/* Десктопная версия - grid layout (соответствует заголовкам в Cart.tsx) */}
      <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
        {/* Товар (6 колонок) */}
        <div className="col-span-6 flex items-center space-x-4">
          <Link
            to={`/product/${item.product.id}`}
            className="w-20 h-20 bg-brand-white rounded-md overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img
              src={item.product.thumbnail}
              alt={item.product.title}
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={`/product/${item.product.id}`} className="hover:text-brand-copper transition-colors">
              <h3 className="font-secondary font-semibold text-brand-black text-base leading-tight mb-1">
                {item.product.title}
              </h3>
            </Link>
            <p className="text-sm text-brand-mid-gray mb-1">
              Бренд: {item.product.brand}
            </p>
            <p className="text-lg font-bold text-brand-copper">
              {formatPrice(item.product.price)}
            </p>
          </div>
        </div>

        {/* Количество (2 колонки) */}
        <div className="col-span-2 flex items-center justify-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 bg-brand-copper text-brand-white rounded-full flex items-center justify-center hover:bg-brand-dark-copper transition-colors duration-300"
          >
            -
          </button>
          <span className="w-8 text-center font-medium text-brand-black">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 bg-brand-copper text-brand-white rounded-full flex items-center justify-center hover:bg-brand-dark-copper transition-colors duration-300"
          >
            +
          </button>
        </div>

        {/* Сумма (2 колонки) */}
        <div className="col-span-2 text-right">
          <p className="text-lg font-bold text-brand-black">
            {formatPrice(itemTotal)}
          </p>
        </div>

        {/* Кнопка покупки на Ozon (1 колонка) */}
        <div className="col-span-1 flex justify-center">
          {ozonUrl ? (
            <a
              href={ozonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-copper hover:bg-brand-dark-copper text-white font-medium py-2 px-3 rounded-lg transition-colors duration-300 text-sm"
              title="Купить на Ozon"
            >
              🛒
            </a>
          ) : (
            <span className="text-gray-400 text-sm">-</span>
          )}
        </div>

        {/* Кнопка удаления (1 колонка) */}
        <div className="col-span-1 flex justify-center">
          <button
            onClick={handleRemove}
            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
            aria-label="Удалить товар"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;