// ✅ src/components/dock/BoatSeatBoard.jsx
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates,rectSortingStrategy, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableSeatCard } from './SortableSeatCard';

// 定義不同船型對應的座位配置
export const BOAT_TYPES = {
  '競技小龍': { left: 5, right: 5, drum: ['DRUM'], steer: ['COX'] },
  '競技大龍': { left: 8, right: 8, extra: ['鼓手', '搶旗', '舵手'] },
  '傳統小龍': { left: 5, right: 5, extra: ['鼓手', '舵手'] },
  '傳統大龍': { left: 9, right: 9, extra: ['鼓手', '搶旗', '舵手'] },
};
// 這個函式負責依照船型建立一艘新船
export function createBoatSeatBoard(boatType, currentBoatCount) {
  const config = BOAT_TYPES[boatType];
  const seats = [];

  for (let i = 0; i < config.left; i++) {
    seats.push({ seatID: `L${i + 1}`, name: '', seat: `${i + 1}L`, tempseat: "" });
  }
  for (let i = 0; i < config.right; i++) {
    seats.push({ seatID: `R${i + 1}`, name: '', seat: `${i + 1}R`, tempseat: "" });
  }
  //config.extra.forEach((pos) => seats.push({ id: pos, name: '', seat: pos }));
  // 加入額外角色：鼓手最前、舵手最後、其他在中間
  if (config.drum) {
    config.drum.forEach((pos) => {
      seats.unshift({ seatID: pos, name: '', seat: pos, tempseat: "" }); // 加在最前面
    });
  }
  if (config.steer) {
    config.steer.forEach((pos) => {
      seats.push({ seatID: pos, name: '', seat: pos, tempseat: "" }); // 加在最後面
    });
  }
  return {
    boatID: `${currentBoatCount}`,
    boatType,
    seatData: seats,
  };
}
export default function BoatSeatBoard({ rowers, setRowers, isAdmin }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 拖曳觸發距離，與點擊觸發boatseatcard區分
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChangeName = (id, newName) => {
    setRowers((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name: newName } : r))
    );
  };
  //const ZONE_ORDER = { head: 0, left: 1, right: 2, tail: 3 };

  // 分組
  const drum = rowers.find(r => r.seat === 'DRUM');
  const cox = rowers.find(r => r.seat === 'COX');
  const left = rowers.filter(r => r.seat?.endsWith('L')).sort((a, b) => a.seat.localeCompare(b.seat));
  const right = rowers.filter(r => r.seat?.endsWith('R')).sort((a, b) => a.seat.localeCompare(b.seat));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setRowers((prev) => {
      const newRowers = [...prev];
      console.log('BoatSeatBoard line86', newRowers);
      const activeIndex = newRowers.findIndex(r => `seat-${r.seatID}` === active.id);
      const overIndex = newRowers.findIndex(r => `seat-${r.seatID}` === over.id);
      console.log('BoatSeatBoard line84', newRowers);
      if (activeIndex === -1 || overIndex === -1) return prev;

      // 交換 seat / seatID / tempseat
      const tempSeat = newRowers[activeIndex].seat;
      const tempSeatID = newRowers[activeIndex].seatID;
      const tempTempseat = newRowers[activeIndex].tempseat;

      newRowers[activeIndex].seat = newRowers[overIndex].seat;
      newRowers[activeIndex].seatID = newRowers[overIndex].seatID;
      newRowers[activeIndex].tempseat = newRowers[overIndex].tempseat;

      newRowers[overIndex].seat = tempSeat;
      newRowers[overIndex].seatID = tempSeatID;
      newRowers[overIndex].tempseat = tempTempseat;
      console.log('line99', active.id, over.id, activeIndex, overIndex);
      return newRowers;
    });
  };
  return (
    //     <DndContext
    //       sensors={sensors}
    //       collisionDetection={closestCenter}
    // onDragStart={(event) => {
    //   console.log("Drag started", event.active.id);
    // }}
    //       onDragEnd={handleDragEnd}
    //     >
    //  <SortableContext items={rowers.map((r) => r.seatID)} strategy={verticalListSortingStrategy}>
    //<SortableContext items={rowers.map((r) => r.seatID)} strategy={verticalListSortingStrategy}>
    //verticalListSortingStrategy horizontalListSortingStrategy rectSortingStrategy 
    <SortableContext items={rowers.map((r) => `seat-${r.seatID}`)} strategy={rectSortingStrategy}>
      {/* <SortableContext items={seatIds} strategy={horizontalListSortingStrategy}> */}
      <div className="flex flex-col items-center space-y-2">
        {/* 鼓手 */}
        {drum && (
          <SortableSeatCard
            key={drum.seatID}
            rower={drum}
            isAdmin={isAdmin}
            onChangeName={handleChangeName}
          />
        )}

        {/* 槳手區 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col items-end space-y-2">
            {left.map(r => (
              <SortableSeatCard
                key={r.seatID}
                rower={r}
                isAdmin={isAdmin}
                onChangeName={handleChangeName}
              />
            ))}
          </div>
          <div className="flex flex-col items-start space-y-2">
            {right.map(r => (
              <SortableSeatCard
                key={r.seatID}
                rower={r}
                isAdmin={isAdmin}
                onChangeName={handleChangeName}
              />
            ))}
          </div>
        </div>

        {/* 舵手 */}
        {cox && (
          <SortableSeatCard
            key={cox.seatID}
            rower={cox}
            isAdmin={isAdmin}
            onChangeName={handleChangeName}
          />
        )}
      </div>
    </SortableContext>
    // </DndContext>
  );
}