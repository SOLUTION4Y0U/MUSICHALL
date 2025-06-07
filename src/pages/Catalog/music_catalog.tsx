import { useState, useEffect } from 'react';
import ProductListPhilips from '../../components/features/ProductList/product_list_philips';
import CategoryListPhilips from '../../components/features/CategoryList/category_list_philips';
import { useProducts, SortOption } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { usePlatformUIControls } from '../../platform';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import CatalogSearch from '../../components/features/CatalogSearch';


const Music_Catalog = () => {
  const { categories: allCategories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');

  // Получаем все товары Philips без фильтрации по категории
  const { products: philipsProducts } = useProducts({
    brands: ['ON', 'MusicHall'],
    sortBy
  });

  // Фильтруем категории, оставляя только те, у которых есть товары Philips
  const filteredCategories = allCategories.filter(category => 
    philipsProducts.some(product => product.category === category.id)
  );

  // Теперь используем отфильтрованные категории и товары
  const { products, loading: productsLoading } = useProducts({
    categoryId: selectedCategoryId || undefined,
    searchQuery,
    sortBy,
    brands: ['ON', 'MusicHall']
  });

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

      <div className="w-full h-48 bg-brand-light-gray rounded-lg overflow-hidden relative">
        <img 
            src="public/music_main.jpg" 
            alt="Акция" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center px-10">
            <div className="text-white max-w-md">
            <h2 className="text-2xl font-bold mb-2">Новая коллекция</h2>
            <p className="text-base mb-4">Откройте для себя последние новинки</p>
            <button className="bg-brand-bronse text-white px-6 py-2 rounded-full font-medium hover:bg-brand-blue-dark transition-all">
                Смотреть
            </button>
            </div>
        </div>
        </div>

      <CatalogSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <CategoryListPhilips
        categories={filteredCategories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleSelectCategory}
      />

      {/* Альтернативный вариант с 3 колонками на мобильных */}
      <div className="[&_.product-card]:scale-70 md:[&_.product-card]:scale-100 [&_.product-grid]:grid-cols-3 md:[&_.product-grid]:grid-cols-3 lg:[&_.product-grid]:grid-cols-4">
        <ProductListPhilips
          products={products}
          loading={productsLoading}
        />
      </div>
    </div>
  );
};

export default Music_Catalog;