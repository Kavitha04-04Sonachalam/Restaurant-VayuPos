import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Loader2 } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState('mobile'); // 'mobile' or 'email'
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Clear error when user types
    if (error) {
      setError('');
    }
  };

  const validateInput = () => {
    if (!inputValue.trim()) {
      setError(`${inputType === 'mobile' ? 'Mobile number' : 'Email'} is required`);
      return false;
    }

    if (inputType === 'mobile') {
      // Validate 10-digit mobile number
      if (!/^\d{10}$/.test(inputValue.trim())) {
        setError('Please enter a valid 10-digit mobile number');
        return false;
      }
    } else {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue.trim())) {
        setError('Please enter a valid email address');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call - replace with your actual API endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log('Password reset requested for:', {
        type: inputType,
        value: inputValue
      });

      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleInputType = () => {
    setInputType(inputType === 'mobile' ? 'email' : 'mobile');
    setInputValue('');
    setError('');
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Login Button */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#14b8a6] transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Login</span>
        </button>

        {/* Forgot Password Card */}
        <div className="bg-[#1a2332] rounded-xl p-8 shadow-xl">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#14b8a6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {inputType === 'mobile' ? (
                    <Phone className="text-[#14b8a6]" size={28} />
                  ) : (
                    <Mail className="text-[#14b8a6]" size={28} />
                  )}
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Forgot Password
                </h1>
                <p className="text-gray-400 text-sm">
                  Enter your registered {inputType === 'mobile' ? 'mobile number' : 'email'} to reset your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Input Type Toggle */}
                <div className="flex gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => inputType !== 'mobile' && handleToggleInputType()}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                      inputType === 'mobile'
                        ? 'bg-[#14b8a6] text-white'
                        : 'bg-[#0f1419] text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Mobile Number
                  </button>
                  <button
                    type="button"
                    onClick={() => inputType !== 'email' && handleToggleInputType()}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                      inputType === 'email'
                        ? 'bg-[#14b8a6] text-white'
                        : 'bg-[#0f1419] text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Email
                  </button>
                </div>

                {/* Input Field */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">
                    {inputType === 'mobile' ? 'Mobile Number' : 'Email Address'}
                  </label>
                  <input
                    type={inputType === 'mobile' ? 'text' : 'email'}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={
                      inputType === 'mobile' 
                        ? 'Enter your mobile number' 
                        : 'Enter your email address'
                    }
                    disabled={isLoading}
                    className={`w-full px-4 py-3 bg-[#0f1419] border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      error 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-700 focus:border-[#14b8a6]'
                    }`}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      {error}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-[#0f1419] rounded-lg border border-gray-700">
                  <p className="text-gray-400 text-xs leading-relaxed">
                    <span className="text-[#14b8a6] font-medium">Note:</span> You will receive a password reset link via {inputType === 'mobile' ? 'SMS' : 'email'}. The link will be valid for 15 minutes.
                  </p>
                </div>
              </form>
            </>
          ) : (
            // Success State
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="text-green-500"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Reset Link Sent!
              </h2>
              <p className="text-gray-400 mb-6">
                We've sent a password reset link to your {inputType === 'mobile' ? 'mobile number' : 'email'}
              </p>
              <div className="bg-[#0f1419] rounded-lg p-4 mb-6">
                <p className="text-[#14b8a6] font-medium break-all">
                  {inputValue}
                </p>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Redirecting to login page...
              </p>
              <button
                onClick={() => navigate('/login')}
                className="text-[#14b8a6] hover:text-[#0d9488] font-medium transition-colors"
              >
                Go to Login Now
              </button>
            </div>
          )}
        </div>

        {/* Help Text */}
        {!isSuccess && (
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Remember your password?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#14b8a6] hover:text-[#0d9488] font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;