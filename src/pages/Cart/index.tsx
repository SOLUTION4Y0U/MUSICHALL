import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import CartItem from '../../components/features/CartItem';
import CartSummary from '../../components/features/CartSummary';
import { useCart } from '../../hooks/useCart';
import { useTelegramMainButton } from '../../hooks/useTelegramMainButton';
import { useTelegramUI } from '../../context/TelegramUIContext';

const Cart = () => {
  const { cart, goToCheckout, clearCart } = useCart();
  const { hapticFeedback } = useTelegramUI();

  const mainButton = useTelegramMainButton({
    text: 'Оформить заказ',
    isVisible: cart.items.length > 0
  });

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
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center text-brand-white p-4">
        <h1 className="text-xl md:text-2xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-brand-light-gray mb-6 text-center">Вы еще не добавили товары в корзину</p>
        <Link
          to={ROUTES.CATALOG}
          className="btn-primary px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white p-2 md:p-4">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Корзина</h1>

      <div className="mb-4">
        <button
          className="text-brand-copper hover:text-brand-dark-copper transition-colors text-sm md:text-base"
          onClick={() => {
            hapticFeedback.impactOccurred('light');
            clearCart();
          }}
        >
          Очистить корзину
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
        <div className="flex-grow">
          {/* Заголовки только для десктопа */}
          <div className="hidden lg:grid grid-cols-12 gap-4 mb-4 text-brand-light-gray text-sm">
            <div className="col-span-6">Товар</div>
            <div className="col-span-3 text-center">Количество</div>
            <div className="col-span-2 text-right">Сумма</div>
            <div className="col-span-1"></div>
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

        <div className="lg:w-80 mt-4 lg:mt-0">
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