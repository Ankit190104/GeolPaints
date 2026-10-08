import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('goel_admin_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        if (res.data.success) {
          setAdmin(res.data.admin);
        } else {
          localStorage.removeItem('goel_admin_token');
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        localStorage.removeItem('goel_admin_token');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      localStorage.setItem('goel_admin_token', res.data.token);
      setAdmin({
        _id: res.data._id,
        email: res.data.email,
        name: res.data.name,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('goel_admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
