import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBrands } from '../../hooks/useBrands';
import { useProducts, SortOption } from '../../hooks/useProducts';
import ProductList from '../../components/features/ProductList';
import { usePlatformUIControls } from '../../platform';
import { usePlatform } from '../../hooks/usePlatform';
import { ROUTES } from '../../constants/routes';
import { useCategories } from '../../hooks/useCategories';
import CatalogSearch from '../../components/features/CatalogSearch';
import CategoryList from '../../components/features/CategoryList';

const BrandDetail = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const navigate = useNavigate();
  const { getBrandByName } = useBrands();
  const { hideMainButton } = usePlatformUIControls();
  const { isTma } = usePlatform();
  const { categories: allCategories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');
  const [imageError, setImageError] = useState(false);

  const brand = useMemo(() => {
    return brandName ? getBrandByName(brandName) : undefined;
  }, [brandName, getBrandByName]);

  const { products: selectedProducts } = useProducts({
    brands: brand ? [brand.name] : [],
    sortBy
  });

  const handleSelectCategory = (selectedCategoryId: string | undefined) => {
    setSelectedCategoryId(selectedCategoryId);
  };

  const filteredCategories = allCategories.filter(category =>
    selectedProducts.some(product => product.category === category.id)
  );

  const { products, loading: productsLoading } = useProducts({
    brands: brand ? [brand.name] : [],
    categoryId: selectedCategoryId || undefined,
    searchQuery,
    sortBy
  });

  // Скрываем главную кнопку в ТМА
  React.useEffect(() => {
    if (isTma) {
      hideMainButton();
    }
  }, [isTma, hideMainButton]);

  // Если бренд не найден
  if (!brand && brandName) {
    return (
      <div className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤷‍♂️</div>
          <h1 className="text-2xl font-secondary font-bold mb-2">
            Бренд не найден
          </h1>
          <p className="text-brand-mid-gray mb-6">
            Возможно, такого бренда не существует
          </p>
          <button
            onClick={() => navigate(ROUTES.CATALOG)}
            className="bg-brand-copper text-brand-black px-6 py-3 rounded-lg font-medium hover:bg-brand-copper/90 transition-colors duration-200"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-copper"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-black/90 to-brand-black/60 border-b border-brand-mid-gray/20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-brand-mid-gray mb-6">
            <button
              onClick={() => navigate(ROUTES.HOME)}
              className="hover:text-brand-copper transition-colors duration-200"
            >
              Главная
            </button>
            <span>/</span>
            <button
              onClick={() => navigate('/brands')}
              className="hover:text-brand-copper transition-colors duration-200"
            >
              Бренды
            </button>
            <span>/</span>
            <span className="text-brand-white">{brand.name}</span>
          </nav>

          {/* Brand Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              {/* Brand Logo */}
              <div className="w-16 h-16 bg-brand-copper/20 rounded-xl flex items-center justify-center">
                <span className="text-brand-copper font-bold text-2xl">
                  {brand.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-secondary font-bold text-brand-white mb-2">
                  {brand.name}
                </h1>
                <p className="text-brand-mid-gray">
                  {brand.productsCount} товаров • Рейтинг {brand.averageRating}
                </p>
              </div>
            </div>

            {/* Brand Stats */}
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-copper">
                  {brand.productsCount}
                </div>
                <div className="text-sm text-brand-mid-gray">Товаров</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-copper">
                  {brand.averageRating}
                </div>
                <div className="text-sm text-brand-mid-gray">Рейтинг</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-copper">
                  {brand.priceRange.min.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}₽
                </div>
                <div className="text-sm text-brand-mid-gray">От</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Компонент баннера с обработкой ошибок */}
      <div className="mb-6 w-full h-48 rounded-lg overflow-hidden relative">
        {/* Блок с изображением (скроется при ошибке) */}
        <div className={`w-full h-full ${!imageError ? 'block' : 'hidden'}`}>
          <img 
            src={`/banners/${brand.name}.jpg`}
            alt={`Акция ${brand.name}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
        
        {/* Резервный баннер (покажется при ошибке) */}
        {imageError && (
          <div className="w-full h-full bg-gradient-to-r from-brand-copper to-brand-dark-copper">
            <div className="h-full flex items-center justify-between px-6 md:px-10">
              <div className="text-white max-w-md">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Специальное предложение</h2>
                <p className="text-sm md:text-base">Только этой недели скидки до 30% на избранные товары</p>
              </div>
              <button className="bg-white text-brand-copper px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all">
                Подробнее
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-6">
        <CatalogSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2">
      <CategoryList
        categories={filteredCategories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleSelectCategory}
      />
      </div>

      {/* Products */}
      <div className="max-w-fit mx-auto px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-secondary font-bold text-brand-white">
            Товары бренда {brand.name}
          </h2>
          <div className="text-brand-mid-gray">
            {products.length} товаров
          </div>
        </div>

        <ProductList products={products} loading={productsLoading} variant="catalog" />
      </div>
    </div>
  );
};

export default BrandDetail;