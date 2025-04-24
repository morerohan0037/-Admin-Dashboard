import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    pendingServices: 0,
    completedServices: 0
  });

  useEffect(() => {
    const mockStats = {
      totalServices: 25,
      activeServices: 12,
      pendingServices: 8,
      completedServices: 5
    };

    setStats(mockStats);
  }, []);

  return (
    <Layout>
      <div className="pb-6 border-b border-gray-300">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Total Services',
            value: stats.totalServices,
            color: 'bg-primary',
            icon: (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            ),
          },
          {
            label: 'Active Services',
            value: stats.activeServices,
            color: 'bg-green-500',
            icon: (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            label: 'Pending Services',
            value: stats.pendingServices,
            color: 'bg-yellow-500',
            icon: (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            label: 'Completed Services',
            value: stats.completedServices,
            color: 'bg-green-600',
            icon: (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ),
          },
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-xl">
            <div className="px-6 py-5">
              <div className="flex items-center">
                <div className={`p-3 rounded-md ${item.color}`}>
                  {item.icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.label}</dt>
                  <dd className="mt-1 text-2xl font-bold text-gray-900">{item.value}</dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <Link to="/services-list" className="text-sm font-medium text-primary hover:text-primary-700 transition">
                View all<span className="sr-only"> {item.label} stats</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Services Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Services</h2>
          <Link to="/services-list" className="text-sm font-medium text-primary hover:text-primary-600">
            View all
          </Link>
        </div>
        <div className="mt-4 bg-white shadow-md rounded-xl overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {[
              {
                title: 'Website Development',
                status: 'Active',
                statusColor: 'bg-green-100 text-green-800',
                role: 'Developer',
                category: 'Frontend',
                time: 'Started 3 days ago',
              },
              {
                title: 'Mobile App Design',
                status: 'Pending',
                statusColor: 'bg-yellow-100 text-yellow-800',
                role: 'Designer',
                category: 'UI/UX',
                time: 'Requested 1 week ago',
              },
            ].map((service, idx) => (
              <li key={idx}>
                <div className="px-6 py-5 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">{service.title}</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.statusColor}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between text-sm text-gray-500">
                    <div className="flex space-x-6">
                      <span>{service.role}</span>
                      <span>{service.category}</span>
                    </div>
                    <div>{service.time}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>

  );
}

export default Dashboard;