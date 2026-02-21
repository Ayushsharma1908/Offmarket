import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(updateQuantity({ id, qty }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-[#3d71e7] text-white px-6 py-3 rounded-sm hover:bg-blue-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-sm shadow-sm mb-4">
              <div className="flex gap-4">
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="font-medium hover:text-[#3d71e7]">
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                  <p className="text-lg font-bold text-[#3d71e7] mt-2">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <button 
                        className="w-8 h-8 border rounded-sm flex items-center justify-center hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-8 text-center">{item.qty}</span>
                      <button 
                        className="w-8 h-8 border rounded-sm flex items-center justify-center hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                    <button 
                      className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      onClick={() => handleRemove(item._id)}
                    >
                      <FaTrash className="text-sm" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Price Details</h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Price ({cartItems.length} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total Amount</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <Link to="/checkout">
              <button className="w-full bg-[#ffc200] text-[#212121] py-3 rounded-sm font-semibold hover:bg-yellow-500 transition-colors mt-4">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;