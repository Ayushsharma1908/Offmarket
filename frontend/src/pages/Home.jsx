import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import CategoriesBanner from '../components/CategoriesBanner';
import ProductCard from '../components/ProductCard';
import { FaArrowRight, FaFire, FaClock, FaTruck } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [dealsProducts, setDealsProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const allProducts = [
        {
          _id: '1',
          name: 'Samsung Galaxy S23 Ultra',
          brand: 'Samsung',
          price: 124999,
          originalPrice: 134999,
          rating: 4.5,
          numReviews: 120,
          images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'],
          countInStock: 10,
          highlights: ['1 Year Warranty', 'Free Delivery']
        },
        {
          _id: '2',
          name: 'Men\'s Casual Shirt',
          brand: 'US Polo',
          price: 1899,
          originalPrice: 2999,
          rating: 4.2,
          numReviews: 85,
          images: ['https://images.unsplash.com/photo-1598033121414-5e17e5b9e6b1?w=400'],
          countInStock: 3,
          highlights: ['Free Delivery', '30 Days Return']
        },
        {
          _id: '3',
          name: 'Apple MacBook Air M2',
          brand: 'Apple',
          price: 114999,
          originalPrice: 129999,
          rating: 4.8,
          numReviews: 250,
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
          countInStock: 5,
          highlights: ['1 Year Warranty', 'Student Discount']
        },
        {
          _id: '4',
          name: 'Noise ColorFit Pro 4',
          brand: 'Noise',
          price: 3999,
          originalPrice: 7999,
          rating: 4.3,
          numReviews: 450,
          images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400'],
          countInStock: 15,
          highlights: ['1 Year Warranty', 'Fast Delivery']
        },
        {
          _id: '5',
          name: 'Nike Air Max 270',
          brand: 'Nike',
          price: 8995,
          originalPrice: 10995,
          rating: 4.6,
          numReviews: 320,
          images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
          countInStock: 0,
          highlights: ['Original', 'Free Delivery']
        },
        {
          _id: '6',
          name: 'The Psychology of Money',
          brand: 'Morgan Housel',
          price: 299,
          originalPrice: 499,
          rating: 4.7,
          numReviews: 890,
          images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'],
          countInStock: 25,
          highlights: ['Best Seller', 'Free Delivery']
        }
      ];
      
      setProducts(allProducts);
      setFeaturedProducts(allProducts.slice(0, 4));
      setDealsProducts(allProducts.filter(p => p.originalPrice).slice(0, 4));
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <HeroBanner />
      <CategoriesBanner />
      
      <div className="container-custom py-8">
        {/* Featured Products Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/featured" className="text-[#2563eb] hover:text-[#1d4ed8] flex items-center gap-1 text-sm font-medium">
              View All <FaArrowRight />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map((item) => (
                <div key={item} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                  <div className="w-full h-48 bg-[#e2e8f0] rounded-xl mb-3"></div>
                  <div className="h-4 bg-[#e2e8f0] rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-[#e2e8f0] rounded w-1/2 mb-3"></div>
                  <div className="h-6 bg-[#e2e8f0] rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Today's Deals Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FaFire className="text-[#f59e0b] text-2xl" />
              <h2 className="section-title mb-0">Today's Hottest Deals</h2>
            </div>
            <Link to="/deals" className="text-[#f59e0b] hover:text-[#d97706] flex items-center gap-1 text-sm font-medium">
              View All Deals <FaArrowRight />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dealsProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-4">
              <FaTruck className="text-[#2563eb] text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Free Delivery</h3>
            <p className="text-[#64748b] text-sm">Free shipping on orders above ₹500</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-4">
              <FaClock className="text-[#10b981] text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">7 Days Return</h3>
            <p className="text-[#64748b] text-sm">Easy returns within 7 days</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#f59e0b]/10 rounded-xl flex items-center justify-center mb-4">
              <FaFire className="text-[#f59e0b] text-xl" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
            <p className="text-[#64748b] text-sm">Price match guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;