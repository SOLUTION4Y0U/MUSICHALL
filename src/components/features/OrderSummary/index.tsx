import { FC } from 'react';
import { Cart } from '../../../types/cart';

interface OrderSummaryProps {
  cart: Cart;
}

const OrderSummary: FC<OrderSummaryProps> = ({ cart }) => {
  const { items, totalItems, totalPrice } = cart;

  // const totalDiscount = items.reduce((sum, item) => {
  //   if (item.product.discountPercentage) {
  //     const fullPrice = item.product.price * item.quantity;
  //     const discountedPrice = (item.product.price -
  //       (item.product.price * item.product.discountPercentage / 100)) * item.quantity;
  //     return sum + (fullPrice - discountedPrice);
  //   }
  //   return sum;
  // }, 0);

  // const originalPrice = totalPrice + totalDiscount;

  return (
    <div className="bg-brand-dark rounded-xl shadow-lg border border-brand-mid-gray/20 p-6">
      <h2 className="text-xl font-bold text-brand-white mb-6 pb-4 border-b border-brand-mid-gray/20">
        Ваш заказ
      </h2>

      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
        {items.map(item => {
          // const itemPrice = item.product.discountPercentage
          //   ? item.product.price - (item.product.price * item.product.discountPercentage / 100)
          //   : item.product.price;
          const itemPrice = item.product.price;

          return (
            <div 
              key={item.id} 
              className="flex justify-between items-start py-3 border-b border-brand-mid-gray/10 last:border-0"
            >
              <div className="flex-1">
                <h3 className="text-brand-white font-medium">
                  {item.product.title}
                  {/* {item.product.discountPercentage && (
                    <span className="ml-2 text-xs bg-brand-copper text-brand-black px-2 py-1 rounded-full">
                      -{item.product.discountPercentage}%
                    </span>
                  )} */}
                </h3>
                <p className="text-sm text-brand-mid-gray">x{item.quantity}</p>
              </div>
              <div className="text-right">
                {/* {item.product.discountPercentage && (
                  <p className="text-sm text-brand-mid-gray line-through">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                )} */}
                <p className="text-brand-white font-medium">
                  {(itemPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3 pt-4 border-t border-brand-mid-gray/20">
        <div className="flex justify-between text-brand-light-gray">
          <span>Товары ({totalItems}):</span>
          <span>{totalPrice.toFixed(2)}</span>
        </div>

        {/* {totalDiscount > 0 && (
          <div className="flex justify-between text-green-400">
            <span>Ваша скидка:</span>
            <span>-${totalDiscount.toFixed(2)}</span>
          </div>
        )} */}

        <div className="flex justify-between text-brand-white font-bold text-lg pt-3 mt-3 border-t border-brand-mid-gray/20">
          <span>Итого к оплате:</span>
          <span>{totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;