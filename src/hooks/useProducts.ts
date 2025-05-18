import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { products as mockProducts } from '../api/mock-data';

interface UseProductsOptions {
  categoryId?: string;
  searchQuery?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating-desc';
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Имитация запроса к API с задержкой
        await new Promise(resolve => setTimeout(resolve, 800));

        let filteredProducts = [...mockProducts];

        // Фильтрация по категории
        if (options.categoryId) {
          filteredProducts = filteredProducts.filter(
            product => product.category === options.categoryId
          );
        }

        // Фильтрация по поисковому запросу
        if (options.searchQuery) {
          const query = options.searchQuery.toLowerCase();
          filteredProducts = filteredProducts.filter(
            product =>
              product.title.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query) ||
              product.brand.toLowerCase().includes(query)
          );
        }

        // Сортировка
        if (options.sortBy) {
          switch (options.sortBy) {
            case 'price-asc':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price-desc':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'rating-desc':
              filteredProducts.sort((a, b) => b.rating - a.rating);
              break;
          }
        }

        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [options.categoryId, options.searchQuery, options.sortBy]);

  return { products, loading, error };
};