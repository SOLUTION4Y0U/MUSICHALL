import WebApp from '@twa-dev/sdk';
import { OrderDetails } from '../../types/cart';

export const processTelegramPayment = async (order: OrderDetails): Promise<boolean> => {
  try {
    if (!WebApp.isVersionAtLeast('6.1')) {
      throw new Error('Данная версия Telegram не поддерживает платежи');
    }

    // Используем параметры заказа для создания платежа
    // В реальном приложении здесь будет интеграция с API бэкенда
    const invoiceParams = {
      title: `Заказ ${order.orderId}`,
      description: `Оплата заказа ${order.orderId}`,
      payload: JSON.stringify({ orderId: order.orderId }),
      provider_token: 'YOUR_PROVIDER_TOKEN', // токен от платежной системы
      currency: 'USD',
      prices: order.items.map(item => ({
        label: item.product.title,
        amount: Math.round(
          (item.product.discountPercentage
            ? item.product.price - (item.product.price * item.product.discountPercentage / 100)
            : item.product.price) * item.quantity * 100
        )
      })),
      max_tip_amount: 0,
      suggested_tip_amounts: [],
      photo_url: order.items[0]?.product.thumbnail,
      need_name: true,
      need_phone_number: true,
      need_email: true,
      need_shipping_address: true,
      send_phone_number_to_provider: true,
      send_email_to_provider: true,
      is_flexible: false
    };

    console.log('Initiating Telegram payment', invoiceParams);

    // В реальном приложении будет вызов WebApp.showInvoice
    // В учебном режиме просто имитируем успешную оплату
    await new Promise(resolve => setTimeout(resolve, 2000));

    return true;
  } catch (error) {
    console.error('Error during Telegram payment', error);
    return false;
  }
};

export const isSupported = (): boolean => {
  return WebApp.isVersionAtLeast('6.1');
};