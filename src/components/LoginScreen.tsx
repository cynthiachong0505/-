import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, Eye, EyeOff, HelpCircle, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState('teacher@oakwood.edu');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dynamic fake authentication delay for amazing user feedback!
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(username.split('@')[0]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6 py-12">
      {/* Decorative ambient blurred backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl -z-10" />

      <main className="relative z-10 w-full max-w-md">
        {/* Logo & Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-3 bg-surface-container-highest rounded-xl shadow-xs">
            <img
              className="w-14 h-14 object-contain rounded-lg"
              alt="Oakwood Elementary School logo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-ChMVe96oN6loMMi8Kj3HP0VEJlxtFbLvjmTdDgqiVX9vzT77euNZ6ssNOhF7dmFS51Zro_u9NlQaLFUBMLsD6opsgLBhVDi8N-JYEfSu4HnD8d4vRTlhaLznrR_hQ4nEGSlxCBsLX25MWFj9WNNZCrsL8j9NHOTDcclxfkAL89RG8WqnORxgNgACv9bqSjPFrtlMqDqtcyhYNZb8E5nwN0U0xqBIyHeugwdeX5VFbhf2IgUL5ss-"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="font-display text-4xl font-extrabold text-primary tracking-tight mb-1">Activity Hub</h1>
          <p className="text-on-surface-variant text-md font-medium">Oakwood Elementary Portal</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-xs hover:shadow-md transition-all duration-300"
          id="login-card"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username/Email Input */}
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-on-surface" htmlFor="username">
                Username or Email
              </label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium focus:outline-hidden"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your credentials"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-on-surface" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full pl-11 pr-12 py-3 bg-surface rounded-xl border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium focus:outline-hidden"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  id="toggle-password-visibility-btn"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Checkbox and Forgot Password link */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
                  id="remember-me-checkbox"
                />
                <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
                  Keep me logged in
                </span>
              </label>
              <a
                href="#forgot-password"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-semibold text-primary hover:underline transition-all"
                id="forgot-password-link"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              className="w-full py-3.5 bg-primary hover:bg-primary-container text-white font-semibold rounded-xl shadow-xs hover:shadow-md active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-80"
              type="submit"
              disabled={isLoading}
              id="login-submit-btn"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="font-medium">Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="font-semibold">Login</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* IT Help Portal section */}
          <div className="mt-8 pt-6 border-t border-outline-variant text-center space-y-3">
            <p className="text-sm font-medium text-on-surface-variant">Having trouble signing in?</p>
            <a
              className="inline-flex items-center space-x-2 px-5 py-2.5 border border-outline-variant rounded-full text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-all"
              href="mailto:it-support@oakwood.edu"
              id="contact-support-btn"
            >
              <HelpCircle className="w-4.5 h-4.5 text-primary" />
              <span>Contact IT Support</span>
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs font-semibold text-outline">
            © 2024 Oakwood Elementary. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
