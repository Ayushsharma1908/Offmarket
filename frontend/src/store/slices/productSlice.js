import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: '',
    sortBy: 'popularity',
    searchQuery: ''
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: '',
        sortBy: 'popularity',
        searchQuery: ''
      };
    }
  },
});

export const { 
  setProducts, 
  setSelectedProduct, 
  setLoading, 
  setError, 
  setFilters, 
  clearFilters 
} = productSlice.actions;

export default productSlice.reducer;