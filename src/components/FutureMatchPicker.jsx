// src/components/FutureMatchPicker.jsx
import React, { useEffect, useState } from 'react';

export default function FutureMatchPicker({ selected, setSelected }) {
  const [matches, setMatches] = useState([]);

  // 模擬假資料，之後可改為 Firebase getDocs
  useEffect(() => {
    setMatches([
      { id: 'match1', name: '4/28 台南盃' },
      { id: 'match2', name: '5/5 高雄賽' },
      { id: 'match3', name: '6/1 台北錦標' },
    ]);
  }, []);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((m) => m !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div>
      {matches.map((match) => (
        <label key={match.id} style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={selected.includes(match.id)}
            onChange={() => toggleSelect(match.id)}
          />
          {match.name}
        </label>
      ))}
    </div>
  );
}
