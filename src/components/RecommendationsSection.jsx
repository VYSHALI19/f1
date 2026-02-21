import React from 'react';

export default function RecommendationsSection({ studentMarks, averageMarks }) {
  const generateRecommendations = () => {
    const recommendations = [];

    // Find weak subjects
    if (studentMarks && studentMarks.length > 0) {
      const weakSubjects = studentMarks.filter(m => m.marks < 70);
      if (weakSubjects.length > 0) {
        recommendations.push({
          type: 'warning',
          icon: '⚠️',
          text: `Focus on improving ${weakSubjects.map(s => s.subject).join(', ')}. Consider extra study sessions.`
        });
      }

      // Check attendance
      const lowAttendance = studentMarks.filter(m => m.attendance < 80);
      if (lowAttendance.length > 0) {
        recommendations.push({
          type: 'warning',
          icon: '📅',
          text: 'Improve your attendance. Regular class attendance is important for better performance.'
        });
      }

      // Excellent subjects
      const excellentSubjects = studentMarks.filter(m => m.marks >= 90);
      if (excellentSubjects.length > 0) {
        recommendations.push({
          type: 'success',
          icon: '⭐',
          text: `Excellent performance in ${excellentSubjects.map(s => s.subject).join(', ')}. Keep up the good work!`
        });
      }
    }

    // General recommendations
    if (averageMarks >= 90) {
      recommendations.push({
        type: 'success',
        icon: '✨',
        text: 'Outstanding performance! Consider helping peers with studies.'
      });
    } else if (averageMarks >= 70) {
      recommendations.push({
        type: 'info',
        icon: '📚',
        text: 'Good progress! Form study groups with classmates to further improve.'
      });
    } else {
      recommendations.push({
        type: 'warning',
        icon: '🎯',
        text: 'Work harder! Consult with teachers and dedicate more time to studies.'
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Recommendations</h2>
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-l-4 ${
              rec.type === 'success'
                ? 'bg-green-50 border-secondary text-green-800'
                : rec.type === 'warning'
                ? 'bg-yellow-50 border-warning text-yellow-800'
                : 'bg-blue-50 border-primary text-blue-800'
            }`}
          >
            <p>
              <span className="text-lg mr-2">{rec.icon}</span>
              {rec.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
