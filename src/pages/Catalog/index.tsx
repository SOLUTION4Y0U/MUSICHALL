import { useState, useEffect } from 'react';
import ProductList from '../../components/features/ProductList';
import CategoryList from '../../components/features/CategoryList';
import { useProducts, SortOption } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { usePlatformUIControls } from '../../platform';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { usePlatform } from '../../hooks/usePlatform';
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

  const { showMainButton, hideMainButton, navigateTo } = usePlatformUIControls();
  const navigate = useNavigate();
  const { isTma } = usePlatform();

  useEffect(() => {
    // Показываем MainButton для TMA
    if (products.length > 0) {
      showMainButton('Перейти в корзину', () => {
        if (isTma) {
          navigateTo(ROUTES.CART);
        } else {
          navigate(ROUTES.CART);
        }
      });
    } else {
      hideMainButton();
    }

    return () => {
      hideMainButton();
    };
  }, [products, showMainButton, hideMainButton, navigate, navigateTo, isTma]);

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

      <CatalogSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <CategoryList
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleSelectCategory}
      />

      <ProductList
        products={products}
        loading={productsLoading}
        variant="compact"
      />
    </div>
  );
};

export default Catalog;