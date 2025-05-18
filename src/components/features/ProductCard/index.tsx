import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/product';
import { useCartStore } from '../../../store/cart';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { id, title, price, discountPercentage, thumbnail, rating } = product;
  const { isInCart, addToCart } = useCartStore();
  const inCart = isInCart(id);

  // Рассчитываем цену со скидкой, если скидка указана
  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage / 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке при клике на кнопку
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-card-link">
        <div className="product-card-image">
          <img src={thumbnail} alt={title} />
          {discountPercentage && (
            <span className="discount-badge">-{discountPercentage}%</span>
          )}
          {inCart && (
            <span className="cart-badge">В корзине</span>
          )}
        </div>
        <div className="product-card-content">
          <h3 className="product-title">{title}</h3>
          <div className="product-price">
            {discountedPrice ? (
              <>
                <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
                <span className="original-price">${price.toFixed(2)}</span>
              </>
            ) : (
              <span>${price.toFixed(2)}</span>
            )}
          </div>
          <div className="product-rating">
            <span className="rating-stars">{'★'.repeat(Math.round(rating))}</span>
            <span className="rating-value">{rating}</span>
          </div>
          <button
            className="product-add-to-cart"
            onClick={handleAddToCart}
          >
            {inCart ? 'Добавить еще' : 'В корзину'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;