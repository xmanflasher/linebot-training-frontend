// src/components/dock/SortableSeatCard.jsx
import { CSS } from '@dnd-kit/utilities';
import { cn } from "../../lib/utils";
import { useSortable } from '@dnd-kit/sortable';
export function SortableSeatCard({ rower, onChangeName, isAdmin }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: rower.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const positionMismatch = rower.position && rower.seatPosition && rower.position !== rower.seatPosition;

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={cn("p-3 m-1 bg-blue-100 border rounded-lg shadow cursor-move w-32 text-center",
                positionMismatch ? "bg-red-200" : "bg-blue-100")}
        >
            {isAdmin ? (
                <input
                    type="text"
                    value={rower.name}
                    onChange={(e) => onChangeName(rower.id, e.target.value)}
                    className="font-bold text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
            ) : (
                <div className="font-bold">{rower.name}</div>
            )}
            <div className="text-sm text-gray-600">{rower.seat}</div>
        </div>
    );
}