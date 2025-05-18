import { FC } from 'react';
import { CartItem as CartItemType } from '../../../types/cart';
import { useCartStore } from '../../../store/cart';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange?: () => void;
  onRemove?: () => void;
}

const CartItem: FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove
}) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  const { product, quantity } = item;

  // Рассчитываем цену с учетом скидки
  const itemPrice = product.discountPercentage
    ? product.price - (product.price * product.discountPercentage / 100)
    : product.price;

  const totalPrice = itemPrice * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateQuantity(product.id, newQuantity);
      if (onQuantityChange) onQuantityChange();
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    if (onRemove) onRemove();
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
    if (onQuantityChange) onQuantityChange();
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
      if (onQuantityChange) onQuantityChange();
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>

      <div className="cart-item-info">
        <h3 className="cart-item-title">{product.title}</h3>
        <p className="cart-item-price">
          ${itemPrice.toFixed(2)}
          {product.discountPercentage && (
            <span className="cart-item-original-price">
              ${product.price.toFixed(2)}
            </span>
          )}
        </p>
      </div>

      <div className="cart-item-quantity">
        <button
          className="quantity-btn"
          onClick={decreaseQuantity}
          aria-label="Уменьшить количество"
        >
          -
        </button>
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={handleQuantityChange}
          className="quantity-input"
        />
        <button
          className="quantity-btn"
          onClick={increaseQuantity}
          aria-label="Увеличить количество"
          disabled={quantity >= product.stock}
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        ${totalPrice.toFixed(2)}
      </div>

      <button
        className="cart-item-remove"
        onClick={handleRemove}
        aria-label="Удалить товар"
      >
        ✕
      </button>
    </div>
  );
};

export default CartItem;