// src/components/dock/ShoreZone.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function ShoreZone({ id, onDropLabel }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  const baseClass =
    'flex flex-col justify-center items-center h-full border-2 rounded-lg transition-colors duration-200';
  const highlightClass = isOver ? 'bg-blue-200 border-blue-500' : 'bg-blue-50 border-transparent';

  return (
    <div ref={setNodeRef} className={`${baseClass} ${highlightClass} w-1/12`}>
      <p className="text-center text-sm mt-2">{onDropLabel || '上岸區'}</p>
    </div>
  );
}
