
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    // In a real app, this would call your backend API
    try {
      // const response = await axios.post('/api/login', { email, password });
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: email,
        role: 'admin',
        token: 'mock-jwt-token',
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      return mockUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  function logout() {
    localStorage.removeItem('user');
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}