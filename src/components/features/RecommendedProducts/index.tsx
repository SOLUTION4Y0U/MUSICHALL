import { FC, useEffect, useState } from 'react';
import { Product } from '../../../types/product';
import ProductList from '../ProductList';
import { products as mockProducts } from '../../../api/mock-data';

interface RecommendedProductsProps {
  currentProductId: string;
  categoryId: string;
  limit?: number;
}

const RecommendedProducts: FC<RecommendedProductsProps> = ({
  currentProductId,
  categoryId,
  limit = 5
}) => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      setLoading(true);

      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Находим похожие товары из той же категории
      const sameCategoryProducts = mockProducts
        .filter(p => p.id !== currentProductId && p.category === categoryId)
        .slice(0, limit);

      // Если недостаточно товаров из той же категории, добавляем случайные
      let otherProducts: Product[] = [];
      if (sameCategoryProducts.length < limit) {
        otherProducts = mockProducts
          .filter(p => p.id !== currentProductId && p.category !== categoryId)
          .slice(0, limit - sameCategoryProducts.length);
      }

      setRecommendedProducts([...sameCategoryProducts, ...otherProducts]);
      setLoading(false);
    };

    fetchRecommendedProducts();
  }, [currentProductId, categoryId, limit]);

  if (loading) {
    return <div className="recommended-loading">Загружаем рекомендации...</div>;
  }

  if (recommendedProducts.length === 0) {
    return null; // Ничего не показываем, если нет рекомендаций
  }

  return (
    <div className="recommended-products">
      <h2>Вам также может понравиться</h2>
      <ProductList products={recommendedProducts} />
    </div>
  );
};

export default RecommendedProducts;