import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import loginIllustration from "../assets/loginillus.svg";
import api from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Email / Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      dispatch(setCredentials(data));
      toast.success("Logged in successfully!", {
        icon: "👋",
        style: { borderRadius: "10px", background: "#1e293b", color: "#fff" },
      });
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message, {
        style: { borderRadius: "10px", background: "#ef4444", color: "#fff" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth login – receives a real ID token credential from GoogleLogin component
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/api/auth/google", {
        credential: credentialResponse.credential,
      });
      dispatch(setCredentials(data));
      toast.success("Signed in with Google!", {
        icon: "🌐",
        style: { borderRadius: "10px", background: "#1e293b", color: "#fff" },
      });
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Google sign-in failed.";
      toast.error(message, {
        style: { borderRadius: "10px", background: "#ef4444", color: "#fff" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google sign-in was cancelled or failed.", {
      style: { borderRadius: "10px", background: "#ef4444", color: "#fff" },
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden md:block relative">
          <div className="relative z-10">
            <img
              src={loginIllustration}
              alt="Shopping illustration"
              className="w-full h-auto animate-float"
            />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-72 h-72 bg-[#2563eb]/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#f59e0b]/5 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e293b]">
              Welcome Back
            </h2>
            <p className="text-[#64748b] text-sm mt-1">
              Please sign in to your account
            </p>
          </div>

          {/* Google Sign In Button */}
          <div className="flex justify-center mb-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="400"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2e8f0]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#64748b]">or</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                           focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]
                           transition-all duration-200 bg-white text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[#1e293b]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#2563eb] hover:text-[#1d4ed8] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-[#94a3b8] text-sm" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#e2e8f0] rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]
                           transition-all duration-200 bg-white text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#e2e8f0] text-[#2563eb] focus:ring-[#2563eb]"
                />
                <span className="text-sm text-[#64748b]">Remember me</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white 
                       py-3.5 px-4 rounded-xl font-semibold 
                       hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] 
                       transition-all duration-200 flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-sm text-[#64748b]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#2563eb] font-medium hover:text-[#1d4ed8] hover:underline"
            >
              Create free account
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center mt-4 text-xs text-[#94a3b8]">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
