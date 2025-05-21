// ✅ src/components/dock/BoatSeatBoard.jsx
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableSeatCard } from './SortableSeatCard';

export default function BoatSeatBoard({ rowers, setRowers, isAdmin }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = rowers.findIndex((r) => r.id === active.id);
      const newIndex = rowers.findIndex((r) => r.id === over.id);
      setRowers((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleChangeName = (id, newName) => {
    setRowers((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name: newName } : r))
    );
  };
  const ZONE_ORDER = { head: 0, left: 1, right: 2, tail: 3 };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={isAdmin ? handleDragEnd : undefined}
    >
      <SortableContext items={rowers.map((r) => r.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-wrap justify-center">
          {rowers.map((r) => (
            <SortableSeatCard
              key={r.id}
              rower={r}
              isAdmin={isAdmin}
              onChangeName={handleChangeName}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// import {
//     DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
// } from '@dnd-kit/core';
// import {
//     SortableContext, useSortable, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { useState } from 'react';

// function SortableSeatCard({ rower }) {
//     const { attributes, listeners, setNodeRef, transform, transition } =
//         useSortable({ id: rower.id });

//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition,
//     };

//     return (
//         <div
//             ref={setNodeRef}
//             {...attributes}
//             {...listeners}
//             style={style}
//             className="p-3 m-1 bg-blue-100 border rounded-lg shadow cursor-move w-32 text-center"
//         >
//             <div className="font-bold">{rower.name}</div>
//             <div className="text-sm text-gray-600">{rower.seat}</div>
//         </div>
//     );
// }

// export default function BoatSeatBoard({ isAdmin }) {
//     const [rowers, setRowers] = useState([
//         { id: '1', name: 'Amy', seat: '1L' },
//         { id: '2', name: 'Bob', seat: '1R' },
//         { id: '3', name: 'Cara', seat: '2L' },
//         { id: '4', name: 'Dan', seat: '2R' },
//         // 更多槳手...
//     ]);

//     const sensors = useSensors(
//         useSensor(PointerSensor),
//         useSensor(KeyboardSensor, {
//             coordinateGetter: sortableKeyboardCoordinates,
//         })
//     );

//     const handleDragEnd = (event) => {
//         const { active, over } = event;
//         if (active.id !== over?.id) {
//             const oldIndex = rowers.findIndex((r) => r.id === active.id);
//             const newIndex = rowers.findIndex((r) => r.id === over.id);
//             setRowers((items) => arrayMove(items, oldIndex, newIndex));
//         }
//     };

//     return (
//         <DndContext
//             sensors={sensors}
//             collisionDetection={closestCenter}
//             onDragEnd={isAdmin ? handleDragEnd : undefined}
//         >
//             <SortableContext items={rowers.map((r) => r.id)} strategy={verticalListSortingStrategy}>
//                 <div className="flex flex-wrap justify-center">
//                     {rowers.map((r) => (
//                         <SortableSeatCard key={r.id} rower={r} />
//                     ))}
//                 </div>
//             </SortableContext>
//         </DndContext>
//     );
// }
