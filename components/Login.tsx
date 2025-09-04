import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, setError, loading } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    login(email, password);
  };
  
  const handleInputChange = () => {
      if(error) setError(null);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200">
        <h1 className="text-7xl font-bold text-center text-green-600">
          CGS
        </h1>
        <p className="text-center text-gray-600">Please sign in to continue</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); handleInputChange(); }}
              className="w-full px-4 py-2 text-gray-900 bg-gray-100/50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-start transition-all"
              placeholder="your-email@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); handleInputChange(); }}
              className="w-full px-4 py-2 text-gray-900 bg-gray-100/50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-start transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-700 bg-red-100 p-3 rounded-md border border-red-300">
              {error}
            </p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-3 font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};