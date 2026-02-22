import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ title, userName, userEmail, userRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Get the first letter of the username for avatar
  const getAvatarLetter = () => {
    if (userName) {
      return userName.charAt(0).toUpperCase();
    }
    return '?';
  };

  // Get avatar background color based on role
  const getAvatarColor = () => {
    if (userRole === 'admin') return 'bg-blue-600';
    if (userRole === 'student') return 'bg-purple-600';
    return 'bg-gray-600';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleMyProfile = () => {
    setDropdownOpen(false);
    // Navigate to profile page or show modal
  };

  const handleSettings = () => {
    setDropdownOpen(false);
    // Navigate to settings page or show modal
  };

  return (
    <header className="dashboard-header">
      <div className="header-container">
        {/* Left section - Title */}
        <div className="header-title">
          <h1>{title}</h1>
        </div>

        {/* Right section - User Profile */}
        <div className="header-user-section" ref={dropdownRef}>
          <button
            className="profile-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Toggle profile menu"
          >
            {/* Avatar Circle */}
            <div className={`avatar-circle ${getAvatarColor()}`}>
              {getAvatarLetter()}
            </div>

            {/* User Info */}
            <div className="user-info">
              <p className="user-name">{userName || 'User'}</p>
              <p className="user-role">{userRole}</p>
            </div>

            {/* Chevron Icon */}
            <svg
              className={`chevron-icon ${dropdownOpen ? 'rotate' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleMyProfile}>
                <span className="menu-icon">👤</span>
                My Profile
              </button>
              <button className="dropdown-item" onClick={handleSettings}>
                <span className="menu-icon">⚙️</span>
                Settings
              </button>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >
                <span className="menu-icon">🚪</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
