import { FC } from 'react';
import { Cart } from '../../../types/cart';
import './OrderSummary.css';

interface OrderSummaryProps {
  cart: Cart;
}

const OrderSummary: FC<OrderSummaryProps> = ({ cart }) => {
  const { items, totalItems, totalPrice } = cart;

  // Расчет суммарной скидки
  const totalDiscount = items.reduce((sum, item) => {
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
    <div className="order-summary">
      <h2>Ваш заказ</h2>

      <div className="order-items">
        {items.map(item => {
          const itemPrice = item.product.discountPercentage
            ? item.product.price - (item.product.price * item.product.discountPercentage / 100)
            : item.product.price;

          return (
            <div key={item.id} className="order-item">
              <div className="order-item-info">
                <span className="order-item-title">{item.product.title}</span>
                <span className="order-item-quantity">x{item.quantity}</span>
              </div>
              <span className="order-item-price">${(itemPrice * item.quantity).toFixed(2)}</span>
            </div>
          );
        })}
      </div>

      <div className="order-totals">
        <div className="order-total-row">
          <span>Количество товаров:</span>
          <span>{totalItems}</span>
        </div>

        <div className="order-total-row">
          <span>Сумма:</span>
          <span>${originalPrice.toFixed(2)}</span>
        </div>

        {totalDiscount > 0 && (
          <div className="order-total-row discount">
            <span>Скидка:</span>
            <span>-${totalDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="order-total-row final">
          <span>Итого к оплате:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;