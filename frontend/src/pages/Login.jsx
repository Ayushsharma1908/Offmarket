import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate login (replace with actual API call)
    if (email && password) {
      dispatch(setCredentials({
        name: 'Test User',
        email: email,
        isAdmin: false
      }));
      toast.success('Logged in successfully!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-sm shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Login to Offmarket</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-[#3d71e7] text-white py-3 rounded-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
        
        <p className="text-center mt-4 text-sm text-gray-600">
          New to Offmarket?{' '}
          <Link to="/register" className="text-[#3d71e7] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;