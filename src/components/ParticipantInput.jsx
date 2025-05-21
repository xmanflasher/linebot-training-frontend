// src/components/ParticipantInput.jsx
import React from 'react';
import RoleSelector from './RoleSelector';

export default function ParticipantInput({ participants, setParticipants }) {
  const handleChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const addParticipant = () => {
    setParticipants([...participants, { name: '', role: '' }]);
  };

  const removeParticipant = (index) => {
    const updated = [...participants];
    updated.splice(index, 1);
    setParticipants(updated);
  };

  return (
    <div>
      {participants.map((p, idx) => (
        <div key={idx} style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="姓名"
            value={p.name}
            onChange={(e) => handleChange(idx, 'name', e.target.value)}
            required
          />
          <RoleSelector
            value={p.role}
            onChange={(role) => handleChange(idx, 'role', role)}
          />
          <button type="button" onClick={() => removeParticipant(idx)}>❌</button>
        </div>
      ))}
      <button type="button" onClick={addParticipant}>➕ 新增人員</button>
    </div>
  );
}
