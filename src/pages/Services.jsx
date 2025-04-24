// src/pages/Services.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { servicesAPI } from '../services/apiService';

function Services() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Development', 'Design', 'Marketing', 'Content', 'Support', 'Other'];
  const statuses = ['pending', 'active', 'completed', 'cancelled'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category) {
      setError('Name and Category are required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await servicesAPI.create(formData);
      
      setSuccess('Service added successfully!');
      setFormData({
        name: '',
        category: '',
        description: '',
        status: 'pending'
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError('Failed to add service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
  <div className="pb-5 border-b border-gray-200">
    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Add New Service</h1>
  </div>

  <div className="mt-8">
    {error && (
      <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow" role="alert">
        <span className="block sm:inline font-medium">{error}</span>
      </div>
    )}

    {success && (
      <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow" role="alert">
        <span className="block sm:inline font-medium">{success}</span>
      </div>
    )}

    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 border border-gray-100 space-y-6">
      
      {/* Service Name */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
          Service Name*
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          id="name"
          name="name"
          type="text"
          placeholder="Enter service name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="category">
          Category*
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="status">
          Status
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          id="description"
          name="description"
          placeholder="Enter service description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Service'}
        </button>
      </div>
    </form>
  </div>
</Layout>

  );
}

export default Services;