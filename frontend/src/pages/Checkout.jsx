import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userInfo) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    // Simulate order placement (replace with actual API call)
    toast.success('Order placed successfully!');
    navigate('/');
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#ffc200] text-[#212121] py-3 rounded-sm font-semibold hover:bg-yellow-500 transition-colors mt-4"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">{item.name} x {item.qty}</span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
            
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;