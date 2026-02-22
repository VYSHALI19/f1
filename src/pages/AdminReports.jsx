import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/AdminReports.css';

const AdminReports = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [reports, setReports] = useState({
    topPerformers: [],
    lowPerformers: [],
    subjectAverage: {}
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
        
        // Calculate student averages
        const studentAverages = {};
        performances.forEach(perf => {
          if (!studentAverages[perf.studentName]) {
            studentAverages[perf.studentName] = { marks: [], attendance: [] };
          }
          studentAverages[perf.studentName].marks.push(perf.marks);
          studentAverages[perf.studentName].attendance.push(perf.attendance);
        });

        const averages = Object.entries(studentAverages).map(([name, data]) => ({
          name,
          avgMarks: (data.marks.reduce((a, b) => a + b) / data.marks.length).toFixed(2),
          avgAttendance: (data.attendance.reduce((a, b) => a + b) / data.attendance.length).toFixed(2)
        })).sort((a, b) => b.avgMarks - a.avgMarks);

        // Calculate subject averages
        const subjectData = {};
        performances.forEach(perf => {
          if (!subjectData[perf.subject]) subjectData[perf.subject] = [];
          subjectData[perf.subject].push(perf.marks);
        });

        const subjectAverage = {};
        Object.keys(subjectData).forEach(subject => {
          const marks = subjectData[subject];
          subjectAverage[subject] = (marks.reduce((a, b) => a + b) / marks.length).toFixed(2);
        });

        setReports({
          topPerformers: averages.slice(0, 5),
          lowPerformers: averages.slice(-5).reverse(),
          subjectAverage
        });
      })
      .catch(() => {
        // Fallback reports
        setReports({
          topPerformers: [
            { name: 'Priya Sharma', avgMarks: '91.33', avgAttendance: '97.00' },
            { name: 'Neha Patel', avgMarks: '87.33', avgAttendance: '93.00' }
          ],
          lowPerformers: [
            { name: 'Rahul Singh', avgMarks: '75.67', avgAttendance: '84.33' }
          ],
          subjectAverage: {
            'Mathematics': '85.00',
            'English': '79.20',
            'Science': '87.00'
          }
        });
      });
  }, [navigate]);

  return (
    <div className="admin-reports">
      <Header
        title="Performance Reports"
        userName={currentUser.name}
        userEmail={currentUser.email}
        userRole="admin"
      />

      <nav className="admin-nav">
        <button onClick={() => navigate('/admin/dashboard')} className="nav-btn">Dashboard</button>
        <button onClick={() => navigate('/admin/add-performance')} className="nav-btn">Add Performance</button>
        <button onClick={() => navigate('/admin/view-students')} className="nav-btn">View Students</button>
        <button onClick={() => navigate('/admin/reports')} className="nav-btn active">Reports</button>
        <button onClick={() => navigate('/admin/analytics')} className="nav-btn">Analytics</button>
      </nav>

      <main className="reports-container">
        <section className="report-section">
          <h2>Top Performers</h2>
          <div className="report-table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Average Marks</th>
                  <th>Average Attendance</th>
                </tr>
              </thead>
              <tbody>
                {reports.topPerformers.map((student, idx) => (
                  <tr key={idx} className="top-performer">
                    <td>{student.name}</td>
                    <td>{student.avgMarks}</td>
                    <td>{student.avgAttendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-section">
          <h2>Subject-wise Performance</h2>
          <div className="report-table-container">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Average Marks</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(reports.subjectAverage).map(([subject, avg], idx) => (
                  <tr key={idx}>
                    <td>{subject}</td>
                    <td>{avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-section">
          <h2>Students Needing Improvement</h2>
          <div className="report-table-container">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Average Marks</th>
                  <th>Average Attendance</th>
                </tr>
              </thead>
              <tbody>
                {reports.lowPerformers.map((student, idx) => (
                  <tr key={idx} className="low-performer">
                    <td>{student.name}</td>
                    <td>{student.avgMarks}</td>
                    <td>{student.avgAttendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminReports;
