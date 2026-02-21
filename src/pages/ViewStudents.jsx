import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StudentCard from '../components/StudentCard';
import { studentsData, marksData } from '../data/dummyData';

export default function ViewStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(studentsData);
  }, []);

  const getStudentMarks = (studentId) => {
    return marksData.filter(m => m.studentId === studentId);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👥 View All Students</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              marks={getStudentMarks(student.id)}
              onView={() => {
                // Could navigate to detailed student view
                alert(`Viewing details for ${student.name}`);
              }}
            />
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Summary Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-primary">{students.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Records</p>
              <p className="text-3xl font-bold text-secondary">{marksData.length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Avg Marks</p>
              <p className="text-3xl font-bold text-warning">
                {Math.round(marksData.reduce((sum, m) => sum + m.marks, 0) / marksData.length)}%
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Avg Attendance</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round(marksData.reduce((sum, m) => sum + m.attendance, 0) / marksData.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
