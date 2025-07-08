import React, { useState, useMemo } from 'react';
import { useBrands } from '../../hooks/useBrands';
import BrandList from '../../components/features/BrandList';
import { usePlatformUIControls } from '../../platform';
import { usePlatform } from '../../hooks/usePlatform';

const BrandsList = () => {
  const { brands, loading, brandStats } = useBrands();
  const [searchQuery, setSearchQuery] = useState('');
  const { hideMainButton } = usePlatformUIControls();
  const { isTma } = usePlatform();

  // Фильтруем бренды по поисковому запросу
  const filteredBrands = useMemo(() => {
    if (!searchQuery) return brands;

    const query = searchQuery.toLowerCase();
    return brands.filter(brand =>
      brand.name.toLowerCase().includes(query)
    );
  }, [brands, searchQuery]);

  // Скрываем главную кнопку в ТМА
  React.useEffect(() => {
    if (isTma) {
      hideMainButton();
    }
  }, [isTma, hideMainButton]);

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-brand-mid-gray/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4">
            <div>
              <h1 className="text-3xl font-secondary font-bold text-brand-white">
                Наши бренды
              </h1>
              <p className="text-brand-mid-gray">
                {brandStats.totalBrands} брендов • {brandStats.totalProducts} товаров
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по брендам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-brand-black/50 border border-brand-mid-gray/20 rounded-xl text-brand-white placeholder-brand-mid-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent focus:outline-none transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-brand-mid-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-brand-copper mb-2">
              {brandStats.totalBrands}
            </div>
            <div className="text-brand-mid-gray">Брендов</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-brand-copper mb-2">
              {brandStats.totalProducts}
            </div>
            <div className="text-brand-mid-gray">Товаров</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-brand-copper mb-2">
              {brandStats.topBrands.length > 0 ? brandStats.topBrands[0].averageRating : 0}
            </div>
            <div className="text-brand-mid-gray">Высший рейтинг</div>
          </div>
        </div>

        {/* Results count */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-brand-mid-gray">
              Найдено брендов: {filteredBrands.length}
            </p>
          </div>
        )}

        {/* Brands List */}
        <BrandList brands={filteredBrands} loading={loading} />
      </div>
    </div>
  );
};

export default BrandsList;