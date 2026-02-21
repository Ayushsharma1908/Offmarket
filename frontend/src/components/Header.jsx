import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../assets/logo.svg";
import {
  FaSearch,
  FaShoppingBag,
  FaUser,
  FaBars,
  FaTimes,
  FaHeart,
  FaTruck,
  FaPercent,
} from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useSelector((state) => state.cart || { cartItems: [] });
  const { userInfo } = useSelector((state) => state.auth || {});

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-end space-x-6 py-2 text-xs text-[#64748b] border-b border-[#e2e8f0]">
          <div className="flex items-center gap-1">
            <FaTruck className="text-[#2563eb]" />
            <span>Free Shipping on ₹500+</span>
          </div>
          <div className="flex items-center gap-1">
            <FaPercent className="text-[#f59e0b]" />
            <span>First Order 10% Off</span>
          </div>
          <div className="flex items-center gap-1">
            <FaHeart className="text-[#ef4444]" />
            <span>Wishlist</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 group">
            <img
              src={Logo}
              alt="Offmarket Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#1e293b] tracking-tight">
                Off<span className="text-[#f59e0b]">market</span>
              </span>
              <span className="text-[10px] text-[#64748b] -mt-1">
                Smart Finds, Better Prices
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="w-full relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e2e8f0] 
                         focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]
                         transition-all duration-200 bg-white shadow-sm"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#2563eb] transition-colors" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f8fafc] px-4 py-1.5 rounded-lg text-sm font-medium text-[#1e293b] hover:bg-[#e2e8f0] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <button className="md:hidden p-2 hover:bg-[#f8fafc] rounded-lg transition-colors">
              <FaSearch className="text-[#1e293b] text-xl" />
            </button>

            {/* User Menu */}
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-[#f8fafc] rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {userInfo.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {userInfo.name.split(" ")[0]}
                  </span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#e2e8f0] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-[#f8fafc] text-sm"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-[#f8fafc] text-sm"
                  >
                    Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 hover:bg-[#f8fafc] text-sm"
                  >
                    Wishlist
                  </Link>
                  <hr className="my-1 border-[#e2e8f0]" />
                  <button className="block w-full text-left px-4 py-2 hover:bg-[#f8fafc] text-sm text-[#ef4444]">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#f8fafc] rounded-lg hover:bg-[#e2e8f0] transition-colors"
              >
                <FaUser className="text-[#64748b]" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-[#f8fafc] rounded-lg transition-colors group"
            >
              <FaShoppingBag className="text-xl text-[#1e293b] group-hover:text-[#2563eb] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f59e0b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 py-3 border-t border-[#e2e8f0]">
          <Link
            to="/category/electronics"
            className="text-[#64748b] hover:text-[#2563eb] transition-colors text-sm font-medium"
          >
            Electronics
          </Link>
          <Link
            to="/category/fashion"
            className="text-[#64748b] hover:text-[#2563eb] transition-colors text-sm font-medium"
          >
            Fashion
          </Link>
          <Link
            to="/category/home"
            className="text-[#64748b] hover:text-[#2563eb] transition-colors text-sm font-medium"
          >
            Home & Living
          </Link>
          <Link
            to="/category/beauty"
            className="text-[#64748b] hover:text-[#2563eb] transition-colors text-sm font-medium"
          >
            Beauty
          </Link>
          <Link
            to="/category/books"
            className="text-[#64748b] hover:text-[#2563eb] transition-colors text-sm font-medium"
          >
            Books
          </Link>
          <Link
            to="/category/sports"
            className="text-[#64748b] hover:text-[#2563eb] transition-colors text-sm font-medium"
          >
            Sports
          </Link>
          <Link
            to="/offers"
            className="text-sm text-[#f59e0b] font-medium hover:text-[#d97706] transition-colors ml-auto"
          >
            🔥 Today's Deals
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#e2e8f0]">
            <div className="flex flex-col space-y-3">
              <Link
                to="/category/electronics"
                className="px-2 py-1.5 hover:bg-[#f8fafc] rounded-lg"
              >
                Electronics
              </Link>
              <Link
                to="/category/fashion"
                className="px-2 py-1.5 hover:bg-[#f8fafc] rounded-lg"
              >
                Fashion
              </Link>
              <Link
                to="/category/home"
                className="px-2 py-1.5 hover:bg-[#f8fafc] rounded-lg"
              >
                Home & Living
              </Link>
              <Link
                to="/category/beauty"
                className="px-2 py-1.5 hover:bg-[#f8fafc] rounded-lg"
              >
                Beauty
              </Link>
              <Link
                to="/category/books"
                className="px-2 py-1.5 hover:bg-[#f8fafc] rounded-lg"
              >
                Books
              </Link>
              <Link
                to="/offers"
                className="px-2 py-1.5 text-[#f59e0b] font-medium"
              >
                🔥 Today's Deals
              </Link>

              {!userInfo && (
                <Link to="/login" className="btn-primary text-center mt-2">
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
