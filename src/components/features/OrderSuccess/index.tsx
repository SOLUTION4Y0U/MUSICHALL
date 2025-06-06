import { FC } from 'react';
import { Link } from 'react-router-dom';
import { OrderDetails } from '../../../types/cart';
import { ROUTES } from '../../../constants/routes';

interface OrderSuccessProps {
  order: OrderDetails;
}

const OrderSuccess: FC<OrderSuccessProps> = ({ order }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const getPaymentMethodLabel = (method: OrderDetails['paymentMethod']) => {
    switch (method) {
      case 'card': return 'Банковская карта';
      case 'cash': return 'Наличные при получении';
      case 'telegram': return 'Telegram Payment';
      default: return 'Другое';
    }
  };

  return (
    <div className="order-success">
      <div className="order-success-icon">✓</div>
      <h2>Заказ успешно оформлен!</h2>
      <p className="order-success-message">
        Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.
      </p>

      <div className="order-success-details">
        <div className="detail-row">
          <span className="detail-label">Номер заказа:</span>
          <span className="detail-value">{order.orderId}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Дата заказа:</span>
          <span className="detail-value">{formatDate(order.createdAt)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Статус заказа:</span>
          <span className="detail-value status">
            <span className={`status-indicator ${order.status}`}></span>
            {order.status === 'pending' ? 'Ожидает обработки' :
             order.status === 'processing' ? 'В обработке' :
             order.status === 'completed' ? 'Выполнен' : 'Отменен'}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Способ оплаты:</span>
          <span className="detail-value">{getPaymentMethodLabel(order.paymentMethod)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Сумма заказа:</span>
          <span className="detail-value price">${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="order-success-actions">
        <Link to={ROUTES.CATALOG} className="button primary">
          Продолжить покупки
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;