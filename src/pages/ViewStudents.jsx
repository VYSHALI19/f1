import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/ViewStudents.css';

const ViewStudents = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role !== 'admin') {
      navigate('/');
    }
    setCurrentUser(user);

    // Load students
    fetch('/src/data/dummyData.json')
      .then(res => res.json())
      .then(data => setStudents(data.students))
      .catch(() => {
        const fallbackStudents = [
          { id: 1, name: "Arjun Kumar", email: "arjun@student.com", class: "10A", enrollment: "2023-01-15" },
          { id: 2, name: "Priya Sharma", email: "priya@student.com", class: "10B", enrollment: "2023-02-20" },
          { id: 3, name: "Rahul Singh", email: "rahul@student.com", class: "10A", enrollment: "2023-03-10" },
          { id: 4, name: "Neha Patel", email: "neha@student.com", class: "10C", enrollment: "2023-04-05" },
          { id: 5, name: "Dhruv Verma", email: "dhruv@student.com", class: "10B", enrollment: "2023-05-12" }
        ];
        setStudents(fallbackStudents);
      });
  }, [navigate]);

  return (
    <div className="view-students">
      <Header
        title="View All Students"
        userName={currentUser.name}
        userEmail={currentUser.email}
        userRole="admin"
      />

      <nav className="admin-nav">
        <button onClick={() => navigate('/admin/dashboard')} className="nav-btn">Dashboard</button>
        <button onClick={() => navigate('/admin/add-performance')} className="nav-btn">Add Performance</button>
        <button onClick={() => navigate('/admin/view-students')} className="nav-btn active">View Students</button>
        <button onClick={() => navigate('/admin/reports')} className="nav-btn">Reports</button>
        <button onClick={() => navigate('/admin/analytics')} className="nav-btn">Analytics</button>
      </nav>

      <main className="content-container">
        <div className="students-container">
          <div className="total-students">
            Total Students: <strong>{students.length}</strong>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.class}</td>
                    <td>{new Date(student.enrollment).toLocaleDateString()}</td>
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

export default ViewStudents;
