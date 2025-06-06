import { FC } from 'react';
import { Product } from '../../../types/product';
import { usePlatformUIControls } from '../../../platform';
import { useCartStore } from '../../../store/cart';

interface ProductInfoProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const { showAlert } = usePlatformUIControls();
  const { addToCart, isInCart, getCartItemById } = useCartStore();

  const cartItem = getCartItemById(product.id);
  const inCart = isInCart(product.id);

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
  } = product;

  // Рассчитываем цену со скидкой если скидка указана
  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage / 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, 1);
    showAlert('Товар добавлен в корзину');
  };

  return (
    <div className="product-info">
      <h1 className="product-info-title">{title}</h1>

      <div className="product-info-meta">
        <div className="product-brand">Бренд: <span>{brand}</span></div>
        <div className="product-rating">
          <span className="rating-stars">{'★'.repeat(Math.round(rating))}</span>
          <span className="rating-value">{rating}</span>
        </div>
      </div>

      <div className="product-info-price">
        {discountedPrice ? (
          <>
            <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
            <span className="original-price">${price.toFixed(2)}</span>
            <span className="discount-badge">-{discountPercentage}%</span>
          </>
        ) : (
          <span className="price">${price.toFixed(2)}</span>
        )}
      </div>

      <div className="product-stock">
        {stock > 0 ? (
          <span className="in-stock">В наличии: {stock} шт.</span>
        ) : (
          <span className="out-of-stock">Нет в наличии</span>
        )}

        {inCart && (
          <span className="in-cart">В корзине: {cartItem?.quantity} шт.</span>
        )}
      </div>

      <div className="product-description">
        <h3>Описание</h3>
        <p>{description}</p>
      </div>

      <div className="product-actions">
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={stock <= 0}
        >
          {inCart ? 'Добавить еще' : 'Добавить в корзину'}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;