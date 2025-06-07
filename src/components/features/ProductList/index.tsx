import { FC, memo } from 'react';
import { Product } from '../../../types/product';
import ProductCard from '../ProductCard';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  variant?: 'default' | 'compact';
}

const ProductList: FC<ProductListProps> = memo(({ products, loading, variant = 'default' }) => {
  const isCompact = variant === 'compact';

  if (loading) {
    return (
      <div className={isCompact
        ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-0 gap-y-0 sm:gap-6"
        : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      }>
        {[...Array(8)].map((_, index) => (
          <div key={index} className={isCompact
            ? "animate-pulse scale-90 sm:scale-100 -mb-2 sm:mb-0"
            : "animate-pulse"
          }>
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
    <div className={isCompact
      ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-0 gap-y-0 sm:gap-6"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    }>
      {products.map(product => (
        <div key={product.id} className={isCompact
          ? "scale-90 sm:scale-100 transform transition-transform -mb-2 sm:mb-0"
          : ""
        }>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;