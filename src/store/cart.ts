import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartState {
  cart: Cart;

  // Действия
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Геттеры
  isInCart: (productId: string) => boolean;
  getCartItemById: (productId: string) => CartItem | undefined;
}

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Вспомогательная функция для пересчета итогов корзины
const recalculateTotals = (items: CartItem[]): Cart => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => {
      const itemPrice = item.product.discountPercentage
        ? item.product.price - (item.product.price * item.product.discountPercentage / 100)
        : item.product.price;

      return sum + itemPrice * item.quantity;
    },
    0
  );

  return {
    items,
    totalItems,
    totalPrice
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: initialCart,

      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItemIndex = cart.items.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
          // Товар уже в корзине - увеличиваем количество
          const updatedItems = [...cart.items];
          updatedItems[existingItemIndex].quantity += quantity;

          const newCart = recalculateTotals(updatedItems);
          set({ cart: newCart });
        } else {
          // Новый товар - добавляем в корзину
          const newItem: CartItem = {
            id: product.id,
            quantity,
            product,
          };

          const newItems = [...cart.items, newItem];
          const newCart = recalculateTotals(newItems);

          set({ cart: newCart });
        }
      },

      removeFromCart: (productId) => {
        const { cart } = get();
        const updatedItems = cart.items.filter(item => item.id !== productId);
        const newCart = recalculateTotals(updatedItems);

        set({ cart: newCart });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        const { cart } = get();
        const existingItemIndex = cart.items.findIndex(item => item.id === productId);

        if (existingItemIndex !== -1) {
          const updatedItems = [...cart.items];
          updatedItems[existingItemIndex].quantity = quantity;

          const newCart = recalculateTotals(updatedItems);
          set({ cart: newCart });
        }
      },

      clearCart: () => {
        set({ cart: initialCart });
      },

      isInCart: (productId) => {
        return get().cart.items.some(item => item.id === productId);
      },

      getCartItemById: (productId) => {
        return get().cart.items.find(item => item.id === productId);
      }
    }),
    {
      name: 'cart-storage', // уникальное имя для localStorage
    }
  )
);