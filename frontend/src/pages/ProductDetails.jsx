import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaStar, FaStarHalfAlt, FaRegStar, FaMinus, FaPlus, FaShoppingCart, FaBolt } from 'react-icons/fa';
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample product data (replace with API call)
  useEffect(() => {
    setTimeout(() => {
      setProduct({
        _id: id,
        name: 'Samsung Galaxy S23 Ultra',
        brand: 'Samsung',
        description: 'Experience the ultimate smartphone with 200MP camera, Snapdragon 8 Gen 2 processor, and 5000mAh battery. The Galaxy S23 Ultra sets new standards for mobile photography and performance.',
        price: 124999,
        originalPrice: 134999,
        rating: 4.5,
        numReviews: 120,
        images: [
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&angle=90',
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&angle=180',
          'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&angle=270'
        ],
        countInStock: 10,
        highlights: [
          '1 Year Warranty',
          'Free Delivery',
          '7 Days Replacement',
          'Bank Offer: 10% off on Credit Cards'
        ],
        specifications: {
          'Display': '6.8-inch Dynamic AMOLED 2X',
          'Processor': 'Snapdragon 8 Gen 2',
          'RAM': '12GB',
          'Storage': '256GB',
          'Camera': '200MP + 12MP + 10MP + 10MP',
          'Battery': '5000mAh',
          'OS': 'Android 13'
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="bg-white p-8 rounded-sm shadow-sm animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 w-3/4"></div>
              <div className="h-4 bg-gray-200 w-1/2"></div>
              <div className="h-6 bg-gray-200 w-1/3"></div>
              <div className="h-24 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="bg-white rounded-sm shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="mb-4 border rounded-sm p-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`border-2 rounded-sm p-1 ${
                    selectedImage === index ? 'border-offmarket-blue' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-16 h-16 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.brand}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
                {product.rating} <FaStar className="text-white text-xs" />
              </span>
              <span className="text-gray-500">
                {product.numReviews} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-3xl font-bold text-offmarket-blue">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through ml-3">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-green-600 ml-3">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            {/* Highlights */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Highlights</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-gray-600">{highlight}</li>
                ))}
              </ul>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-2">
                <button 
                  className="w-8 h-8 border rounded-sm flex items-center justify-center hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <FaMinus className="text-xs" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button 
                  className="w-8 h-8 border rounded-sm flex items-center justify-center hover:bg-gray-100"
                  onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                >
                  <FaPlus className="text-xs" />
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  {product.countInStock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-yellow flex items-center justify-center gap-2 py-3"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"
              >
                <FaBolt />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="border-t p-6">
          <h2 className="text-xl font-bold mb-4">Specifications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b pb-2">
                <span className="w-1/3 text-gray-600">{key}</span>
                <span className="w-2/3 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;