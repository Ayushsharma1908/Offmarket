import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

const initialState = {
  cartItems: loadCartFromStorage(),
  shippingAddress: {},
  paymentMethod: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        existItem.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }
      
      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((x) => x._id === id);
      if (item) {
        item.qty = qty;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', action.payload);
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  saveShippingAddress,
  savePaymentMethod
} = cartSlice.actions;

export default cartSlice.reducer;