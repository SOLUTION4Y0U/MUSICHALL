import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cart';
import { useTelegramUI } from '../../context/TelegramUIContext';
import { useTelegramMainButton } from '../../hooks/useTelegramMainButton';
import { useTelegramBackButton } from '../../hooks/useTelegramBackButton';
import { useOrder } from '../../hooks/useOrder';
import CheckoutForm from '../../components/features/CheckoutForm';
import OrderSummary from '../../components/features/OrderSummary';
import OrderSuccess from '../../components/features/OrderSuccess';
import { ROUTES } from '../../constants/routes';
import './Checkout.css';

const CheckoutPage = () => {
  const { cart } = useCartStore();
  const {
    orderFormData,
    paymentMethod,
    formErrors,
    loading,
    handleInputChange,
    handlePaymentMethodChange,
    submitOrder
  } = useOrder();

  const navigate = useNavigate();
  const { hapticFeedback } = useTelegramUI();

  // Используем новые хуки для работы с кнопками Telegram
  const mainButton = useTelegramMainButton({
    text: 'Оформить заказ',
    isVisible: cart.items.length > 0,
    isActive: !loading
  });

  // Обработчик отправки заказа
  const handleSubmitOrder = async () => {
    // Даем тактильный отклик при нажатии
    hapticFeedback.impactOccurred('medium');

    // Показываем индикатор загрузки на кнопке
    mainButton.showProgress(false);

    try {
      const result = await submitOrder();

      if (result) {
        // Успешный заказ
        hapticFeedback.notificationOccurred('success');
      }
    } catch (error) {
      // Ошибка при заказе
      hapticFeedback.notificationOccurred('error');
      mainButton.hideProgress();
    }
  };

  // Перенаправляем на корзину, если она пуста
  useEffect(() => {
    if (cart.items.length === 0) {
      navigate(ROUTES.CART);
    }
  }, [cart.items.length, navigate]);

  // Настраиваем MainButton
  useEffect(() => {
    mainButton.setOnClick(handleSubmitOrder);

    if (loading) {
      mainButton.disable();
    } else {
      mainButton.enable();
    }

    return () => {
      mainButton.hide();
    };
  }, [mainButton, handleSubmitOrder, loading]);

  if (cart.items.length === 0) {
    return null; // Перенаправляем в useEffect
  }

  return (
    <div className="checkout-page">
      <h1>Оформление заказа</h1>

      <div className="checkout-layout">
        <div className="checkout-form-container">
          <CheckoutForm
            formData={orderFormData}
            formErrors={formErrors}
            paymentMethod={paymentMethod}
            onInputChange={handleInputChange}
            onPaymentMethodChange={handlePaymentMethodChange}
            onSubmit={handleSubmitOrder}
            loading={loading}
          />
        </div>

        <div className="checkout-summary-container">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

const OrderSuccessPage = () => {
  const { currentOrder } = useOrder();
  const navigate = useNavigate();

  // Скрываем MainButton на странице успешного оформления
  const mainButton = useTelegramMainButton();

  // Настраиваем BackButton для перехода в каталог
  const backButton = useTelegramBackButton({
    onClick: () => navigate(ROUTES.CATALOG),
    isVisible: true,
    enableNavigationHistory: false
  });

  useEffect(() => {
    mainButton.hide();

    if (!currentOrder) {
      navigate(ROUTES.CHECKOUT);
    }

    return () => {
      backButton.hide();
    };
  }, [currentOrder, navigate, mainButton, backButton]);

  if (!currentOrder) {
    return null;
  }

  return <OrderSuccess order={currentOrder} />;
};

const CheckoutRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckoutPage />} />
      <Route path="/success" element={<OrderSuccessPage />} />
    </Routes>
  );
};

export default CheckoutRouter;