import React, { useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import { marksData, studentsData } from '../data/dummyData';

export default function AdminReports() {
  const studentReports = useMemo(() => {
    return studentsData.map(student => {
      const studentMarks = marksData.filter(m => m.studentId === student.id);
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

      return {
        ...student,
        avgMarks,
        avgAttendance,
        grade: getGrade(avgMarks),
        recordCount: studentMarks.length
      };
    });
  }, []);

  const subjectReports = useMemo(() => {
    const subjects = {};
    marksData.forEach(record => {
      if (!subjects[record.subject]) {
        subjects[record.subject] = {
          name: record.subject,
          records: 0,
          totalMarks: 0,
          avgMarks: 0,
          topScore: 0,
          lowestScore: 100
        };
      }
      subjects[record.subject].records++;
      subjects[record.subject].totalMarks += record.marks;
      subjects[record.subject].topScore = Math.max(subjects[record.subject].topScore, record.marks);
      subjects[record.subject].lowestScore = Math.min(subjects[record.subject].lowestScore, record.marks);
    });

    return Object.values(subjects).map(s => ({
      ...s,
      avgMarks: Math.round(s.totalMarks / s.records)
    }));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📋 Performance Reports</h1>

        {/* Student Reports */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Performance Report</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Student Name</th>
                  <th className="px-6 py-4 text-left">Class</th>
                  <th className="px-6 py-4 text-center">Avg Marks</th>
                  <th className="px-6 py-4 text-center">Grade</th>
                  <th className="px-6 py-4 text-center">Attendance</th>
                  <th className="px-6 py-4 text-center">Records</th>
                </tr>
              </thead>
              <tbody>
                {studentReports.map((student, idx) => (
                  <tr key={student.id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{student.name}</td>
                    <td className="px-6 py-4">{student.class}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-50 text-primary px-3 py-1 rounded font-semibold">
                        {student.avgMarks}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded font-bold text-white ${
                        student.grade === 'A+' || student.grade === 'A' ? 'bg-green-500' :
                        student.grade === 'B' ? 'bg-blue-500' :
                        student.grade === 'C' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">{student.avgAttendance}%</td>
                    <td className="px-6 py-4 text-center">{student.recordCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject Reports */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject Performance Report</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Subject</th>
                  <th className="px-6 py-4 text-center">Records</th>
                  <th className="px-6 py-4 text-center">Avg Marks</th>
                  <th className="px-6 py-4 text-center">Highest</th>
                  <th className="px-6 py-4 text-center">Lowest</th>
                </tr>
              </thead>
              <tbody>
                {subjectReports.map((subject, idx) => (
                  <tr key={subject.name} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium">{subject.name}</td>
                    <td className="px-6 py-4 text-center">{subject.records}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-50 text-secondary px-3 py-1 rounded font-semibold">
                        {subject.avgMarks}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-50 text-primary px-3 py-1 rounded font-semibold">
                        {subject.topScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-red-50 text-danger px-3 py-1 rounded font-semibold">
                        {subject.lowestScore}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="mt-8 bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          🖨️ Print Reports
        </button>
      </div>
    </div>
  );
}
