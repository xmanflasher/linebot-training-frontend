// src/components/dock/DockArea.jsx
import React
  //, { useState } 
  from 'react';
import BoatCard from './BoatCard';
import ShoreZone from './ShoreZone';

export function DockArea({ boats, setSelectedBoatIndex, selectedBoatIndex, updateBoat }) {
  return (
    <div className="flex w-full h-64 bg-blue-100 rounded-xl shadow-inner p-2 gap-2">
      {/* 左岸區 */}
      <ShoreZone id="shore-left" />

      {/* 中間：碼頭區＋船隻 */}
      {/* /<div ref={setDockRef} className="flex-1 flex gap-4 overflow-x-auto"> */}
      <div className="flex-1 flex gap-4 overflow-x-auto">
        {boats.map((boat, index) => (
          <BoatCard
            key={index}
            boat={boat}
            index={index}
            onClick={(clickedIndex) =>
              setSelectedBoatIndex(prev =>
                prev === clickedIndex ? null : clickedIndex // 再次點擊則關閉
              )
            }
            isSelected={index === selectedBoatIndex}
            updateBoat={updateBoat}
          />
        ))}
      </div>

      {/* 右岸區 */}
      <ShoreZone id="shore-right" />
    </div>
    // <DragOverlay>
    //   {activeBoat ? (
    //     <BoatCard
    //       boat={activeBoat}
    //       index={0} // 純展示用
    //       onClick={() => { }}
    //     />
    //   ) : null}
    // </DragOverlay>
    // </DndContext>
  );
}