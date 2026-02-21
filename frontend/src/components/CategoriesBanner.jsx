import { Link } from 'react-router-dom';
import { 
  FaMobileAlt, 
  FaLaptop, 
  FaTshirt, 
  FaHome, 
  FaBook, 
  FaFutbol,
  FaClock,
  FaGem 
} from 'react-icons/fa';

const categories = [
  { name: 'Mobiles', icon: FaMobileAlt, color: 'bg-blue-100', link: '/category/mobiles' },
  { name: 'Laptops', icon: FaLaptop, color: 'bg-purple-100', link: '/category/laptops' },
  { name: 'Fashion', icon: FaTshirt, color: 'bg-pink-100', link: '/category/fashion' },
  { name: 'Home', icon: FaHome, color: 'bg-green-100', link: '/category/home' },
  { name: 'Books', icon: FaBook, color: 'bg-yellow-100', link: '/category/books' },
  { name: 'Sports', icon: FaFutbol, color: 'bg-orange-100', link: '/category/sports' },
  { name: 'Watches', icon: FaClock, color: 'bg-indigo-100', link: '/category/watches' },
  { name: 'Jewelry', icon: FaGem, color: 'bg-red-100', link: '/category/jewelry' },
];

const CategoriesBanner = () => {
  return (
    <div className="bg-white shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 py-4">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={category.link}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <category.icon className="text-[#3d71e7] text-xl" />
              </div>
              <span className="text-xs mt-1 text-gray-700 group-hover:text-[#3d71e7] font-medium">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesBanner;