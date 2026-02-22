import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/AddPerformance.css';

const AddPerformance = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    subject: '',
    marks: '',
    attendance: '',
    semester: 'Sem 1'
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role !== 'admin') {
      navigate('/');
    }
    setCurrentUser(user);
  }, [navigate]);

  const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Computer Science'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentName) newErrors.studentName = 'Student name is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.marks || isNaN(formData.marks) || formData.marks < 0 || formData.marks > 100) {
      newErrors.marks = 'Marks must be between 0 and 100';
    }
    if (!formData.attendance || isNaN(formData.attendance) || formData.attendance < 0 || formData.attendance > 100) {
      newErrors.attendance = 'Attendance must be between 0 and 100';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to localStorage
    const performances = JSON.parse(localStorage.getItem('performances') || '[]');
    const newPerformance = {
      id: Date.now(),
      studentId: parseInt(formData.studentId) || Math.random(),
      studentName: formData.studentName,
      subject: formData.subject,
      marks: parseInt(formData.marks),
      attendance: parseInt(formData.attendance),
      semester: formData.semester,
      date: new Date().toISOString()
    };
    performances.push(newPerformance);
    localStorage.setItem('performances', JSON.stringify(performances));

    setMessage('Performance added successfully!');
    setFormData({
      studentId: '',
      studentName: '',
      subject: '',
      marks: '',
      attendance: '',
      semester: 'Sem 1'
    });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="add-performance">
      <Header
        title="Add Student Performance"
        userName={currentUser.name}
        userEmail={currentUser.email}
        userRole="admin"
      />

      <nav className="admin-nav">
        <button onClick={() => navigate('/admin/dashboard')} className="nav-btn">Dashboard</button>
        <button onClick={() => navigate('/admin/add-performance')} className="nav-btn active">Add Performance</button>
        <button onClick={() => navigate('/admin/view-students')} className="nav-btn">View Students</button>
        <button onClick={() => navigate('/admin/reports')} className="nav-btn">Reports</button>
        <button onClick={() => navigate('/admin/analytics')} className="nav-btn">Analytics</button>
      </nav>

      <main className="form-container">
        <div className="form-card">
          {message && <div className="success-message">{message}</div>}

          <form onSubmit={handleSubmit} className="performance-form">
            <div className="form-group">
              <label htmlFor="studentName">Student Name *</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter student name"
              />
              {errors.studentName && <span className="error-message">{errors.studentName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value="">Select Subject</option>
                {subjects.map(subj => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="marks">Marks (0-100) *</label>
                <input
                  type="number"
                  id="marks"
                  name="marks"
                  value={formData.marks}
                  onChange={handleInputChange}
                  placeholder="Enter marks"
                  min="0"
                  max="100"
                />
                {errors.marks && <span className="error-message">{errors.marks}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="attendance">Attendance (0-100) *</label>
                <input
                  type="number"
                  id="attendance"
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleInputChange}
                  placeholder="Enter attendance %"
                  min="0"
                  max="100"
                />
                {errors.attendance && <span className="error-message">{errors.attendance}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
              >
                <option value="Sem 1">Semester 1</option>
                <option value="Sem 2">Semester 2</option>
                <option value="Sem 3">Semester 3</option>
                <option value="Sem 4">Semester 4</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">Add Performance</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPerformance;
