import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Simulate registration (replace with actual API call)
    if (name && email && password) {
      dispatch(setCredentials({
        name: name,
        email: email,
        isAdmin: false
      }));
      toast.success('Registration successful!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-sm shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
              required
            />
          </div>
          
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
              minLength={6}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-[#3d71e7]"
              required
              minLength={6}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-[#3d71e7] text-white py-3 rounded-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
        
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#3d71e7] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;