// ✅ src/components/dock/BoatCard.jsx

import React, { useCallback, useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import BoatSeatBoard from './BoatSeatBoard';

export default function BoatCard({ boat, index, onClick, updateBoat, isAdmin = true }) {
  const { boatType, seatData } = boat;
  const totalAssigned = seatData.filter(s => s.name).length;
  const totalSeats = seatData.length;
  const [showSeats, setShowSeats] = useState(false);

  const { attributes, listeners, setNodeRef: setDraggableRef } = useDraggable({ id: `boat-${index}` });
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: `boat-${index}` });

  // ✅ 用 useCallback 合併 ref，防止覆蓋
  const setCombinedRef = useCallback(
    (node) => {
      setDraggableRef(node);
      setDroppableRef(node);
    },
    [setDraggableRef, setDroppableRef]
  );

  return (
    <div
      ref={setCombinedRef}
      {...attributes}
      {...listeners}
      className={`relative z-50 p-3 border rounded-xl shadow transition-all duration-200 cursor-grab ${isOver ? 'bg-blue-100 scale-105' : 'hover:bg-gray-100'
        }`}
      style={{ touchAction: 'none', border: isOver ? '2px solid red' : undefined }}
      onClick={() => onClick(index)}
    >
      <h3 className="text-lg font-bold">{boatType} #{index + 1}</h3>
      <p className="text-sm">已分配：{totalAssigned} / {totalSeats}</p>

      {showSeats && (
        <div className="mt-2">
          <BoatSeatBoard
            isAdmin={isAdmin}
            rowers={seatData}
            setRowers={(newSeats) => updateBoat(index, newSeats)}
          />
        </div>
      )}
      {/* ✅ DEBUG 提示：Droppable 有作用 */}
      {/* {isOver && <p className="text-red-500 text-xs">✅ Droppable Over!</p>} */}
    </div>
  );
}