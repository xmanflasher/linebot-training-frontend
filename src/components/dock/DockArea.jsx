// src/components/dock/DockArea.jsx
import React, { useState } from 'react';
import {
  useDroppable, DndContext, PointerSensor, useSensors, useSensor,
  DragOverlay, pointerWithin
} from '@dnd-kit/core';
import BoatCard from './BoatCard';
import ShoreZone from './ShoreZone';

export function DockArea({ boats, setBoats, setSelectedBoatIndex, setBench, bench }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 或更大一點
      },
    })
  ); // ✅ 加這行！拖曳測試
  const [activeBoat, setActiveBoat] = useState(null);
  //const { isOver: isLeftOver, setNodeRef: setLeftRef } = useDroppable({ id: 'shore-left' });
  //const { isOver: isRightOver, setNodeRef: setRightRef } = useDroppable({ id: 'shore-right' });
  //const { setNodeRef: setDockRef } = useDroppable({ id: 'dock' });
  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log('🏁 drag end:', active.id, '→', over?.id); // ✅ debug 加這行！
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // ✅ 拖 BoatCard 到岸上 → 刪除該船
    // if (activeId.startsWith('boat-') && (overId === 'shore-left' || overId === 'shore-right')) {
    //   setBoats((prevBoats) => prevBoats.filter((boat) => boat.id !== activeId));
    // }
    if (activeId.startsWith('boat-') && (overId === 'shore-left' || overId === 'shore-right')) {
      setBoats((prev) => prev.filter((_, i) => `boat-${i}` !== activeId));
      return;
    }

    // 🧍‍♂️ 2. 如果是 bench 的人員被拖到某艘船上 → 填入座位
    const droppedMember = bench.find((member) => member.userId === activeId);
    const targetBoatIndex = parseInt(overId);

    if (droppedMember && !isNaN(targetBoatIndex)) {
      setBoats((prevBoats) => {
        const updatedBoats = [...prevBoats];
        const boat = updatedBoats[targetBoatIndex];
        const emptyIndex = boat.seatData.findIndex((seat) => !seat.name);

        if (emptyIndex !== -1) {
          boat.seatData[emptyIndex] = { ...droppedMember, seat: emptyIndex + 1 };
        }
        return updatedBoats;
      });

      setBench((prev) => prev.filter((m) => m.userId !== activeId));
    }
  };

  const shoreClass = (isOver) =>
    `w-24 h-full bg-gray-300 transition-all duration-200 rounded-md ${isOver ? 'ring-4 ring-red-400' : ''}`;

  return (
    <DndContext sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={(event) => {
        const activeId = event.active.id;
        if (activeId.startsWith('boat-')) {
          const index = parseInt(activeId.replace('boat-', ''), 10);
          setActiveBoat(boats[index]);
        }
      }}
      onDragEnd={(event) => {
        // existing handleDragEnd logic
        handleDragEnd(event); // ✅ 要補這行
        setActiveBoat(null);
      }}

      onDragCancel={() => {
        setActiveBoat(null);
      }}
    //onDragStart={(e) => console.log('🚀drag start', e.active.id, '→', e.over?.id)}
    //onDragEnd={(e) => console.log('🏁 drag end:', e.active.id, '→', e.over?.id)}
    //onDragEnd={handleDragEnd}
    >
      <div className="flex w-full h-64 bg-blue-100 rounded-xl shadow-inner p-2 gap-2">
        {/* 左岸區 */}
        <ShoreZone id="shore-left" />

        {/* 中間：碼頭區＋船隻 */}
        {/* /<div ref={setDockRef} className="flex-1 flex gap-4 overflow-x-auto"> */}
        <div  className="flex-1 flex gap-4 overflow-x-auto">
          {boats.map((boat, index) => (
            <BoatCard
              key={index}
              boat={boat}
              index={index}
              onClick={() => setSelectedBoatIndex(index)}
            />
          ))}
        </div>

        {/* 右岸區 */}
        <ShoreZone id="shore-right" />
      </div>
      <DragOverlay>
        {activeBoat ? (
          <BoatCard
            boat={activeBoat}
            index={0} // 純展示用
            onClick={() => { }}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}