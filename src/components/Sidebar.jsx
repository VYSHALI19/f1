import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const adminMenuItems = [
    { path: '/admin/dashboard', label: '📊 Dashboard', icon: 'dashboard' },
    { path: '/admin/add-performance', label: '➕ Add Performance', icon: 'add' },
    { path: '/admin/students', label: '👥 View Students', icon: 'students' },
    { path: '/admin/analytics', label: '📈 Analytics', icon: 'analytics' },
    { path: '/admin/reports', label: '📋 Reports', icon: 'reports' }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
      <nav className="space-y-2">
        {adminMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-700'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
