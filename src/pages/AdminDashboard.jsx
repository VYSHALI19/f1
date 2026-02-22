import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [dummyData, setDummyData] = useState({ students: [], performances: [] });
  const [stats, setStats] = useState({
    totalStudents: 0,
    avgMarks: 0,
    avgAttendance: 0,
    totalRecords: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role !== 'admin') {
      navigate('/');
    }
    setCurrentUser(user);

    // Load dummy data
    fetch('/src/data/dummyData.json')
      .then(res => res.json())
      .then(data => {
        setDummyData(data);
        calculateStats(data);
      })
      .catch(() => {
        // Fallback if JSON doesn't load
        const fallbackData = {
          students: [
            { id: 1, name: "Arjun Kumar", email: "arjun@student.com", class: "10A" },
            { id: 2, name: "Priya Sharma", email: "priya@student.com", class: "10B" },
            { id: 3, name: "Rahul Singh", email: "rahul@student.com", class: "10A" },
            { id: 4, name: "Neha Patel", email: "neha@student.com", class: "10C" },
            { id: 5, name: "Dhruv Verma", email: "dhruv@student.com", class: "10B" }
          ],
          performances: [
            { id: 1, studentId: 1, studentName: "Arjun Kumar", subject: "Mathematics", marks: 85, attendance: 92 },
            { id: 2, studentId: 1, studentName: "Arjun Kumar", subject: "English", marks: 78, attendance: 88 },
            { id: 3, studentId: 2, studentName: "Priya Sharma", subject: "Mathematics", marks: 92, attendance: 98 },
            { id: 4, studentId: 2, studentName: "Priya Sharma", subject: "English", marks: 88, attendance: 96 }
          ]
        };
        setDummyData(fallbackData);
        calculateStats(fallbackData);
      });
  }, [navigate]);

  const calculateStats = (data) => {
    if (!data.performances || data.performances.length === 0) return;
    
    const uniqueStudents = new Set(data.performances.map(p => p.studentId)).size;
    const avgMarks = (data.performances.reduce((sum, p) => sum + p.marks, 0) / data.performances.length).toFixed(2);
    const avgAttendance = (data.performances.reduce((sum, p) => sum + p.attendance, 0) / data.performances.length).toFixed(2);
    
    setStats({
      totalStudents: uniqueStudents,
      avgMarks: avgMarks,
      avgAttendance: avgAttendance,
      totalRecords: data.performances.length
    });
  };

  return (
    <div className="admin-dashboard">
      <Header
        title="Admin Dashboard"
        userName={currentUser.name}
        userEmail={currentUser.email}
        userRole="admin"
      />

      <nav className="admin-nav">
        <button onClick={() => navigate('/admin/dashboard')} className="nav-btn active">Dashboard</button>
        <button onClick={() => navigate('/admin/add-performance')} className="nav-btn">Add Performance</button>
        <button onClick={() => navigate('/admin/view-students')} className="nav-btn">View Students</button>
        <button onClick={() => navigate('/admin/reports')} className="nav-btn">Reports</button>
        <button onClick={() => navigate('/admin/analytics')} className="nav-btn">Analytics</button>
      </nav>

      <main className="admin-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Total Students</h3>
              <p className="stat-value">{stats.totalStudents}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Average Marks</h3>
              <p className="stat-value">{stats.avgMarks}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>Average Attendance</h3>
              <p className="stat-value">{stats.avgAttendance}%</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <h3>Total Records</h3>
              <p className="stat-value">{stats.totalRecords}</p>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h2>Quick Actions</h2>
          <div className="features-grid">
            <button onClick={() => navigate('/admin/add-performance')} className="feature-card">
              <h3>Add Performance</h3>
              <p>Record student marks and attendance</p>
            </button>
            <button onClick={() => navigate('/admin/view-students')} className="feature-card">
              <h3>View Students</h3>
              <p>See all enrolled students</p>
            </button>
            <button onClick={() => navigate('/admin/reports')} className="feature-card">
              <h3>Generate Reports</h3>
              <p>View detailed performance reports</p>
            </button>
            <button onClick={() => navigate('/admin/analytics')} className="feature-card">
              <h3>Analytics</h3>
              <p>View charts and insights</p>
            </button>
          </div>
        </div>

        <div className="recent-records">
          <h2>Recent Performance Records</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Attendance</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.performances && dummyData.performances.slice(-5).reverse().map(perf => (
                  <tr key={perf.id}>
                    <td>{perf.studentName}</td>
                    <td>{perf.subject}</td>
                    <td>{perf.marks}</td>
                    <td>{perf.attendance}%</td>
                    <td>{perf.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
