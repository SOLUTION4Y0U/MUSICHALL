import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Cart } from '../../../types/cart';
import './CartSummary.css';

interface CartSummaryProps {
  cart: Cart;
  onCheckout: () => void;
}

const CartSummary: FC<CartSummaryProps> = ({ cart, onCheckout }) => {
  const { totalItems, totalPrice } = cart;

  // Расчет суммарной скидки
  const totalDiscount = cart.items.reduce((sum, item) => {
    if (item.product.discountPercentage) {
      const fullPrice = item.product.price * item.quantity;
      const discountedPrice = (item.product.price -
        (item.product.price * item.product.discountPercentage / 100)) * item.quantity;
      return sum + (fullPrice - discountedPrice);
    }
    return sum;
  }, 0);

  // Оригинальная цена без скидок
  const originalPrice = totalPrice + totalDiscount;

  return (
    <div className="cart-summary">
      <h2>Ваш заказ</h2>

      <div className="summary-row">
        <span>Количество товаров:</span>
        <span>{totalItems}</span>
      </div>

      <div className="summary-row">
        <span>Сумма:</span>
        <span>${originalPrice.toFixed(2)}</span>
      </div>

      {totalDiscount > 0 && (
        <div className="summary-row discount">
          <span>Скидка:</span>
          <span>-${totalDiscount.toFixed(2)}</span>
        </div>
      )}

      <div className="summary-row total">
        <span>Итого:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <button
        className="checkout-button"
        onClick={onCheckout}
        disabled={cart.items.length === 0}
      >
        Оформить заказ
      </button>

      <Link to={ROUTES.CATALOG} className="continue-shopping">
        Продолжить покупки
      </Link>
    </div>
  );
};

export default CartSummary;