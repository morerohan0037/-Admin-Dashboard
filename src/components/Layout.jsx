
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Layout({ children }) {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Add Services', path: '/services', icon: '➕' },
    { name: 'Services List', path: '/services-list', icon: '📋' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar for mobile */}
      <div className={`md:hidden fixed inset-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800 shadow-lg">
          <div className="flex items-center justify-between px-4">
            <span className="text-2xl font-semibold text-white">Admin Dashboard</span>
            <button
              className="text-white hover:text-red-400 transition-colors duration-200 focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </button>
          </div>
          <div className="flex-1 h-0 mt-6 overflow-y-auto">
            <nav className="px-2 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${location.pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} group flex items-center px-4 py-2 text-base font-medium rounded-lg transition duration-200`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-gray-800 shadow-lg">
          <div className="flex items-center justify-center h-16 bg-gray-900 shadow-md">
            <span className="text-2xl font-semibold text-white">Admin Dashboard</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`${location.pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition duration-200`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-md px-4 md:px-6">
          <div className="flex items-center justify-between w-full">
            <button
              className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">{currentUser?.name}</span>
              <button
                onClick={logout}
                className="bg-gray-200 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-300 hover:text-gray-900 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto focus:outline-none p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>

  );
}

export default Layout;