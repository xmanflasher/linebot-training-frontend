// src/components/ui/radio-group.jsx
import React from 'react';

export const RadioGroup = ({ name, value, onChange, children, className = '' }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { name, checked: value === child.props.value, onChange })
    )}
  </div>
);

export const RadioGroupItem = ({ value, label, name, checked, onChange }) => (
  <label className="inline-flex items-center gap-2">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-radio h-4 w-4 text-blue-600"
    />
    <span>{label}</span>
  </label>
);
