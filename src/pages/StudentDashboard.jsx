import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.role !== 'student') {
      navigate('/');
    }
    setStudent(currentUser);

    // Load performances for this student
    fetch('/src/data/dummyData.json')
      .then(res => res.json())
      .then(data => {
        const studentPerfs = data.performances.filter(p => 
          p.studentId === parseInt(currentUser.id) || 
          p.studentName === currentUser.name
        );
        setPerformances(studentPerfs);
      })
      .catch(() => {
        // Fallback data
        const fallbackPerfs = [
          { id: 1, subject: "Mathematics", marks: 85, attendance: 92, semester: "Sem 1" },
          { id: 2, subject: "English", marks: 78, attendance: 88, semester: "Sem 1" },
          { id: 3, subject: "Science", marks: 90, attendance: 95, semester: "Sem 1" }
        ];
        setPerformances(fallbackPerfs);
      });
  }, [navigate]);

  const getAvgMarks = () => {
    if (performances.length === 0) return 0;
    return (performances.reduce((sum, p) => sum + p.marks, 0) / performances.length).toFixed(2);
  };

  const getAvgAttendance = () => {
    if (performances.length === 0) return 0;
    return (performances.reduce((sum, p) => sum + p.attendance, 0) / performances.length).toFixed(2);
  };

  const getGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    return 'D';
  };

  if (!student) {
    return <div className="student-dashboard"><p>Loading...</p></div>;
  }

  return (
    <div className="student-dashboard">
      <Header
        title={`Welcome, ${student.name}`}
        userName={student.name}
        userEmail={student.email}
        userRole="student"
      />

      <main className="student-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <h3>Subjects</h3>
              <p className="stat-value">{new Set(performances.map(p => p.subject)).size}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>Average Marks</h3>
              <p className="stat-value">{getAvgMarks()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Average Attendance</h3>
              <p className="stat-value">{getAvgAttendance()}%</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Overall Grade</h3>
              <p className="stat-value">{getGrade(parseFloat(getAvgMarks()))}</p>
            </div>
          </div>
        </div>

        <section className="performance-section">
          <h2>Performance Details</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Attendance</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {performances.map(perf => (
                  <tr key={perf.id}>
                    <td>{perf.subject}</td>
                    <td>{perf.marks}</td>
                    <td className={`grade-${getGrade(perf.marks).toLowerCase()}`}>
                      {getGrade(perf.marks)}
                    </td>
                    <td>{perf.attendance}%</td>
                    <td>{perf.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="progress-section">
          <h2>Subject-wise Performance</h2>
          <div className="progress-bars">
            {performances.map(perf => (
              <div key={perf.id} className="progress-item">
                <div className="progress-header">
                  <span>{perf.subject}</span>
                  <span className="progress-value">{perf.marks}/100</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${perf.marks}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="recommendations-section">
          <h2>Recommendations</h2>
          <div className="recommendations">
            {getAvgMarks() < 75 ? (
              <p>📚 Focus on improving weak subjects. Consider extra study sessions.</p>
            ) : (
              <p>⭐ Great performance! Keep up the excellent work.</p>
            )}
            {getAvgAttendance() < 85 ? (
              <p>📝 Improve your attendance. Regular classes help in better understanding.</p>
            ) : (
              <p>✅ Excellent attendance! Keep consistent participation.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
