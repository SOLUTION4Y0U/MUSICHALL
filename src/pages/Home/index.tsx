import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import ProductList from '../../components/features/ProductList';
import './Home.css';

const Home = () => {
  const { categories } = useCategories();
  const { products, loading } = useProducts({ sortBy: 'rating-desc' });

  // Берем только первые 4 продукта для секции популярных товаров
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Добро пожаловать в Marketplace</h1>
          <p>Найдите лучшие товары по выгодным ценам</p>
          <Link to={ROUTES.CATALOG} className="button">
            Перейти в каталог
          </Link>
        </div>
      </section>

      <section className="categories-section">
        <h2>Популярные категории</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`${ROUTES.CATALOG}`}
              className="category-card"
              onClick={(_) => {
                // Сохраняем выбранную категорию в localStorage для использования в каталоге
                localStorage.setItem('selectedCategoryId', category.id);
              }}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-products-section">
        <h2>Популярные товары</h2>
        <ProductList products={featuredProducts} loading={loading} />
        <div className="view-all-link">
          <Link to={ROUTES.CATALOG}>Посмотреть все товары &rarr;</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;