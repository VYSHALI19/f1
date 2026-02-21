import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import RecommendationsSection from '../components/RecommendationsSection';
import { LineChartComponent, BarChartComponent } from '../components/Charts';
import { marksData, studentsData } from '../data/dummyData';

export default function StudentDashboard({ user }) {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    // Find student by name
    const student = studentsData.find(s => s.name.toLowerCase().includes(user?.name?.toLowerCase() || ''));
    if (student) {
      setStudentData(student);
      setStudentMarks(marksData.filter(m => m.studentId === student.id));
    }
  }, [user]);

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Loading student data...</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const avgMarks = studentMarks.length > 0
    ? Math.round(studentMarks.reduce((sum, m) => sum + m.marks, 0) / studentMarks.length)
    : 0;

  const avgAttendance = studentMarks.length > 0
    ? Math.round(studentMarks.reduce((sum, m) => sum + m.attendance, 0) / studentMarks.length)
    : 0;

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'D';
  };

  const subjectData = studentMarks.map(m => ({
    name: m.subject,
    marks: m.marks,
    attendance: m.attendance
  }));

  const chartData = studentMarks.map(m => ({
    name: m.subject.substring(0, 3),
    marks: m.marks,
    attendance: m.attendance
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">👨‍🎓 Welcome, {studentData.name}!</h1>
          <p className="text-blue-100">Class: {studentData.class}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Overall Grade</p>
            <p className="text-4xl font-bold text-secondary">{getGrade(avgMarks)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Average Marks</p>
            <p className="text-4xl font-bold text-primary">{avgMarks}%</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Attendance</p>
            <p className="text-4xl font-bold text-warning">{avgAttendance}%</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Total Records</p>
            <p className="text-4xl font-bold text-danger">{studentMarks.length}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Performance Progress</h2>
          <ProgressBar percentage={avgMarks} label="Overall Performance" colorClass="auto" />
          <ProgressBar percentage={avgAttendance} label="Attendance Rate" colorClass="auto" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BarChartComponent
            data={chartData}
            dataKey="marks"
            title="Subject-wise Marks"
          />
          <BarChartComponent
            data={chartData}
            dataKey="attendance"
            title="Subject-wise Attendance"
          />
        </div>

        {/* Subject Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Subject Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Subject</th>
                  <th className="px-6 py-3 text-center">Marks</th>
                  <th className="px-6 py-3 text-center">Attendance</th>
                  <th className="px-6 py-3 text-center">Semester</th>
                </tr>
              </thead>
              <tbody>
                {studentMarks.map((mark, idx) => (
                  <tr key={mark.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-3 font-medium">{mark.subject}</td>
                    <td className="px-6 py-3 text-center">
                      <span className="bg-blue-50 text-primary px-3 py-1 rounded font-bold">
                        {mark.marks}%
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="bg-green-50 text-secondary px-3 py-1 rounded font-bold">
                        {mark.attendance}%
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600">{mark.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommendations */}
        <RecommendationsSection
          studentMarks={studentMarks}
          averageMarks={avgMarks}
        />

        {/* Logout Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full mt-8 bg-danger text-white py-3 px-4 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
