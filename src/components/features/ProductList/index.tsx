import { FC } from 'react';
import { Product } from '../../../types/product';
import ProductCard from '../ProductCard';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
}

const ProductList: FC<ProductListProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-brand-black rounded-lg h-80 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-brand-light-gray rounded-lg">
        <div className="text-6xl mb-4">🎵</div>
        <h3 className="text-xl font-secondary font-bold text-brand-black mb-2">
          Товары не найдены
        </h3>
        <p className="text-brand-mid-gray">
          Попробуйте изменить параметры поиска
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;