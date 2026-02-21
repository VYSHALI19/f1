import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import { adminCredentials, studentCredentials } from '../data/dummyData';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    setFormData({ username: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (role === 'admin') {
      if (formData.username === adminCredentials.username && 
          formData.password === adminCredentials.password) {
        onLogin({ name: 'Admin User', role: 'Admin', id: 'admin' });
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials');
      }
    } else if (role === 'student') {
      // For demo, allow any username with correct password
      if (formData.password === studentCredentials.password) {
        onLogin({ name: formData.username, role: 'Student', id: formData.username });
        navigate('/student/dashboard');
      } else {
        setError('Invalid student credentials');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📊 Performance Analytics</h1>
          <p className="text-blue-100">Student Performance Management System</p>
        </div>

        {!role ? (
          // Role Selection
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Select Your Role</h2>
            
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect('admin')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:opacity-90 transition transform hover:scale-105 font-semibold text-lg"
              >
                👨‍🏫 Admin / Teacher
              </button>
              
              <button
                onClick={() => handleRoleSelect('student')}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg hover:opacity-90 transition transform hover:scale-105 font-semibold text-lg"
              >
                👨‍🎓 Student
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 font-semibold">Demo Credentials:</p>
              <p className="text-xs text-gray-600"><strong>Admin:</strong> username: admin | password: admin123</p>
              <p className="text-xs text-gray-600"><strong>Student:</strong> any username | password: student123</p>
            </div>
          </div>
        ) : (
          // Login Form
          <div className="bg-white rounded-lg shadow-lg p-8">
            <button
              onClick={() => setRole(null)}
              className="text-sm text-primary hover:underline mb-4"
            >
              ← Back to Role Selection
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {role === 'admin' ? '👨‍🏫 Admin Login' : '👨‍🎓 Student Login'}
            </h2>

            <form onSubmit={handleSubmit}>
              <FormField
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={role === 'admin' ? 'Enter admin username' : 'Enter your name'}
                required
              />

              <FormField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />

              {error && (
                <div className="bg-red-50 border border-danger text-danger p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition font-semibold mt-6"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
