import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowLeft, Paintbrush } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-4 py-12">
      <SEO title="Shop Owner Login" />

      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Return to Website
      </Link>

      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-brand-yellow text-brand-blue p-3 rounded-2xl w-fit mx-auto mb-3 shadow-lg">
            <Paintbrush className="h-8 w-8 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Owner Portal Login</h1>
          <p className="text-xs text-slate-400 mt-1">
            Goel Paints & Hardware Store Management
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs p-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@goelpaints.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-yellow hover:bg-amber-400 text-brand-blue font-extrabold py-3.5 rounded-xl text-sm shadow-lg transition-all mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Default seed login: <code className="text-brand-yellow bg-slate-900 px-1.5 py-0.5 rounded">admin@goelpaints.com</code> / <code className="text-brand-yellow bg-slate-900 px-1.5 py-0.5 rounded">admin123</code>
        </div>

      </div>
    </div>
  );
};

export default Login;
