import { useState, useEffect, useRef } from 'react';
import { SortOption } from '../../../hooks/useProducts';
import { Category } from '../../../types/product';
import { Brand } from '../../../types/brand';

interface CatalogFiltersProps {
  categories: Category[];
  brands: Brand[];
  selectedCategoryId: string | undefined;
  selectedBrands: string[];
  selectedPriceRange: string;
  searchQuery: string;
  sortBy: SortOption;
  onCategoryChange: (categoryId: string | undefined) => void;
  onBrandsChange: (brands: string[]) => void;
  onPriceRangeChange: (priceRange: string) => void;
  onSearchChange: (searchQuery: string) => void;
  onSortChange: (sortBy: SortOption) => void;
}

const CatalogFilters = ({
  categories,
  brands,
  selectedCategoryId,
  selectedBrands,
  selectedPriceRange,
  searchQuery,
  sortBy,
  onCategoryChange,
  onBrandsChange,
  onPriceRangeChange,
  onSearchChange,
  onSortChange
}: CatalogFiltersProps) => {
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  const brandsDropdownRef = useRef<HTMLDivElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  
  const priceRanges = [
    { value: '', label: 'Любая цена' },
    { value: '0-1000', label: 'До 1 000 ₽' },
    { value: '1000-5000', label: '1 000 - 5 000 ₽' },
    { value: '5000-10000', label: '5 000 - 10 000 ₽' },
    { value: '10000-50000', label: '10 000 - 50 000 ₽' },
    { value: '50000+', label: 'От 50 000 ₽' }
  ];

  const handleBrandChange = (brandName: string, checked: boolean) => {
    if (checked) {
      onBrandsChange([...selectedBrands, brandName]);
    } else {
      onBrandsChange(selectedBrands.filter(brand => brand !== brandName));
    }
  };

  const getBrandsDisplayText = () => {
    if (selectedBrands.length === 0) return 'Выберите бренды';
    if (selectedBrands.length === 1) return selectedBrands[0];
    if (selectedBrands.length <= 2) return selectedBrands.join(', ');
    return `${selectedBrands[0]}, ${selectedBrands[1]} +${selectedBrands.length - 2}`;
  };

  const getCategoryDisplayText = () => {
    if (!selectedCategoryId) return 'Все категории';
    const category = categories.find(cat => cat.id === selectedCategoryId);
    return category ? category.name : 'Все категории';
  };

  const getPriceDisplayText = () => {
    const selectedRange = priceRanges.find(range => range.value === selectedPriceRange);
    return selectedRange ? selectedRange.label : 'Любая цена';
  };

  const getSortDisplayText = () => {
    const sortOptions = {
      'rating-desc': 'По рейтингу',
      'price-asc': 'Цена: по возрастанию',
      'price-desc': 'Цена: по убыванию',
      'brand-asc': 'Бренд: А-Я',
      'brand-desc': 'Бренд: Я-А'
    };
    return sortOptions[sortBy] || 'По рейтингу';
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (brandsDropdownRef.current && !brandsDropdownRef.current.contains(target)) {
        setIsBrandsDropdownOpen(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(target)) {
        setIsCategoriesDropdownOpen(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(target)) {
        setIsPriceDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(target)) {
        setIsSortDropdownOpen(false);
      }
    };

    if (isBrandsDropdownOpen || isCategoriesDropdownOpen || isPriceDropdownOpen || isSortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBrandsDropdownOpen, isCategoriesDropdownOpen, isPriceDropdownOpen, isSortDropdownOpen]);

  return (
    <div className="bg-brand-dark rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-brand-white mb-4">Фильтры</h3>
      
      {/* Поисковая строка наверху */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-brand-light-gray mb-2">
          Поиск
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-brand-mid-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-brand-black/50 border border-brand-mid-gray/20 rounded-xl text-brand-light-gray placeholder-brand-mid-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent focus:outline-none transition-all duration-200"
          />
        </div>
      </div>
      
      {/* Dropdown списки под поиском */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Категории */}
        <div>
          <label className="block text-sm font-medium text-brand-light-gray mb-2">
            Категория
          </label>
          <div className="relative" ref={categoriesDropdownRef}>
            <button
              type="button"
              onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
              className="w-full pl-4 pr-10 py-3 bg-brand-black/50 border border-brand-mid-gray/20 rounded-xl text-brand-light-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent focus:outline-none transition-all duration-200 text-left flex items-center justify-between"
            >
              <span className="truncate">{getCategoryDisplayText()}</span>
              <svg 
                className={`w-5 h-5 text-brand-mid-gray transition-transform duration-200 ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCategoriesDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-brand-black border border-brand-mid-gray/20 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                <div
                  className="px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    onCategoryChange(undefined);
                    setIsCategoriesDropdownOpen(false);
                  }}
                >
                  <span className="text-brand-light-gray">Все категории</span>
                </div>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                    onClick={() => {
                      onCategoryChange(category.id);
                      setIsCategoriesDropdownOpen(false);
                    }}
                  >
                    <span className="text-brand-light-gray">{category.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Бренды */}
        <div>
          <label className="block text-sm font-medium text-brand-light-gray mb-2">
            Бренды
          </label>
          <div className="relative" ref={brandsDropdownRef}>
            <button
              type="button"
              onClick={() => setIsBrandsDropdownOpen(!isBrandsDropdownOpen)}
              className="w-full pl-4 pr-10 py-3 bg-brand-black/50 border border-brand-mid-gray/20 rounded-xl text-brand-light-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent focus:outline-none transition-all duration-200 text-left flex items-center justify-between"
            >
              <span className="truncate">{getBrandsDisplayText()}</span>
              <svg 
                className={`w-5 h-5 text-brand-mid-gray transition-transform duration-200 ${isBrandsDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isBrandsDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-brand-black border border-brand-mid-gray/20 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {brands.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.name)}
                      onChange={(e) => handleBrandChange(brand.name, e.target.checked)}
                      className="w-4 h-4 text-brand-copper bg-brand-black border-brand-mid-gray/30 rounded focus:ring-brand-copper focus:ring-2"
                    />
                    <span className="ml-3 text-brand-light-gray">
                      {brand.name} ({brand.productsCount})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ценовой диапазон */}
        <div>
          <label className="block text-sm font-medium text-brand-light-gray mb-2">
            Цена
          </label>
          <div className="relative" ref={priceDropdownRef}>
            <button
              type="button"
              onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
              className="w-full pl-4 pr-10 py-3 bg-brand-black/50 border border-brand-mid-gray/20 rounded-xl text-brand-light-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent focus:outline-none transition-all duration-200 text-left flex items-center justify-between"
            >
              <span className="truncate">{getPriceDisplayText()}</span>
              <svg 
                className={`w-5 h-5 text-brand-mid-gray transition-transform duration-200 ${isPriceDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isPriceDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-brand-black border border-brand-mid-gray/20 rounded-xl shadow-lg">
                {priceRanges.map((range) => (
                  <div
                    key={range.value}
                    className="px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                    onClick={() => {
                      onPriceRangeChange(range.value);
                      setIsPriceDropdownOpen(false);
                    }}
                  >
                    <span className="text-brand-light-gray">{range.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Сортировка */}
        <div>
          <label className="block text-sm font-medium text-brand-light-gray mb-2">
            Сортировка
          </label>
          <div className="relative" ref={sortDropdownRef}>
            <button
              type="button"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="w-full pl-4 pr-10 py-3 bg-brand-black/50 border border-brand-mid-gray/20 rounded-xl text-brand-light-gray focus:ring-2 focus:ring-brand-copper focus:border-transparent focus:outline-none transition-all duration-200 text-left flex items-center justify-between"
            >
              <span className="truncate">{getSortDisplayText()}</span>
              <svg 
                className={`w-5 h-5 text-brand-mid-gray transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isSortDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-brand-black border border-brand-mid-gray/20 rounded-xl shadow-lg">
                <div
                  className="px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    onSortChange('rating-desc');
                    setIsSortDropdownOpen(false);
                  }}
                >
                  <span className="text-brand-light-gray">По рейтингу</span>
                </div>
                <div
                  className="px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    onSortChange('price-asc');
                    setIsSortDropdownOpen(false);
                  }}
                >
                  <span className="text-brand-light-gray">Цена: по возрастанию</span>
                </div>
                <div
                  className="px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    onSortChange('price-desc');
                    setIsSortDropdownOpen(false);
                  }}
                >
                  <span className="text-brand-light-gray">Цена: по убыванию</span>
                </div>
                <div
                  className="px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    onSortChange('brand-asc');
                    setIsSortDropdownOpen(false);
                  }}
                >
                  <span className="text-brand-light-gray">Бренд: А-Я</span>
                </div>
                <div
                  className="px-4 py-3 hover:bg-brand-dark cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    onSortChange('brand-desc');
                    setIsSortDropdownOpen(false);
                  }}
                >
                  <span className="text-brand-light-gray">Бренд: Я-А</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Отображение выбранных брендов */}
        {selectedBrands.length > 0 && (
          <div className="col-span-full mt-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-brand-light-gray">Выбранные бренды:</span>
              {selectedBrands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-copper/20 text-brand-copper"
                >
                  {brand}
                  <button
                    onClick={() => handleBrandChange(brand, false)}
                    className="ml-2 text-brand-copper hover:text-brand-white transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogFilters; 