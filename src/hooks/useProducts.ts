import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { products as mockProducts } from '../api/mock-data';

interface UseProductsOptions {
  categoryId?: string;
  searchQuery?: string;
  brands?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'rating-desc' | 'brand-asc' | 'brand-desc';
}
export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'brand-asc' | 'brand-desc';

// Кэш для результатов
const cache = new Map<string, Product[]>();
const cacheTimestamps = new Map<string, number>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Создаем ключ кэша из параметров
        const cacheKey = JSON.stringify(options);
        const cached = cache.get(cacheKey);
        const cacheTime = cacheTimestamps.get(cacheKey);
        const now = Date.now();

        // Проверяем кэш
        if (cached && cacheTime && (now - cacheTime) < CACHE_DURATION) {
          console.log('Using cached products for:', cacheKey);
          setProducts(cached);
          setError(null);
          setLoading(false);
          return;
        }

        console.log('Fetching fresh products for:', cacheKey);

        // Имитация запроса к API с уменьшенной задержкой
        await new Promise(resolve => setTimeout(resolve, 300));

        let filteredProducts = [...mockProducts];

        // Фильтрация по категории
        if (options.categoryId) {
          filteredProducts = filteredProducts.filter(
            product => product.category === options.categoryId
          );
        }

        // Фильтрация по бренду
        if (options.brands?.length) {
          filteredProducts = filteredProducts.filter(p =>
            options.brands!.some(b => p.brand.toLowerCase() === b.toLowerCase())
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
            case 'brand-asc':
              filteredProducts.sort((a, b) => a.brand.localeCompare(b.brand));
              break;
            case 'brand-desc':
              filteredProducts.sort((a, b) => b.brand.localeCompare(a.brand));
              break;
          }
        }

        // Сохраняем в кэш
        cache.set(cacheKey, filteredProducts);
        cacheTimestamps.set(cacheKey, now);

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
  }, [options.categoryId, options.searchQuery, options.sortBy, options.brands]);

  return { products, loading, error };
};