import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    number: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.number.trim()) {
      newErrors.number = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.number.trim())) {
      newErrors.number = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Mock authentication - replace with your actual API call
    // For demo purposes, accept any valid format
    console.log('Login data:', formData);
    
    // Set authentication in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'user');
    localStorage.setItem('userNumber', formData.number);
    
    // Navigate to the page user was trying to access, or dashboard
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-[#1a2332] rounded-xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Login
            </h1>
            <p className="text-gray-400 text-sm">Access your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Number Field */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Number
              </label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="Your Mobile Number"
                className={`w-full px-4 py-3 bg-[#0f1419] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  errors.number 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-700 focus:border-[#14b8a6]'
                }`}
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="block text-white font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 bg-[#0f1419] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors pr-12 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-700 focus:border-[#14b8a6]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[#14b8a6] hover:text-[#0d9488] text-sm font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 rounded-lg transition-colors mb-6"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-[#14b8a6] hover:text-[#0d9488] font-medium transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;