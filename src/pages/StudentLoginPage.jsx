import React, { useState } from 'react';
import './StudentLoginPage.css';

export default function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [loadingUsers, setLoadingUsers] = useState([]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setGeneralError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setGeneralError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    // Validation
    let isValid = true;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Load registered users from localStorage
    const registered = localStorage.getItem('registeredUsers');
    const users = registered ? JSON.parse(registered) : [];

    // Check credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setLoadingUsers([user]);
      alert(`Welcome, ${user.name}! Login successful.`);
      // Here you would redirect to dashboard or do something with the user data
      console.log('Login successful:', user);
      // Reset form
      setEmail('');
      setPassword('');
    } else {
      setGeneralError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-icon">📚</div>
          <h1 className="login-title">Student Login</h1>
          <p className="login-subtitle">Analytics Hub</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className={`form-input ${emailError ? 'input-error' : ''}`}
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className={`form-input ${passwordError ? 'input-error' : ''}`}
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>

          {/* General Error */}
          {generalError && (
            <div className="general-error">{generalError}</div>
          )}

          {/* Login Button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p className="footer-text">© 2024 Analytics Hub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
