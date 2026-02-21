import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-offmarket-dark text-white mt-12">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-offmarket-yellow">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-offmarket-yellow">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-offmarket-yellow">Careers</Link></li>
              <li><Link to="/press" className="hover:text-offmarket-yellow">Press</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4">HELP</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/payments" className="hover:text-offmarket-yellow">Payments</Link></li>
              <li><Link to="/shipping" className="hover:text-offmarket-yellow">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-offmarket-yellow">Returns</Link></li>
              <li><Link to="/faq" className="hover:text-offmarket-yellow">FAQ</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-semibold mb-4">POLICY</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/returns" className="hover:text-offmarket-yellow">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:text-offmarket-yellow">Terms of Use</Link></li>
              <li><Link to="/security" className="hover:text-offmarket-yellow">Security</Link></li>
              <li><Link to="/privacy" className="hover:text-offmarket-yellow">Privacy</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-offmarket-yellow text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-offmarket-yellow text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-offmarket-yellow text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-offmarket-yellow text-2xl">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
          <p>&copy; 2024 Offmarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;