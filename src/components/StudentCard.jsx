import React from 'react';

export default function StudentCard({ student, marks, onView }) {
  const avgMarks = marks.length > 0 
    ? Math.round(marks.reduce((sum, m) => sum + m.marks, 0) / marks.length) 
    : 0;

  const avgAttendance = marks.length > 0 
    ? Math.round(marks.reduce((sum, m) => sum + m.attendance, 0) / marks.length) 
    : 0;

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'D';
  };

  const grade = getGrade(avgMarks);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
          <p className="text-sm text-gray-500">{student.class}</p>
        </div>
        <span className="bg-secondary text-white px-3 py-1 rounded font-bold text-lg">
          {grade}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-xs text-gray-500">Avg Marks</p>
          <p className="text-xl font-bold text-primary">{avgMarks}%</p>
        </div>
        <div className="bg-green-50 p-3 rounded">
          <p className="text-xs text-gray-500">Attendance</p>
          <p className="text-xl font-bold text-secondary">{avgAttendance}%</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">Performance Trend</p>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div 
            className="bg-primary h-full rounded"
            style={{ width: `${avgMarks}%` }}
          ></div>
        </div>
      </div>

      <button
        onClick={onView}
        className="w-full bg-primary text-white py-2 px-3 rounded hover:bg-blue-600 transition text-sm font-medium"
      >
        View Details
      </button>
    </div>
  );
}
