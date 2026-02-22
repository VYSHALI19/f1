import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/AdminAnalytics.css';

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [analytics, setAnalytics] = useState({
    totalRecords: 0,
    avgMarks: 0,
    avgAttendance: 0,
    subjectAvg: {},
    gradeDistribution: {}
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role !== 'admin') {
      navigate('/');
    }
    setCurrentUser(user);

    // Load and process data
    fetch('/src/data/dummyData.json')
      .then(res => res.json())
      .then(data => {
        const performances = data.performances || [];
        if (performances.length === 0) {
          setAnalytics({
            totalRecords: 0,
            avgMarks: 0,
            avgAttendance: 0,
            subjectAvg: {},
            gradeDistribution: { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0 }
          });
          return;
        }

        // Calculate averages
        const avgMarks = (performances.reduce((sum, p) => sum + p.marks, 0) / performances.length).toFixed(2);
        const avgAttendance = (performances.reduce((sum, p) => sum + p.attendance, 0) / performances.length).toFixed(2);

        // Calculate subject averages
        const subjectData = {};
        performances.forEach(perf => {
          if (!subjectData[perf.subject]) subjectData[perf.subject] = [];
          subjectData[perf.subject].push(perf.marks);
        });

        const subjectAvg = {};
        Object.keys(subjectData).forEach(subject => {
          const marks = subjectData[subject];
          subjectAvg[subject] = (marks.reduce((a, b) => a + b) / marks.length).toFixed(2);
        });

        // Calculate grade distribution
        const gradeDistribution = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0 };
        performances.forEach(perf => {
          if (perf.marks >= 90) gradeDistribution['A+']++;
          else if (perf.marks >= 80) gradeDistribution['A']++;
          else if (perf.marks >= 70) gradeDistribution['B']++;
          else if (perf.marks >= 60) gradeDistribution['C']++;
          else gradeDistribution['D']++;
        });

        setAnalytics({
          totalRecords: performances.length,
          avgMarks: avgMarks,
          avgAttendance: avgAttendance,
          subjectAvg,
          gradeDistribution
        });
      })
      .catch(() => {
        // Fallback data
        const fallback = {
          totalRecords: 15,
          avgMarks: '85.13',
          avgAttendance: '91.67',
          subjectAvg: {
            'Mathematics': '85.00',
            'English': '78.20',
            'Science': '87.00'
          },
          gradeDistribution: { 'A+': 3, 'A': 7, 'B': 4, 'C': 1, 'D': 0 }
        };
        setAnalytics(fallback);
      });
  }, [navigate]);

  const getMaxGradeCount = () => {
    return Math.max(...Object.values(analytics.gradeDistribution));
  };

  return (
    <div className="admin-analytics">
      <Header
        title="Analytics Dashboard"
        userName={currentUser.name}
        userEmail={currentUser.email}
        userRole="admin"
      />

      <nav className="admin-nav">
        <button onClick={() => navigate('/admin/dashboard')} className="nav-btn">Dashboard</button>
        <button onClick={() => navigate('/admin/add-performance')} className="nav-btn">Add Performance</button>
        <button onClick={() => navigate('/admin/view-students')} className="nav-btn">View Students</button>
        <button onClick={() => navigate('/admin/reports')} className="nav-btn">Reports</button>
        <button onClick={() => navigate('/admin/analytics')} className="nav-btn active">Analytics</button>
      </nav>

      <main className="analytics-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Total Records</h3>
              <p className="stat-value">{analytics.totalRecords}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>Average Marks</h3>
              <p className="stat-value">{analytics.avgMarks}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>Average Attendance</h3>
              <p className="stat-value">{analytics.avgAttendance}%</p>
            </div>
          </div>
        </div>

        <section className="analytics-section">
          <h2>Subject-wise Performance</h2>
          <div className="chart-container">
            {Object.entries(analytics.subjectAvg).map(([subject, avg]) => (
              <div key={subject} className="bar-chart-item">
                <label>{subject}</label>
                <div className="bar-container">
                  <div className="bar" style={{ width: `${avg}%` }}></div>
                </div>
                <span className="bar-value">{avg}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="analytics-section">
          <h2>Grade Distribution</h2>
          <div className="grade-container">
            {Object.entries(analytics.gradeDistribution).map(([grade, count]) => (
              <div key={grade} className="grade-item">
                <div className="grade-bar">
                  <div 
                    className={`grade-fill grade-${grade.toLowerCase()}`}
                    style={{ height: `${(count / getMaxGradeCount()) * 100}%` }}
                  ></div>
                </div>
                <div className="grade-label">
                  <p className="grade-name">Grade {grade}</p>
                  <p className="grade-count">{count} Records</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminAnalytics;
