import React from 'react';

export default function ProgressBar({ percentage, label, colorClass = 'bg-primary' }) {
  const getColor = (percent) => {
    if (percent >= 90) return 'bg-secondary';
    if (percent >= 70) return 'bg-primary';
    if (percent >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  const color = colorClass === 'auto' ? getColor(percentage) : colorClass;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-bold text-gray-800">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
