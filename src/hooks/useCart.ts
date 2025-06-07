import { useTmaSafeNavigation } from './useTmaSafeNavigation';
import { usePlatformUIControls } from '../platform';
import { useCartStore } from '../store/cart';
import { ROUTES } from '../constants/routes';
import { Product } from '../types/product';

export const useCart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItemById
  } = useCartStore();

  const { showAlert } = usePlatformUIControls();
  const { navigate } = useTmaSafeNavigation();

  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.stock < quantity) {
      showAlert('Недостаточно товара на складе');
      return;
    }

    addToCart(product, quantity);
    showAlert('Товар добавлен в корзину');
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    showAlert('Товар удален из корзины');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const item = getCartItemById(productId);

    if (!item) return;

    if (quantity > item.product.stock) {
      showAlert('Недостаточно товара на складе');
      return;
    }

    updateQuantity(productId, quantity);
  };

  const handleClearCart = () => {
    clearCart();
    showAlert('Корзина очищена');
  };

  const handleGoToCheckout = () => {
    if (cart.items.length === 0) {
      showAlert('Ваша корзина пуста');
      return;
    }

    navigate(ROUTES.CHECKOUT);
  };

  return {
    cart,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    goToCheckout: handleGoToCheckout,
    isInCart,
    getCartItemById
  };
};