import React, { useState } from 'react';
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome } from 'lucide-react';

interface AuthProps {
  onLogin: (user: any) => void;
  onClose: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    acceptTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: '1',
        email: formData.email,
        firstName: formData.firstName || 'John',
        lastName: formData.lastName || 'Doe',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
        joinDate: new Date().toISOString(),
        verified: true
      };
      
      onLogin(user);
      setLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      const user = {
        id: '1',
        email: `user@${provider}.com`,
        firstName: 'John',
        lastName: 'Doe',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        joinDate: new Date().toISOString(),
        verified: true,
        provider
      };
      
      onLogin(user);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 min-h-screen">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm text-gray-400">
                  {isLogin ? 'Sign in to your account' : 'Join the Web3 identity revolution'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors text-xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder=""
                      required={!isLogin}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder=""
                      required={!isLogin}
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder=""
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder=""
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-black/20 text-white rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder=""
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 text-blue-500 bg-black/20 border-white/10 rounded focus:ring-blue-500"
                  required={!isLogin}
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10 disabled:opacity-50"
              >
                <Chrome className="h-4 w-4" />
                <span>Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('github')}
                disabled={loading}
                className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10 disabled:opacity-50"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-blue-400 hover:text-blue-300">
                {isLogin ? 'Sign up' : 'Sign in'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};