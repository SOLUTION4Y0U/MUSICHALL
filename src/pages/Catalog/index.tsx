import { useState, useEffect } from 'react';
import ProductList from '../../components/features/ProductList';
import CategoryList from '../../components/features/CategoryList';
import { useProducts, SortOption } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { usePlatformUIControls } from '../../platform';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import CatalogSearch from '../../components/features/CatalogSearch';



const Catalog = () => {
  const { categories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');

  const { products, loading: productsLoading } = useProducts({
    categoryId: selectedCategoryId || undefined,
    searchQuery,
    sortBy
  });
  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };
  const { showMainButton, hideMainButton } = usePlatformUIControls();
  const navigate = useNavigate();

  useEffect(() => {
    // Показываем MainButton для TMA
    if (products.length > 0) {
      showMainButton('Перейти в корзину', () => {
        navigate(ROUTES.CART);
      });
    } else {
      hideMainButton();
    }

    return () => {
      hideMainButton();
    };
  }, [products, showMainButton, hideMainButton, navigate]);

  const handleSelectCategory = (selectedCategoryId: string | undefined) => {
    setSelectedCategoryId(selectedCategoryId);
  };

  return (
    <div className="space-y-6 bg-brand-black">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl md:text-3xl font-secondary font-bold text-brand-white">
          Каталог товаров
        </h1>
        <p className="text-brand-mid-gray">
          Ознакомьтесь с нашим ассортиментом
        </p>
      </div>

      {/* Горизонтальный баннер */}
        <div className="w-full h-32 md:h-48 bg-gradient-to-r from-brand-copper to-brand-dark-copper rounded-lg overflow-hidden">
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

      <CatalogSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      <CategoryList
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleSelectCategory}
      />

      {/* Альтернативный вариант с 3 колонками на мобильных */}
      <div className="[&_.product-card]:scale-70 md:[&_.product-card]:scale-100 [&_.product-grid]:grid-cols-3 md:[&_.product-grid]:grid-cols-3 lg:[&_.product-grid]:grid-cols-4">
        <ProductList
          products={products}
          loading={productsLoading}
        />
      </div>
    </div>
  );
};

export default Catalog;