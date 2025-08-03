// import { OrderDetails } from '../../types/cart';

// Временно отключены функции оплаты
// export const processTelegramPayment = async (order: OrderDetails): Promise<boolean> => {
//   // В браузере перенаправляем на страницу оплаты с кредитной картой
//   console.log('Browser cannot use Telegram payment, redirecting to card payment', order);

//   // Имитируем успешную оплату для демонстрации
//   return await processCardPayment(order);
// };

// export const processCardPayment = async (order: OrderDetails): Promise<boolean> => {
//   try {
//     // В реальном приложении здесь была бы интеграция с платежным шлюзом
//     console.log('Processing card payment for order', order);

//     // Имитируем задержку API и возвращаем успех
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     return true;
//   } catch (error) {
//     console.error('Error during card payment', error);
//     return false;
//   }
// };

// export const isSupported = (): boolean => {
//   return true; // Платежи картой поддерживаются в браузере
// };