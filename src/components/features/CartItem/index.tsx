import { FC } from 'react';
import { CartItem as CartItemType } from '../../../types/cart';
import { useCartStore } from '../../../store/cart';

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

  return (
    <div className="bg-brand-light-gray rounded-lg p-4 flex items-center space-x-4">
      {/* Product Image */}
      <div className="w-20 h-20 bg-brand-white rounded-md overflow-hidden flex-shrink-0">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-secondary font-semibold text-brand-black truncate">
          {item.product.title}
        </h3>
        <p className="text-sm text-brand-mid-gray">
          Бренд: {item.product.brand}
        </p>
        <p className="text-lg font-bold text-brand-copper">
          ${item.product.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 bg-brand-copper text-brand-white rounded-full flex items-center justify-center hover:bg-brand-black-copper transition-colors duration-300"
        >
          -
        </button>
        <span className="w-8 text-center font-medium text-brand-black">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 bg-brand-copper text-brand-white rounded-full flex items-center justify-center hover:bg-brand-black-copper transition-colors duration-300"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right">
        <p className="text-lg font-bold text-brand-black">
          ${itemTotal.toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
        aria-label="Удалить товар"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;