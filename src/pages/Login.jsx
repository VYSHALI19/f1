import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminCredentials } from '../data/dummyData';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [signUpData, setSignUpData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Load registered users from localStorage on mount
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

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    setSuccess('');
    setFormData({ username: '', password: '' });
    setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
    setIsSignUp(false);
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

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!signUpData.name || !signUpData.email || !signUpData.password || !signUpData.confirmPassword) {
      setError('Please fill in all fields');
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

    // Check if email already exists
    if (registeredUsers.some(user => user.email === signUpData.email)) {
      setError('Email already registered');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
      role: role,
      createdAt: new Date().toLocaleDateString()
    };

    const updatedUsers = [...registeredUsers, newUser];
    saveRegisteredUsers(updatedUsers);

    setSuccess('Account created successfully! You can now login.');
    setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
    
    // Auto-switch to login after 2 seconds
    setTimeout(() => {
      setIsSignUp(false);
      setSuccess('');
    }, 2000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

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
      // Check registered users only
      const registeredUser = registeredUsers.find(
        user => user.email === formData.username && user.password === formData.password && user.role === 'student'
      );

      if (registeredUser) {
        onLogin({ name: registeredUser.name, role: 'Student', id: registeredUser.email });
        navigate('/student/dashboard');
      } else {
        setError('Invalid email or password. Please create an account first.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">📊</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Hub</h1>
          <p className="text-slate-400 text-sm">Student Performance Management</p>
        </div>

        {!role ? (
          // Role Selection
          <div className="space-y-3 mb-8">
            <button
              onClick={() => handleRoleSelect('admin')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/20 transition duration-200 font-semibold"
            >
              Admin / Teacher
            </button>
            
            <button
              onClick={() => handleRoleSelect('student')}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-xl hover:shadow-xl hover:shadow-emerald-500/20 transition duration-200 font-semibold"
            >
              Student
            </button>
          </div>
        ) : (
          // Login / Sign Up Form
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
            <button
              onClick={() => setRole(null)}
              className="text-sm text-slate-400 hover:text-slate-300 mb-6 flex items-center gap-1 transition"
            >
              ← Back
            </button>

            {isSignUp ? (
              // Sign Up Form
              <>
                <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
                <p className="text-slate-400 text-sm mb-6">Join as a {role === 'admin' ? 'teacher' : 'student'}</p>

                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={signUpData.name}
                      onChange={handleSignUpChange}
                      placeholder="John Doe"
                      className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 py-2.5 px-4 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={signUpData.email}
                      onChange={handleSignUpChange}
                      placeholder="you@example.com"
                      className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 py-2.5 px-4 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                      placeholder="••••••••"
                      className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 py-2.5 px-4 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={signUpData.confirmPassword}
                      onChange={handleSignUpChange}
                      placeholder="••••••••"
                      className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 py-2.5 px-4 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-sm">
                      ✓ {success}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition font-semibold mt-6"
                  >
                    Create Account
                  </button>

                  <p className="text-center text-slate-400 text-sm pt-4">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(false);
                        setError('');
                        setSuccess('');
                        setSignUpData({ name: '', email: '', password: '', confirmPassword: '' });
                      }}
                      className="text-blue-400 hover:text-blue-300 font-semibold transition"
                    >
                      Login
                    </button>
                  </p>
                </form>
              </>
            ) : (
              // Login Form
              <>
                <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
                <p className="text-slate-400 text-sm mb-6">Sign in to your account</p>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {role === 'admin' ? 'Username' : 'Email'}
                    </label>
                    <input
                      type={role === 'admin' ? 'text' : 'email'}
                      name="username"
                      value={formData.username}
                      onChange={handleLoginChange}
                      placeholder={role === 'admin' ? 'admin' : 'you@example.com'}
                      className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 py-2.5 px-4 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleLoginChange}
                      placeholder="••••••••"
                      className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 py-2.5 px-4 rounded-lg focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition font-semibold mt-6"
                  >
                    Sign In
                  </button>

                  {role === 'student' && (
                    <p className="text-center text-slate-400 text-sm pt-4">
                      New here?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(true);
                          setError('');
                          setFormData({ username: '', password: '' });
                        }}
                        className="text-blue-400 hover:text-blue-300 font-semibold transition"
                      >
                        Create account
                      </button>
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-8">
          © 2024 Analytics Hub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
