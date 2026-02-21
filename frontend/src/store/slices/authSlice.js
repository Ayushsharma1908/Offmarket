import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage on initial load
const loadInitialState = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return { userInfo: JSON.parse(userInfo), loading: false, error: null };
    }
  } catch {
    // ignore parse errors
  }
  return { userInfo: null, loading: false, error: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Persist full userInfo (including token) to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      // Also persist token separately for the axios interceptor
      if (action.payload?.token) {
        localStorage.setItem('token', action.payload.token);
      }
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;