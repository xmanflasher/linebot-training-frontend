// src/components/ui/select.jsx
import React from 'react';

export const Select = ({ className = '', children, ...props }) => (
  <select
    className={`border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </select>
);

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);
