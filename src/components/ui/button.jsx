// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ className = '', children, ...props }) => (
  <button
    className={`bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded focus:outline-none ${className}`}
    {...props}
  >
    {children}
  </button>
);
