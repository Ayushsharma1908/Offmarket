import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaEye, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('Added to cart!', {
      icon: '🛍️',
      style: {
        borderRadius: '10px',
        background: '#1e293b',
        color: '#fff',
      },
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: '❤️',
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden bg-[#f8fafc] p-3 sm:p-4">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-36 sm:h-48 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Action Buttons - Hidden on mobile, show on hover for desktop */}
          <div className={`hidden sm:flex absolute top-3 right-3 flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <button 
              onClick={handleWishlist}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center
                       hover:bg-[#f59e0b] hover:text-white transition-all duration-200"
            >
              <FaHeart className={isWishlisted ? 'text-[#ef4444]' : 'text-sm sm:text-base'} />
            </button>
            <button 
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center
                       hover:bg-[#2563eb] hover:text-white transition-all duration-200"
            >
              <FaEye className="text-sm sm:text-base" />
            </button>
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-[#ef4444] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold shadow-lg">
              -{discount}%
            </span>
          )}

          {/* Stock Status */}
          {product.countInStock < 5 && product.countInStock > 0 && (
            <span className="absolute bottom-3 left-3 bg-[#f59e0b] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-lg">
              Only {product.countInStock} left!
            </span>
          )}
          {product.countInStock === 0 && (
            <span className="absolute bottom-3 left-3 bg-[#64748b] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-lg">
              Out of Stock
            </span>
          )}
        </div>

        <div className="p-3 sm:p-4">
          {/* Brand */}
          <p className="text-[10px] sm:text-xs text-[#64748b] mb-1 truncate">{product.brand}</p>
          
          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-semibold text-[#1e293b] mb-2 line-clamp-2 h-8 sm:h-10">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar 
                  key={star}
                  className={`${
                    star <= Math.floor(product.rating) 
                      ? 'text-[#f59e0b]' 
                      : star === Math.ceil(product.rating) && product.rating % 1 !== 0
                      ? 'text-[#f59e0b]'
                      : 'text-[#cbd5e1]'
                  } text-[10px] sm:text-xs`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs text-[#64748b]">({product.numReviews})</span>
          </div>

          {/* Price Section - Redesigned for mobile */}
          <div className="mb-3 sm:mb-4">
            {/* Discounted Price - Large and Bold */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-2xl font-bold text-[#1e293b]">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-[#64748b] line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            {/* Discount Percentage - Small hint */}
            {discount > 0 && (
              <span className="text-[10px] sm:text-xs text-[#10b981] font-medium mt-0.5 block">
                You save ₹{(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          {/* Highlights */}
          {product.highlights && (
            <div className="mb-3 sm:mb-4 flex flex-wrap gap-1">
              {product.highlights.slice(0, 2).map((highlight, index) => (
                <span key={index} className="bg-[#2563eb]/10 text-[#2563eb] px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-xs">
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Add to Cart Button - Full width on mobile */}
          {product.countInStock > 0 && (
            <button 
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-[#2563eb] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium
                       hover:bg-[#1d4ed8] transition-all duration-200
                       shadow-[0_2px_4px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_8px_rgba(37,99,235,0.3)]
                       active:scale-95 flex items-center justify-center gap-1 sm:gap-2"
            >
              <FaShoppingCart className="text-xs sm:text-sm" />
              <span>Add to Cart</span>
            </button>
          )}

          {/* Out of Stock Message */}
          {product.countInStock === 0 && (
            <button 
              disabled
              className="w-full sm:w-auto bg-[#64748b] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium opacity-50 cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;