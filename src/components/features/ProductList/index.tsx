import { FC } from 'react';
import ProductCard from '../ProductCard';
import { Product } from '../../../types/product';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  error?: string;
}

const ProductList: FC<ProductListProps> = ({ products, loading, error }) => {
  if (loading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="empty-products">Товары не найдены</div>;
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;