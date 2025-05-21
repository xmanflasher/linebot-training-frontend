// src/components/RoleSelector.jsx
import React from 'react';

export default function RoleSelector({ value, onChange }) {
  const roles = ['左', '右', '砝碼', '舵', '龍頭'];

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} required>
      <option value="">選擇角色</option>
      {roles.map((role) => (
        <option key={role} value={role}>{role}</option>
      ))}
    </select>
  );
}
