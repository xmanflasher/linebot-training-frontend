// ✅ src/components/dock/BoatCard.jsx

import React, { useCallback } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';

export default function BoatCard({ boat, index, onClick }) {
  const { boatType, seatData } = boat;
  const totalAssigned = seatData.filter(s => s.name).length;
  const totalSeats = seatData.length;

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
      className={`relative z-50 p-3 border rounded-xl shadow transition-all duration-200 cursor-grab ${
        isOver ? 'bg-blue-100 scale-105' : 'hover:bg-gray-100'
      }`}
      style={{ touchAction: 'none' ,border: isOver ? '2px solid red' : undefined}}
      onClick={() => onClick(index)}
    >
      <h3 className="text-lg font-bold">{boatType} #{index + 1}</h3>
      <p className="text-sm">已分配：{totalAssigned} / {totalSeats}</p>

      {/* ✅ DEBUG 提示：Droppable 有作用 */}
      {isOver && <p className="text-red-500 text-xs">✅ Droppable Over!</p>}
    </div>
  );
}

// import React from 'react';
// import { useDraggable, useDroppable } from '@dnd-kit/core';

// export default function BoatCard({ boat, index, onClick }) {
//   const { boatType, seatData } = boat;
//   const totalAssigned = seatData.filter(s => s.name).length;
//   const totalSeats = seatData.length;

//   // 使用 useDraggable 來啟用拖曳功能
//   const { attributes, listeners, setNodeRef: setDraggableRef } = useDraggable({ id: `boat-${index}` });
//   // droppable：讓這艘船可以接收 CircleAvatar
//   const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: boat.id });
//   // 合併 draggable 與 droppable 的 ref
//   const setCombinedRef = (node) => {
//     setDraggableRef(node);
//     setDroppableRef(node);
//   };
//   return (
//     <div
//       ref={setCombinedRef}
//       {...attributes}
//       {...listeners}
//       className={`p-3 border rounded-xl shadow transition-all duration-200 cursor-grab ${isOver ? 'bg-blue-100 scale-105' : 'hover:bg-gray-100'}`}
//       style={{ touchAction: 'none' }} // 避免拖曳衝突
//       onClick={() => onClick(index)}
//     >
//       <h3 className="text-lg font-bold">{boatType} #{index + 1}</h3>
//       <p className="text-sm">已分配：{totalAssigned} / {totalSeats}</p>
// {isOver && <p className="text-red-500 text-xs">✅ Droppable Over!</p>}
//       {/* <div className="mt-2 grid grid-cols-4 gap-2">
//         {seatData.map((seat, i) => (
//           <div key={i} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs">
//             {seat.name || '-'}
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
//   // return (
//   //   <div
//   //     ref={setNodeRef}
//   //     {...attributes}
//   //     {...listeners}
//   //     className="cursor-grab"
//   //     style={{ touchAction: 'none' }} // ⬅️ 重要拖曳測試
//   //   >
//   //     <div
//   //       className="p-3 border rounded-xl shadow hover:bg-gray-100 cursor-pointer"
//   //       onClick={() => onClick(index)}
//   //     >
//   //       <h3 className="text-lg font-bold">{boatType} #{index + 1}</h3>
//   //       <p className="text-sm">已分配：{totalAssigned} / {totalSeats}</p>
//   //     </div>
//   //   </div>
//   // );
// }