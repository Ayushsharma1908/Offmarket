import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200',
    title: 'Big Billion Days',
    subtitle: 'Coming Soon!',
    discount: 'Up to 70% Off',
    color: 'from-[#2563eb] to-[#1d4ed8]'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    title: 'Electronics Sale',
    subtitle: 'Latest Gadgets',
    discount: 'Min 40% Off',
    color: 'from-[#10b981] to-[#059669]'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200',
    title: 'Fashion Fest',
    subtitle: 'Style Up',
    discount: 'Flat 50% Off',
    color: 'from-[#f59e0b] to-[#d97706]'
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden mb-8 rounded-2xl mx-4 md:mx-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-90`}></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              {banner.discount}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight">{banner.title}</h2>
            <p className="text-xl md:text-2xl mb-6 opacity-90">{banner.subtitle}</p>
            <button className="group bg-white text-[#1e293b] px-8 py-3 rounded-xl font-semibold 
                             hover:shadow-lg hover:scale-105 transition-all duration-300
                             flex items-center gap-2">
              Shop Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 
                   w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                   text-white hover:text-[#1e293b] border border-white/30"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40
                   w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                   text-white hover:text-[#1e293b] border border-white/30"
      >
        <FaChevronRight />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;