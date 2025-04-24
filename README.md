# Admin Dashboard with React and Vite

A modern admin dashboard application built with React, Vite, and Tailwind CSS. This application provides a comprehensive interface for managing services with features like authentication, service management, and dashboard analytics.

## Features

- 🔐 User Authentication
- 📊 Dashboard Analytics
- 📝 Service Management (CRUD operations)
- 📋 Service Listing with Filtering & Sorting
- 🎨 Responsive Design with Tailwind CSS
- 🚀 Fast Development with Vite

## Tech Stack

- React 19
- Vite 6
- React Router DOM 7
- Axios for API calls
- Tailwind CSS 4
- ESLint for code quality

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Layout.jsx    # Main layout wrapper
│   └── PrivateRoute.jsx
├── contexts/         # React contexts
│   └── AuthContext.jsx
├── pages/           # Page components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Services.jsx
│   └── ServicesList.jsx
└── services/        # API services
    └── apiService.js
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features Overview

### Authentication
- Login system with JWT token support
- Protected routes with PrivateRoute component
- Persistent authentication state

### Dashboard
- Overview statistics
- Recent services summary
- Quick navigation to key features

### Services Management
- Create new services
- View services list
- Filter services by category and status
- Sort services by various fields
- Search functionality

### Responsive Design
- Mobile-friendly sidebar navigation
- Adaptive layout for all screen sizes
- Modern UI with Tailwind CSS

## Development

The project uses a modern React stack with the following key features:

- ESLint configuration for code quality
- Vite for fast development and building
- React Router for navigation
- Context API for state management
- Axios for API calls

## Mock Data

Currently, the application uses mock data for demonstration purposes. The `apiService.js` file contains mock implementations that can be easily replaced with real API calls.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.
