import React from 'react';

const Input = ({ type, name, label, placeholder, value, onChange, onBlur, required, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        style={{
            outline: 'none',
            boxShadow: 'none',
           }}
        className={`form-input w-full p-3 border  ${error ? 'border-red-500' : '!border-gray-300'} rounded-lg focus:outline-none`}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default Input;
