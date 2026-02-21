import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import registerIllustration from '../assets/registerillus.svg'; // Reuse the same illustration

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#ef4444',
          color: '#fff',
        },
      });
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters!', {
        icon: '🔒',
      });
      return;
    }

    if (!agreeTerms) {
      toast.error('Please agree to the Terms & Conditions', {
        icon: '📝',
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration API call
    setTimeout(() => {
      if (name && email && password) {
        dispatch(setCredentials({
          name: name,
          email: email,
          isAdmin: false
        }));
        toast.success('Account created successfully!', {
          icon: '🎉',
          style: {
            borderRadius: '10px',
            background: '#10b981',
            color: '#fff',
          },
        });
        navigate('/');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    // Simulate Google Sign-Up
    setTimeout(() => {
      dispatch(
        setCredentials({
          name: "Google User",
          email: "user@gmail.com",
          isAdmin: false,
        }),
      );
      toast.success("Signed up with Google!", {
        icon: "🌐",
      });
      navigate("/");
      setIsLoading(false);
    }, 1500);
  };

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return null;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    const strengths = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#ef4444', '#f97316', '#eab308', '#10b981', '#2563eb'];
    
    return {
      text: strengths[strength - 1] || 'Very Weak',
      color: colors[strength - 1] || '#ef4444',
      width: `${strength * 20}%`
    };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Illustration */}
        <div className="hidden md:block relative">
          <div className="relative z-10">
            <img
              src={registerIllustration}
              alt="Shopping illustration"
              className="w-full h-auto animate-float"
            />
            
          </div>

          {/* Background Decoration */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-72 h-72 bg-[#10b981]/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#2563eb]/5 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Right Side - Register Form */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e293b]">
              Create Account
            </h2>
            <p className="text-[#64748b] text-sm mt-1">
              Join Offmarket and start shopping
            </p>
          </div>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full bg-white border-2 border-[#e2e8f0] hover:bg-[#f8fafc] 
                     text-[#1e293b] py-3 px-4 rounded-xl font-medium 
                     transition-all duration-200 flex items-center justify-center gap-3 mb-4
                     hover:border-[#10b981] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-[#DB4437]" />
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2e8f0]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#64748b]">or sign up with email</span>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-[#94a3b8] text-sm" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#e2e8f0] rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]
                           transition-all duration-200 bg-white text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-[#94a3b8] text-sm" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#e2e8f0] rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]
                           transition-all duration-200 bg-white text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-[#94a3b8] text-sm" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-[#e2e8f0] rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981]
                           transition-all duration-200 bg-white text-sm"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-[#94a3b8] hover:text-[#1e293b] text-sm" />
                  ) : (
                    <FaEye className="text-[#94a3b8] hover:text-[#1e293b] text-sm" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#64748b]">Password strength:</span>
                    <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: passwordStrength.width,
                        backgroundColor: passwordStrength.color 
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-[#94a3b8] text-sm" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-[#10b981]/20
                           transition-all duration-200 bg-white text-sm
                           ${confirmPassword && password !== confirmPassword 
                             ? 'border-[#ef4444] focus:border-[#ef4444]' 
                             : confirmPassword && password === confirmPassword
                             ? 'border-[#10b981]'
                             : 'border-[#e2e8f0]'
                           }`}
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-[#94a3b8] hover:text-[#1e293b] text-sm" />
                  ) : (
                    <FaEye className="text-[#94a3b8] hover:text-[#1e293b] text-sm" />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-[#ef4444] mt-1">Passwords do not match</p>
              )}
              {confirmPassword && password === confirmPassword && password && (
                <p className="text-xs text-[#10b981] mt-1">✓ Passwords match</p>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[#e2e8f0] text-[#10b981] focus:ring-[#10b981]"
                required
              />
              <label htmlFor="terms" className="text-sm text-[#64748b]">
                I agree to the{' '}
                <Link to="/terms" className="text-[#10b981] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#10b981] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !agreeTerms}
              className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white 
                       py-3.5 px-4 rounded-xl font-semibold 
                       hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] 
                       transition-all duration-200 flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-sm text-[#64748b]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#10b981] font-medium hover:text-[#059669] hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;