import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer, OrderDetails } from '../types/cart';
import { useCartStore } from './cart';

// Временно отключена функциональность заказов
// Дополнительные типы для заказа
// interface CreateOrderOptions {
//   customer: Customer;
//   paymentMethod: OrderDetails['paymentMethod'];
// }

// interface OrderState {
//   currentOrder: OrderDetails | null;
//   orders: OrderDetails[];
//   loading: boolean;
//   error: string | null;

//   // Методы
//   createOrder: (options: CreateOrderOptions) => Promise<OrderDetails>;
//   getOrderById: (orderId: string) => OrderDetails | undefined;
//   clearCurrentOrder: () => void;
// }

// Генерация уникального ID заказа
// const generateOrderId = (): string => {
//   return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
// };

// export const useOrderStore = create<OrderState>()(
//   persist(
//     (set, get) => ({
//       currentOrder: null,
//       orders: [],
//       loading: false,
//       error: null,

//       createOrder: async (options: CreateOrderOptions) => {
//         try {
//           set({ loading: true, error: null });

//           // Получаем данные корзины
//           const { cart } = useCartStore.getState();

//           if (cart.items.length === 0) {
//             throw new Error('Корзина пуста');
//           }

//           // Имитация API запроса
//           await new Promise(resolve => setTimeout(resolve, 1000));

//           // Создаем заказ
//           const newOrder: OrderDetails = {
//             orderId: generateOrderId(),
//             items: [...cart.items],
//             totalAmount: cart.totalPrice,
//             customer: options.customer,
//             status: 'pending',
//             paymentMethod: options.paymentMethod,
//             createdAt: new Date()
//           };

//           // Сохраняем заказ
//           const updatedOrders = [...get().orders, newOrder];
//           set({
//             orders: updatedOrders,
//             currentOrder: newOrder,
//             loading: false
//           });

//           // Очищаем корзину после создания заказа
//           useCartStore.getState().clearCart();

//           return newOrder;
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : 'Ошибка при создании заказа';
//           set({ error: errorMessage, loading: false });
//           throw error;
//         }
//       },

//       getOrderById: (orderId: string) => {
//         return get().orders.find(order => order.orderId === orderId);
//       },

//       clearCurrentOrder: () => {
//         set({ currentOrder: null });
//       }
//     }),
//     {
//       name: 'orders-storage',
//     }
//   )
// );