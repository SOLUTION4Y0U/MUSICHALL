import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/product';
import { useCartStore } from '../../../store/cart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart } = useCartStore();
  const navigate = useNavigate();
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleProductClick = () => {
    // Сохраняем позицию скролла только если мы в каталоге
    const currentPath = window.location.hash.slice(1) || window.location.pathname;
    if (currentPath === '/catalog' || currentPath.startsWith('/catalog')) {
      sessionStorage.setItem('catalogScrollPosition', window.scrollY.toString());
      sessionStorage.setItem('fromCatalog', 'true');
    }
    navigate(`/product/${product.id}`);
  };

  const discountedPrice = product.discountPercentage
    ? product.price - (product.price * product.discountPercentage / 100)
    : null;

  return (
    <div
      onClick={handleProductClick}
      className="glass-card group relative block rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Discount Badge */}
      {product.discountPercentage && (
        <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm font-bold z-10 shadow-md">
          -{product.discountPercentage}%
        </div>
      )}

      {/* In Cart Badge */}
      {inCart && (
        <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white p-2 rounded-full z-10 shadow-md">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Image Container */}
      <div className="aspect-[3/4] bg-brand-light-gray/10 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gradient-to-b from-black/60 to-transparent">
        <h3 className="font-medium text-sm sm:text-lg text-brand-white group-hover:text-brand-copper transition-colors duration-300 line-clamp-2">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-400/50'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-brand-mid-gray/80">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {discountedPrice ? (
            <>
              <span className="text-lg sm:text-xl font-bold text-brand-copper">
                {discountedPrice
                  ? discountedPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  : product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </span>
              <span className="text-sm sm:text-xl text-brand-mid-gray/80 line-through">
                  {product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                </span>
            </>
          ) : (
            <span className="text-lg sm:text-xl font-bold text-brand-copper">
              {product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-md font-medium transition-all duration-300 mt-2 ${
            product.stock === 0
              ? 'bg-gray-500/30 text-gray-400 cursor-not-allowed'
              : inCart
                ? 'bg-green-500/90 backdrop-blur-sm text-white hover:bg-green-600/90'
                : 'bg-brand-copper/90 backdrop-blur-sm text-white hover:bg-brand-dark-copper'
          }`}
        >
          {product.stock === 0
            ? 'Нет в наличии'
            : inCart
              ? 'В корзине'
              : 'В корзину'
          }
        </button>
      </div>
    </div>
  );
};

export default ProductCard;