import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import CartItem from '../../components/features/CartItem';
import CartSummary from '../../components/features/CartSummary';
import { useCart } from '../../hooks/useCart';
import { useTelegramMainButton } from '../../hooks/useTelegramMainButton';
import { useTelegramUI } from '../../context/TelegramUIContext';
import './Cart.css';

const Cart = () => {
  const { cart, goToCheckout, clearCart } = useCart();
  const { hapticFeedback } = useTelegramUI();

  // Используем новые хуки для работы с кнопками Telegram
  const mainButton = useTelegramMainButton({
    text: 'Оформить заказ',
    isVisible: cart.items.length > 0
  });

  // Обработчик перехода к оформлению заказа
  const handleGoToCheckout = () => {
    hapticFeedback.impactOccurred('medium');
    goToCheckout();
  };

  useEffect(() => {
    if (cart.items.length > 0) {
      mainButton.setOnClick(handleGoToCheckout);
      mainButton.show();
    } else {
      mainButton.hide();
    }

    return () => {
      mainButton.hide();
    };
  }, [cart.items.length, mainButton, handleGoToCheckout]);

  if (cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Корзина пуста</h1>
        <p>Вы еще не добавили товары в корзину</p>
        <Link to={ROUTES.CATALOG} className="button">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>

      <div className="cart-actions">
        <button
          className="clear-cart-button"
          onClick={() => {
            hapticFeedback.impactOccurred('light');
            clearCart();
          }}
        >
          Очистить корзину
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-headers">
            <div className="cart-header-item">Товар</div>
            <div className="cart-header-quantity">Количество</div>
            <div className="cart-header-price">Сумма</div>
            <div className="cart-header-remove"></div>
          </div>

          {cart.items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={() => hapticFeedback.selectionChanged()}
              onRemove={() => hapticFeedback.impactOccurred('medium')}
            />
          ))}
        </div>

        <div className="cart-sidebar">
          <CartSummary
            cart={cart}
            onCheckout={handleGoToCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;