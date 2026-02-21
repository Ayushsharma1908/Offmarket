import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Load user from localStorage on initial load
const loadUserFromStorage = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return { userInfo: JSON.parse(userInfo) };
  }
  return initialState;
};

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;