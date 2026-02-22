import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin({ onLogin }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Load registered users from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('registeredUsers');
    if (saved) {
      setRegisteredUsers(JSON.parse(saved));
    }
  }, []);

  // Save registered users to localStorage
  const saveRegisteredUsers = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    setRegisteredUsers(users);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!signUpData.name || !signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(signUpData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (registeredUsers.some(user => user.email === signUpData.email)) {
      setError('Email address already registered');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
      role: 'student',
      createdAt: new Date().toLocaleDateString()
    };

    const updatedUsers = [...registeredUsers, newUser];
    saveRegisteredUsers(updatedUsers);

    setSuccess('Account created successfully! You can now login.');
    setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
    
    setTimeout(() => {
      setIsSignUp(false);
      setSuccess('');
    }, 2000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const registeredUser = registeredUsers.find(
      user => user.email === formData.email && user.password === formData.password && user.role === 'student'
    );

    if (registeredUser) {
      onLogin({ name: registeredUser.name, role: 'Student', id: registeredUser.email });
      navigate('/student/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mb-4 shadow-md">
            <span className="text-2xl">📚</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Hub</h1>
          <p className="text-gray-600">Student Portal</p>
        </div>

        {/* Login/Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
          {isSignUp ? (
            // Sign Up Form
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600 text-sm mb-6">Join our platform to track your progress</p>

              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={handleSignUpChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    ✓ {success}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-lg hover:shadow-lg transition font-semibold mt-6"
                >
                  Create Account
                </button>

                <p className="text-center text-gray-600 text-sm pt-4">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(false);
                      setError('');
                      setSuccess('');
                      setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Login
                  </button>
                </p>
              </form>
            </>
          ) : (
            // Login Form
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm mb-6">Sign in to your account</p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleLoginChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-700">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    Remember me
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-lg hover:shadow-lg transition font-semibold mt-6"
                >
                  Sign In
                </button>

                <p className="text-center text-gray-600 text-sm pt-4">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setError('');
                      setFormData({ email: '', password: '' });
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2024 Analytics Hub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
