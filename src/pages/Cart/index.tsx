import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import CartItem from '../../components/features/CartItem';
import CartSummary from '../../components/features/CartSummary';
import { useCart } from '../../hooks/useCart';
// import { useTelegramMainButton } from '../../hooks/useTelegramMainButton';
import { useTelegramUI } from '../../context/TelegramUIContext';

const Cart = () => {
  const { cart, clearCart } = useCart();
  const { hapticFeedback } = useTelegramUI();

  // Очищаем данные скролла каталога при переходе в корзину
  useEffect(() => {
    sessionStorage.removeItem('catalogScrollPosition');
    sessionStorage.removeItem('fromCatalog');
  }, []);

  // Временно отключена функция оформления заказа
  // const mainButton = useTelegramMainButton({
  //   text: 'Оформить заказ',
  //   isVisible: cart.items.length > 0
  // });

  // const handleGoToCheckout = () => {
  //   hapticFeedback.impactOccurred('medium');
  //   goToCheckout();
  // };

  // useEffect(() => {
  //   if (cart.items.length > 0) {
  //     mainButton.setOnClick(handleGoToCheckout);
  //     mainButton.show();
  //   } else {
  //     mainButton.hide();
  //   }

  //   return () => {
  //     mainButton.hide();
  //   };
  // }, [cart.items.length, mainButton, handleGoToCheckout]);

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
    <div className="min-h-screen bg-brand-black text-brand-white md:px-[5%]">
      <div className="py-6 lg:py-8">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Корзина</h1>
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

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          <div className="flex-1 min-w-0">
            {/* Заголовки колонок для десктопной версии */}
            <div className="hidden lg:grid grid-cols-12 gap-4 items-center mb-4 px-4">
              <div className="col-span-6">
                <h3 className="text-sm font-medium text-brand-mid-gray uppercase tracking-wide">Товар</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="text-sm font-medium text-brand-mid-gray uppercase tracking-wide">Количество</h3>
              </div>
              <div className="col-span-2 text-right">
                <h3 className="text-sm font-medium text-brand-mid-gray uppercase tracking-wide">Сумма</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="text-sm font-medium text-brand-mid-gray uppercase tracking-wide">Ozon</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="text-sm font-medium text-brand-mid-gray uppercase tracking-wide">Удалить</h3>
              </div>
            </div>

            <div className="space-y-4">
              {cart.items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={() => hapticFeedback.selectionChanged()}
                  onRemove={() => hapticFeedback.impactOccurred('medium')}
                />
              ))}
            </div>
          </div>

          <div className="xl:w-96 xl:flex-shrink-0">
            <div className="sticky top-4">
              <CartSummary
                cart={cart}
                onCheckout={() => {}} // Временно отключена функция оформления заказа
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;