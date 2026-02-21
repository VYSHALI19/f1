import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import FormField from '../components/FormField';
import { marksData, studentsData } from '../data/dummyData';

export default function AddPerformance({ onAddPerformance }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    subject: '',
    marks: '',
    totalMarks: 100,
    attendance: '',
    semester: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const subjects = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English', label: 'English' },
    { value: 'Science', label: 'Science' },
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Physical Education', label: 'Physical Education' }
  ];

  const semesters = [
    { value: 'Sem 1', label: 'Semester 1' },
    { value: 'Sem 2', label: 'Semester 2' }
  ];

  const validator = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.marks) newErrors.marks = 'Marks are required';
    if (formData.marks < 0 || formData.marks > 100) newErrors.marks = 'Marks must be between 0-100';
    if (!formData.attendance) newErrors.attendance = 'Attendance is required';
    if (formData.attendance < 0 || formData.attendance > 100) newErrors.attendance = 'Attendance must be between 0-100';
    if (!formData.semester) newErrors.semester = 'Semester is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'marks' || name === 'attendance' ? parseInt(value) || '' : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validator();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add new record (in real app, would send to backend)
    const newRecord = {
      id: marksData.length + 1,
      studentId: Math.floor(Math.random() * 5) + 1,
      studentName: formData.studentName,
      subject: formData.subject,
      marks: formData.marks,
      totalMarks: formData.totalMarks,
      attendance: formData.attendance,
      semester: formData.semester
    };

    onAddPerformance(newRecord);
    setSuccess(true);
    setFormData({
      studentName: '',
      subject: '',
      marks: '',
      totalMarks: 100,
      attendance: '',
      semester: ''
    });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">➕ Add Student Performance</h1>

        {success && (
          <div className="bg-green-50 border border-secondary text-secondary p-4 rounded-lg mb-6">
            ✅ Performance record added successfully!
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
          <form onSubmit={handleSubmit}>
            <FormField
              label="Student Name"
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student name"
              required
              error={errors.studentName}
            />

            <FormField
              label="Subject"
              type="select"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              options={subjects}
              required
              error={errors.subject}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Marks Obtained"
                type="number"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                placeholder="0-100"
                required
                error={errors.marks}
              />

              <FormField
                label="Total Marks"
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                disabled
              />
            </div>

            <FormField
              label="Attendance %"
              type="number"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              placeholder="0-100"
              required
              error={errors.attendance}
            />

            <FormField
              label="Semester"
              type="select"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              options={semesters}
              required
              error={errors.semester}
            />

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition font-semibold"
              >
                Add Performance
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1 bg-gray-300 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
