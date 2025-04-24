import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API base URL
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.token) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

const mockServices = [
  {
    id: 1,
    name: 'Website Development',
    category: 'Development',
    description: 'Full stack website development with React and Node.js',
    status: 'active',
    createdAt: '2025-04-10T14:30:00.000Z',
  },
  {
    id: 2,
    name: 'Mobile App Design',
    category: 'Design',
    description: 'UI/UX design for iOS and Android mobile application',
    status: 'pending',
    createdAt: '2025-04-15T09:45:00.000Z',
  },
  {
    id: 3,
    name: 'SEO Optimization',
    category: 'Marketing',
    description: 'Search engine optimization for existing website',
    status: 'completed',
    createdAt: '2025-04-05T11:20:00.000Z',
  },
  {
    id: 4,
    name: 'Logo Design',
    category: 'Design',
    description: 'Professional logo design for new brand',
    status: 'active',
    createdAt: '2025-04-12T16:15:00.000Z',
  },
  {
    id: 5,
    name: 'Content Writing',
    category: 'Content',
    description: 'Blog posts and article writing for company website',
    status: 'active',
    createdAt: '2025-04-18T13:10:00.000Z',
  },
];

export const servicesAPI = {
  getAll: async () => {
    // return api.get('/services');
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockServices });
      }, 500);
    });
  },
  
  getById: async (id) => {
    // return api.get(`/services/${id}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const service = mockServices.find(s => s.id === parseInt(id));
        if (service) {
          resolve({ data: service });
        } else {
          reject({ message: 'Service not found' });
        }
      }, 300);
    });
  },
  
  create: async (serviceData) => {
    // return api.post('/services', serviceData);
    // For now, add to mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const newService = {
          id: mockServices.length + 1,
          ...serviceData,
          createdAt: new Date().toISOString(),
        };
        mockServices.push(newService);
        resolve({ data: newService });
      }, 500);
    });
  },
  
  update: async (id, serviceData) => {
    //  return api.put(`/services/${id}`, serviceData);
    // For now, update mock data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockServices.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
          mockServices[index] = { ...mockServices[index], ...serviceData };
          resolve({ data: mockServices[index] });
        } else {
          reject({ message: 'Service not found' });
        }
      }, 500);
    });
  },
  
  delete: async (id) => {
    //  return api.delete(`/services/${id}`);
    // For now, remove from mock data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockServices.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
          const deleted = mockServices.splice(index, 1)[0];
          resolve({ data: deleted });
        } else {
          reject({ message: 'Service not found' });
        }
      }, 500);
    });
  }
};

export default api;