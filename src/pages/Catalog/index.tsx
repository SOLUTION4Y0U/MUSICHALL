import { useState, useEffect } from 'react';
import ProductList from '../../components/features/ProductList';
import CategoryList from '../../components/features/CategoryList';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import './Catalog.css';
import { usePlatformUIControls } from '../../platform';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

type SortOption = 'price-asc' | 'price-desc' | 'rating-desc';

const Catalog = () => {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');

  const { products, loading: productsLoading, error: productsError } = useProducts({
    categoryId,
    searchQuery,
    sortBy
  });

  const { categories, loading: categoriesLoading } = useCategories();

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption);
  };

  const handleSelectCategory = (selectedCategoryId: string | undefined) => {
    setCategoryId(selectedCategoryId);
  };

  return (
    <div className="catalog-page">
      <h1>Каталог товаров</h1>
      <p className="catalog-description">Найдите то, что ищете в нашем широком каталоге товаров</p>

      {!categoriesLoading && categories.length > 0 && (
        <CategoryList
          categories={categories}
          selectedCategoryId={categoryId}
          onSelectCategory={handleSelectCategory}
        />
      )}

      <div className="catalog-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <select value={sortBy} onChange={handleSortChange} className="sort-select">
            <option value="rating-desc">По популярности</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
          </select>
        </div>
      </div>

      <ProductList
        products={products}
        loading={productsLoading}
        error={productsError || undefined}
      />
    </div>
  );
};

export default Catalog;