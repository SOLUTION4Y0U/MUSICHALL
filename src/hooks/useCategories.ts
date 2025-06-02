import { useState, useEffect } from 'react';
import { Category } from '../types/product';
import { categories as mockCategories } from '../api/mock-data';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));

        // В реальном приложении здесь будет API запрос
        setCategories(mockCategories);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить категории');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};