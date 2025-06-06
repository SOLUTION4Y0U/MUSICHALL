import { FC } from 'react';
import { Customer, OrderDetails } from '../../../types/cart';

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
    <form 
      className="max-w-2xl mx-auto p-6 bg-brand-dark rounded-xl shadow-lg border border-brand-mid-gray/20"
      onSubmit={handleSubmit}
    >
      {/* Контактная информация */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-brand-white mb-6 pb-2 border-b border-brand-mid-gray/20">
          Контактная информация
        </h3>

        <div className="space-y-5">
          <div className="form-group">
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-brand-light-gray mb-2"
            >
              ФИО <span className="text-brand-copper">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              className={`w-full px-4 py-3 bg-brand-black/50 border ${
                formErrors.name ? 'border-red-500' : 'border-brand-mid-gray/30'
              } rounded-lg text-brand-light-gray placeholder-brand-mid-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent transition-all duration-200`}
              placeholder="Иванов Иван Иванович"
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-brand-light-gray mb-2"
            >
              Email <span className="text-brand-copper">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className={`w-full px-4 py-3 bg-brand-black/50 border ${
                formErrors.email ? 'border-red-500' : 'border-brand-mid-gray/30'
              } rounded-lg text-brand-light-gray placeholder-brand-mid-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent transition-all duration-200`}
              placeholder="example@email.com"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label 
              htmlFor="phone" 
              className="block text-sm font-medium text-brand-light-gray mb-2"
            >
              Телефон <span className="text-brand-copper">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              className={`w-full px-4 py-3 bg-brand-black/50 border ${
                formErrors.phone ? 'border-red-500' : 'border-brand-mid-gray/30'
              } rounded-lg text-brand-light-gray placeholder-brand-mid-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent transition-all duration-200`}
              placeholder="+7 (999) 123-45-67"
            />
            {formErrors.phone && (
              <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Адрес доставки */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-brand-white mb-6 pb-2 border-b border-brand-mid-gray/20">
          Адрес доставки
        </h3>

        <div className="form-group">
          <label 
            htmlFor="address" 
            className="block text-sm font-medium text-brand-light-gray mb-2"
          >
            Адрес <span className="text-brand-copper">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={onInputChange}
            className={`w-full px-4 py-3 bg-brand-black/50 border ${
              formErrors.address ? 'border-red-500' : 'border-brand-mid-gray/30'
            } rounded-lg text-brand-light-gray placeholder-brand-mid-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent transition-all duration-200`}
            rows={3}
            placeholder="Город, улица, дом, квартира"
          />
          {formErrors.address && (
            <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
          )}
        </div>
      </div>

      {/* Способ оплаты */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-brand-white mb-6 pb-2 border-b border-brand-mid-gray/20">
          Способ оплаты
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { method: 'card', icon: '💳', label: 'Банковская карта' },
            { method: 'cash', icon: '💵', label: 'Наличные' },
            { method: 'telegram', icon: '✈️', label: 'Telegram Payment' },
          ].map(({ method, icon, label }) => (
            <div
              key={method}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                paymentMethod === method
                  ? 'border-brand-copper bg-brand-copper/10'
                  : 'border-brand-mid-gray/30 hover:border-brand-copper/50'
              }`}
              onClick={() => onPaymentMethodChange(method as OrderDetails['paymentMethod'])}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{icon}</span>
                <span className="font-medium text-brand-white">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка отправки */}
      <button
        type="submit"
        className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
          loading
            ? 'bg-brand-mid-gray cursor-not-allowed'
            : 'bg-brand-copper hover:bg-brand-dark-copper text-brand-black'
        } flex items-center justify-center space-x-2`}
        disabled={loading}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-brand-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Обработка...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Оформить заказ</span>
          </>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;