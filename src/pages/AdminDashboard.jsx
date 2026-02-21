import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StudentCard from '../components/StudentCard';
import { studentsData, marksData } from '../data/dummyData';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [students] = useState(studentsData.slice(0, 3)); // Show first 3 students as preview

  const getStudentMarks = (studentId) => {
    return marksData.filter(m => m.studentId === studentId);
  };

  const totalRecords = marksData.length;
  const avgMarks = Math.round(marksData.reduce((sum, m) => sum + m.marks, 0) / marksData.length);
  const avgAttendance = Math.round(marksData.reduce((sum, m) => sum + m.attendance, 0) / marksData.length);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📊 Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <p className="text-gray-600 text-sm mb-2">Total Records</p>
            <p className="text-4xl font-bold text-primary">{totalRecords}</p>
            <p className="text-xs text-gray-500 mt-2">Performance entries</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <p className="text-gray-600 text-sm mb-2">Average Marks</p>
            <p className="text-4xl font-bold text-secondary">{avgMarks}%</p>
            <p className="text-xs text-gray-500 mt-2">Across all students</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <p className="text-gray-600 text-sm mb-2">Avg Attendance</p>
            <p className="text-4xl font-bold text-warning">{avgAttendance}%</p>
            <p className="text-xs text-gray-500 mt-2">Overall attendance</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <p className="text-gray-600 text-sm mb-2">Total Students</p>
            <p className="text-4xl font-bold text-danger">{studentsData.length}</p>
            <p className="text-xs text-gray-500 mt-2">Enrolled students</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/admin/add-performance')}
            className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:scale-105 text-center"
          >
            <p className="text-2xl mb-2">➕</p>
            <p className="font-bold">Add Performance</p>
          </button>

          <button
            onClick={() => navigate('/admin/students')}
            className="bg-gradient-to-r from-secondary to-green-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:scale-105 text-center"
          >
            <p className="text-2xl mb-2">👥</p>
            <p className="font-bold">View Students</p>
          </button>

          <button
            onClick={() => navigate('/admin/analytics')}
            className="bg-gradient-to-r from-warning to-orange-600 text-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:scale-105 text-center"
          >
            <p className="text-2xl mb-2">📈</p>
            <p className="font-bold">View Analytics</p>
          </button>
        </div>

        {/* Preview Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Recent Students</h2>
            <button
              onClick={() => navigate('/admin/students')}
              className="text-primary hover:underline font-semibold"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {students.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                marks={getStudentMarks(student.id)}
                onView={() => alert(`View full profile for ${student.name}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
