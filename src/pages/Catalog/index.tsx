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

  // Восстановление позиции скролла при возврате из товара
  useEffect(() => {
    console.log('Catalog mounted, checking for scroll restore...');

    const shouldRestore = sessionStorage.getItem('fromCatalog') === 'true';
    const scrollPos = sessionStorage.getItem('catalogScrollPosition');
    const alreadyRestored = sessionStorage.getItem('scrollRestored') === 'true';

    if (shouldRestore && scrollPos && !alreadyRestored) {
      console.log('Restoring scroll to:', scrollPos);
      sessionStorage.setItem('scrollRestored', 'true');

      // Попробуем несколько раз с увеличивающимися задержками
      const targetScroll = parseInt(scrollPos);

      const attemptScroll = (attempt = 1) => {
        setTimeout(() => {
          console.log(`Scroll attempt ${attempt}, target: ${targetScroll}, current: ${window.scrollY}`);
          window.scrollTo(0, targetScroll);

          // Проверяем, удалось ли проскроллить
          setTimeout(() => {
            const currentScroll = window.scrollY;
            console.log(`After scroll attempt ${attempt}: current ${currentScroll}, target: ${targetScroll}`);

            // Если не достигли цели и это не последняя попытка
            if (Math.abs(currentScroll - targetScroll) > 100 && attempt < 3) {
              attemptScroll(attempt + 1);
            }
          }, 25);

        }, attempt * 100); // 100ms, 200ms, 300ms - быстрее!
      };

      attemptScroll();
    } else {
      console.log('Skip restore:', { shouldRestore, scrollPos, alreadyRestored });
    }
  }, []);

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
    <div className="bg-brand-black md:px-[5%]">
      <div className="flex flex-col space-y-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-secondary font-bold text-brand-white">
          Каталог товаров
        </h1>
        <p className="text-brand-mid-gray">
          Ознакомьтесь с нашим ассортиментом
        </p>
      </div>

      <div className="mb-6">
        <CatalogSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <CategoryList
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleSelectCategory}
      />

      <ProductList
        products={products}
        loading={productsLoading}
        variant="catalog"
      />
    </div>
  );
};

export default Catalog;