// src/pages/ServicesList.js
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { servicesAPI } from '../services/apiService';

function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtering and sorting states
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });

  const categories = ['All', 'Development', 'Design', 'Marketing', 'Content', 'Support', 'Other'];
  const statuses = ['All', 'pending', 'active', 'completed', 'cancelled'];

  // Load services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesAPI.getAll();
      setServices(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle filters change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Handle sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const getSortedServices = () => {
    const sortableServices = [...services];
    sortableServices.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableServices;
  };

  // Apply filters
  const getFilteredServices = () => {
    return getSortedServices().filter(service => {
      // Category filter
      if (filters.category && filters.category !== 'All' && service.category !== filters.category) {
        return false;
      }

      // Status filter
      if (filters.status && filters.status !== 'All' && service.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.search && !service.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !service.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      return true;
    });
  };

  // Render sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return '⇅';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filtered services
  const filteredServices = getFilteredServices();

  return (
    <Layout>
      {/* Header */}
      <div className="pb-5 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Services List</h1>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md px-6 py-5 rounded-xl mt-6 border border-gray-100">
        <div className="md:flex md:items-center md:justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          {/* Search */}
          <div className="sm:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search by name or description"
              value={filters.search}
              onChange={handleFilterChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="sm:col-span-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="sm:col-span-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm" role="alert">
          <span className="block font-medium">{error}</span>
        </div>
      )}

      {/* Services Table */}
      <div className="mt-6">
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          {loading ? (
            <div className="bg-white px-4 py-12 text-center text-gray-600 text-sm">
              Loading services...
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="bg-white px-4 py-12 text-center text-gray-600 text-sm">
              No services found matching your filters.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  {['name', 'category', 'status', 'createdAt'].map((field) => (
                    <th
                      key={field}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                      onClick={() => requestSort(field)}
                    >
                      <div className="flex items-center gap-1">
                        {field === 'createdAt' ? 'Date' : field.charAt(0).toUpperCase() + field.slice(1)}
                        {getSortIcon(field)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredServices.map((service) => (
                  <tr key={service.id}>
                    {/* Name and Description */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 font-medium">{service.name}</div>
                      <div className="text-gray-500 truncate max-w-xs">{service.description}</div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {service.category}
                    </td>

                    {/* Status with Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusClass(service.status)}`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {formatDate(service.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>

  );
}

export default ServicesList;