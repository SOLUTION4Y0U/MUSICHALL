import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../../../types/brand';
import { getBrandLogo } from '../../../utils/brandLogoMapping';

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: FC<BrandCardProps> = ({ brand }) => {
  const [imageError, setImageError] = useState(false);
  const brandLogo = getBrandLogo(brand.name);
  const hasLogo = brandLogo && !imageError;

  return (
    <Link
      to={`/brands/${brand.id}`}
      className="glass-card group relative block rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Brand Header */}
      <div className="p-6 bg-gradient-to-br from-brand-dark/50 to-brand-dark/10">
        <div className="relative mb-4">
          {hasLogo ? (
            // Brand Logo - Centered
            <div className="flex justify-center mb-4">
              <div className="w-25 h-20 flex items-center justify-center p-2">
                <img
                  src={brandLogo}
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-contain"
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          ) : (
            // Brand Logo Placeholder - Left (fallback)
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-brand-copper/20 rounded-lg flex items-center justify-center">
              <span className="text-brand-copper font-bold text-lg">
                {brand.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Brand Name - Only show when no logo */}
          {!hasLogo && (
            <h3 className="text-xl text-center font-secondary font-bold text-brand-copper group-hover:text-brand-white transition-colors duration-300">
              {brand.name}
            </h3>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-white">
              {brand.categoriesCount}
            </div>
            <div className="text-sm text-brand-mid-gray">
              Категорий
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-white">
              {brand.productsCount}
            </div>
            <div className="text-sm text-brand-mid-gray">
              Товаров
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="border-t border-brand-mid-gray/20 pt-4">
          <div className="text-sm text-brand-mid-gray mb-1">Диапазон цен</div>
          <div className="flex items-center justify-between">
            <span className="text-brand-white font-medium">
              {brand.priceRange.min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽
            </span>
            <span className="text-brand-mid-gray">—</span>
            <span className="text-brand-white font-medium">
              {brand.priceRange.max.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽
            </span>
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 bg-brand-copper rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;