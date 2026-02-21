import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import { BarChartComponent, PieChartComponent, LineChartComponent } from '../components/Charts';
import { marksData, studentsData } from '../data/dummyData';

export default function AdminAnalytics() {
  // Process data for charts
  const subjectAnalytics = useMemo(() => {
    const subjects = {};
    marksData.forEach(record => {
      if (!subjects[record.subject]) {
        subjects[record.subject] = { name: record.subject, avg: 0, count: 0, total: 0 };
      }
      subjects[record.subject].total += record.marks;
      subjects[record.subject].count += 1;
    });

    return Object.values(subjects).map(s => ({
      name: s.name,
      value: Math.round(s.total / s.count),
      avg: Math.round(s.total / s.count)
    }));
  }, []);

  const gradeDistribution = useMemo(() => {
    const grades = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0 };
    
    marksData.forEach(record => {
      if (record.marks >= 90) grades['A+']++;
      else if (record.marks >= 80) grades['A']++;
      else if (record.marks >= 70) grades['B']++;
      else if (record.marks >= 60) grades['C']++;
      else grades['D']++;
    });

    return Object.entries(grades).map(([grade, count]) => ({
      name: `Grade ${grade}`,
      value: count
    }));
  }, []);

  const studentPerformance = useMemo(() => {
    const students = {};
    marksData.forEach(record => {
      if (!students[record.studentName]) {
        students[record.studentName] = { name: record.studentName, avg: 0, total: 0, count: 0 };
      }
      students[record.studentName].total += record.marks;
      students[record.studentName].count += 1;
    });

    return Object.values(students)
      .map(s => ({
        name: s.name.split(' ')[0],
        value: Math.round(s.total / s.count)
      }))
      .sort((a, b) => b.value - a.value);
  }, []);

  const attendanceAnalytics = useMemo(() => {
    const attendanceRanges = {
      '90-100%': 0,
      '80-89%': 0,
      '70-79%': 0,
      '60-69%': 0,
      'Below 60%': 0
    };

    marksData.forEach(record => {
      if (record.attendance >= 90) attendanceRanges['90-100%']++;
      else if (record.attendance >= 80) attendanceRanges['80-89%']++;
      else if (record.attendance >= 70) attendanceRanges['70-79%']++;
      else if (record.attendance >= 60) attendanceRanges['60-69%']++;
      else attendanceRanges['Below 60%']++;
    });

    return Object.entries(attendanceRanges).map(([range, count]) => ({
      name: range,
      value: count
    }));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📈 Analytics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">Total Records</p>
            <p className="text-3xl font-bold text-primary">{marksData.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">Avg Score</p>
            <p className="text-3xl font-bold text-secondary">
              {Math.round(marksData.reduce((sum, m) => sum + m.marks, 0) / marksData.length)}%
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">Avg Attendance</p>
            <p className="text-3xl font-bold text-warning">
              {Math.round(marksData.reduce((sum, m) => sum + m.attendance, 0) / marksData.length)}%
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm">Total Students</p>
            <p className="text-3xl font-bold text-primary">{studentsData.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BarChartComponent
            data={subjectAnalytics}
            dataKey="avg"
            title="Average Marks by Subject"
          />
          <PieChartComponent
            data={gradeDistribution}
            title="Grade Distribution"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BarChartComponent
            data={studentPerformance}
            dataKey="value"
            title="Top Students Performance"
          />
          <PieChartComponent
            data={attendanceAnalytics}
            title="Attendance Distribution"
          />
        </div>
      </div>
    </div>
  );
}
