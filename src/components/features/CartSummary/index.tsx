import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Cart } from '../../../types/cart';

interface CartSummaryProps {
  cart: Cart;
  onCheckout: () => void;
}

const CartSummary: FC<CartSummaryProps> = ({ cart, onCheckout }) => {
  const { totalItems, totalPrice } = cart;

  const totalDiscount = cart.items.reduce((sum, item) => {
    if (item.product.discountPercentage) {
      const fullPrice = item.product.price * item.quantity;
      const discountedPrice = (item.product.price -
        (item.product.price * item.product.discountPercentage / 100)) * item.quantity;
      return sum + (fullPrice - discountedPrice);
    }
    return sum;
  }, 0);

  const originalPrice = totalPrice + totalDiscount;

  return (
    <div className="bg-brand-dark p-6 lg:p-8 rounded-xl shadow-lg border border-brand-mid-gray/20">
      <h2 className="text-xl lg:text-2xl font-bold text-brand-white mb-6 lg:mb-8 pb-4 border-b border-brand-mid-gray/20">
        Ваш заказ
      </h2>

      <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-8">
        <div className="flex justify-between items-center text-brand-light-gray">
          <span className="text-base lg:text-lg">Товары ({totalItems}):</span>
          <span className="font-medium text-base lg:text-lg">${originalPrice.toFixed(2)}</span>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between items-center text-green-400">
            <span className="text-base lg:text-lg">Ваша скидка:</span>
            <span className="font-medium text-base lg:text-lg">-${totalDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-brand-white font-bold text-lg lg:text-xl pt-4 border-t border-brand-mid-gray/20">
          <span>Итого:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        <button
          onClick={onCheckout}
          disabled={cart.items.length === 0}
          className={`w-full py-3 lg:py-4 px-6 rounded-lg font-medium text-base lg:text-lg transition-all duration-300 ${
            cart.items.length === 0
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-brand-copper hover:bg-brand-dark-copper text-brand-black hover:shadow-lg transform hover:scale-105'
          } flex items-center justify-center space-x-2`}
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Оформить заказ</span>
        </button>

        <Link
          to={ROUTES.CATALOG}
          className="block w-full py-3 lg:py-4 px-6 text-center text-brand-copper hover:text-brand-dark-copper border border-brand-copper rounded-lg font-medium text-base lg:text-lg transition-all duration-300 hover:bg-brand-copper/10 hover:shadow-md"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Продолжить покупки</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;