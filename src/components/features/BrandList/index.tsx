import { FC, memo } from 'react';
import { Brand } from '../../../types/brand';
import BrandCard from '../BrandCard';

interface BrandListProps {
  brands: Brand[];
  loading?: boolean;
}

const BrandList: FC<BrandListProps> = memo(({ brands, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-brand-black rounded-xl h-64 w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="text-center py-12 bg-brand-light-gray rounded-lg">
        <div className="text-6xl mb-4">🏷️</div>
        <h3 className="text-xl font-secondary font-bold text-brand-black mb-2">
          Бренды не найдены
        </h3>
        <p className="text-brand-mid-gray">
          Попробуйте изменить параметры поиска
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {brands.map(brand => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
});

BrandList.displayName = 'BrandList';

export default BrandList;