import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { usePlatformUIControls } from '../platform';
// import { useOrderStore } from '../store/order'; // Временно отключена функциональность заказов
import { Customer, OrderDetails } from '../types/cart';

// Временно отключена функциональность заказов
// export const useOrder = () => {
//   const [orderFormData, setOrderFormData] = useState<Customer>({
//     name: '',
//     email: '',
//     phone: '',
//     address: ''
//   });

//   const [paymentMethod, setPaymentMethod] = useState<OrderDetails['paymentMethod']>('card');
//   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

//   const { createOrder, currentOrder, clearCurrentOrder, loading, error } = useOrderStore();
//   const { showAlert } = usePlatformUIControls();
//   const navigate = useNavigate();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setOrderFormData(prev => ({ ...prev, [name]: value }));

//     // Очищаем ошибку при вводе
//     if (formErrors[name]) {
//       setFormErrors(prev => {
//         const updated = { ...prev };
//         delete updated[name];
//         return updated;
//       });
//     }
//   };

//   const handlePaymentMethodChange = (method: OrderDetails['paymentMethod']) => {
//     setPaymentMethod(method);
//   };

//   const validateForm = (): boolean => {
//     const errors: Record<string, string> = {};

//     if (!orderFormData.name.trim()) {
//       errors.name = 'Пожалуйста, укажите ваше имя';
//     }

//     if (!orderFormData.email.trim()) {
//       errors.email = 'Пожалуйста, укажите ваш email';
//     } else if (!/\S+@\S+\.\S+/.test(orderFormData.email)) {
//       errors.email = 'Пожалуйста, укажите корректный email';
//     }

//     if (!orderFormData.phone.trim()) {
//       errors.phone = 'Пожалуйста, укажите ваш телефон';
//     }

//     if (!orderFormData.address?.trim()) {
//       errors.address = 'Пожалуйста, укажите ваш адрес';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const submitOrder = async () => {
//     if (!validateForm()) {
//       showAlert('Пожалуйста, заполните все обязательные поля');
//       return;
//     }

//     try {
//       const order = await createOrder({
//         customer: orderFormData,
//         paymentMethod
//       });

//       showAlert('Заказ успешно создан!');
//       navigate(`${ROUTES.CHECKOUT}/success`);

//       return order;
//     } catch (err) {
//       showAlert(error || 'Ошибка при создании заказа');
//       return null;
//     }
//   };

//   const resetOrder = () => {
//     clearCurrentOrder();
//     setOrderFormData({
//       name: '',
//       email: '',
//       phone: '',
//       address: ''
//     });
//     setFormErrors({});
//   };

//   return {
//     orderFormData,
//     setOrderFormData,
//     paymentMethod,
//     formErrors,
//     loading,
//     error,
//     currentOrder,
//     handleInputChange,
//     handlePaymentMethodChange,
//     submitOrder,
//     resetOrder
//   };
// };