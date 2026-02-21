import React from 'react';

export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options = [],
  name
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          name={name}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-danger' : 'border-gray-300'
          }`}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          rows="4"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-danger' : 'border-gray-300'
          }`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-danger' : 'border-gray-300'
          }`}
        />
      )}
      
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
}
