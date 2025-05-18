import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { products as mockProducts } from '../api/mock-data';

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('ID товара не указан');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 800));

        // В реальном приложении здесь был бы API запрос
        const foundProduct = mockProducts.find(p => p.id === id);

        if (foundProduct) {
          setProduct(foundProduct);
          setError(null);
        } else {
          setProduct(null);
          setError('Товар не найден');
        }
      } catch (err) {
        setError('Ошибка при загрузке товара');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};