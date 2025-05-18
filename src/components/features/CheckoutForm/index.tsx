import { FC } from 'react';
import { Customer, OrderDetails } from '../../../types/cart';
import './CheckoutForm.css';

interface CheckoutFormProps {
  formData: Customer;
  formErrors: Record<string, string>;
  paymentMethod: OrderDetails['paymentMethod'];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPaymentMethodChange: (method: OrderDetails['paymentMethod']) => void;
  onSubmit: () => void;
  loading: boolean;
}

const CheckoutForm: FC<CheckoutFormProps> = ({
  formData,
  formErrors,
  paymentMethod,
  onInputChange,
  onPaymentMethodChange,
  onSubmit,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Контактная информация</h3>

        <div className="form-group">
          <label htmlFor="name">ФИО <span className="required">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className={formErrors.name ? 'input-error' : ''}
            placeholder="Иванов Иван Иванович"
          />
          {formErrors.name && <div className="error-message">{formErrors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className={formErrors.email ? 'input-error' : ''}
            placeholder="example@email.com"
          />
          {formErrors.email && <div className="error-message">{formErrors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон <span className="required">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            className={formErrors.phone ? 'input-error' : ''}
            placeholder="+7 (999) 123-45-67"
          />
          {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
        </div>
      </div>

      <div className="form-section">
        <h3>Адрес доставки</h3>

        <div className="form-group">
          <label htmlFor="address">Адрес <span className="required">*</span></label>
          <textarea
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={onInputChange}
            className={formErrors.address ? 'input-error' : ''}
            rows={3}
            placeholder="Город, улица, дом, квартира"
          />
          {formErrors.address && <div className="error-message">{formErrors.address}</div>}
        </div>
      </div>

      <div className="form-section">
        <h3>Способ оплаты</h3>

        <div className="payment-methods">
          <div
            className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
            onClick={() => onPaymentMethodChange('card')}
          >
            <div className="payment-method-icon">💳</div>
            <div className="payment-method-title">Банковская карта</div>
          </div>

          <div
            className={`payment-method ${paymentMethod === 'cash' ? 'selected' : ''}`}
            onClick={() => onPaymentMethodChange('cash')}
          >
            <div className="payment-method-icon">💵</div>
            <div className="payment-method-title">Наличные</div>
          </div>

          <div
            className={`payment-method ${paymentMethod === 'telegram' ? 'selected' : ''}`}
            onClick={() => onPaymentMethodChange('telegram')}
          >
            <div className="payment-method-icon">✈️</div>
            <div className="payment-method-title">Telegram Payment</div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="checkout-submit-button"
        disabled={loading}
      >
        {loading ? 'Обработка...' : 'Оформить заказ'}
      </button>
    </form>
  );
};

export default CheckoutForm;