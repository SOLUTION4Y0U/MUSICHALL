import { useState, useEffect, useMemo } from 'react';
import { Brand, BrandStats } from '../types/brand';
import { products as mockProducts } from '../api/mock-data';

interface UseBrandsResult {
  brands: Brand[];
  loading: boolean;
  error: string | null;
  brandStats: BrandStats;
  getBrandByName: (name: string) => Brand | undefined;
}

export const useBrands = (): UseBrandsResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const brands = useMemo(() => {
    try {
      // Группируем продукты по брендам
      const brandMap = new Map<string, {
        products: typeof mockProducts;
        totalRating: number;
        minPrice: number;
        maxPrice: number;
      }>();

      mockProducts.forEach(product => {
        const brandName = product.brand;
        if (!brandMap.has(brandName)) {
          brandMap.set(brandName, {
            products: [],
            totalRating: 0,
            minPrice: product.price,
            maxPrice: product.price
          });
        }

        const brandData = brandMap.get(brandName)!;
        brandData.products.push(product);
        brandData.totalRating += product.rating;
        brandData.minPrice = Math.min(brandData.minPrice, product.price);
        brandData.maxPrice = Math.max(brandData.maxPrice, product.price);
      });

      // Преобразуем в массив объектов Brand
      const brandsList: Brand[] = Array.from(brandMap.entries()).map(([name, data]) => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        productsCount: data.products.length,
        averageRating: Number((data.totalRating / data.products.length).toFixed(1)),
        priceRange: {
          min: data.minPrice,
          max: data.maxPrice
        }
      }));

      // Сортируем по количеству товаров (по убыванию)
      return brandsList.sort((a, b) => b.productsCount - a.productsCount);
    } catch (err) {
      console.error('Error processing brands:', err);
      return [];
    }
  }, []);

  const brandStats = useMemo((): BrandStats => ({
    totalBrands: brands.length,
    totalProducts: brands.reduce((sum, brand) => sum + brand.productsCount, 0),
    topBrands: brands.slice(0, 5)
  }), [brands]);

  const getBrandByName = (name: string): Brand | undefined => {
    return brands.find(brand =>
      brand.name.toLowerCase() === name.toLowerCase() ||
      brand.id === name.toLowerCase()
    );
  };

  useEffect(() => {
    // Имитируем загрузку данных
    const timer = setTimeout(() => {
      setLoading(false);
      setError(null);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    brands,
    loading,
    error,
    brandStats,
    getBrandByName
  };
};
