import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminReports from './pages/AdminReports';
import AddPerformance from './pages/AddPerformance';
import ViewStudents from './pages/ViewStudents';
import StudentDashboard from './pages/StudentDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddPerformance = (newRecord) => {
    setPerformanceData(prev => [...prev, newRecord]);
  };

  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      {user && <Navbar user={user} onLogout={handleLogout} />}
      
      <Routes>
        {/* Login Page */}
        <Route
          path="/"
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/admin/dashboard" />}
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-performance"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AddPerformance onAddPerformance={handleAddPerformance} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute requiredRole="Admin">
              <ViewStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminReports />
            </ProtectedRoute>
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="Student">
              <StudentDashboard user={user} />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
