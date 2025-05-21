// src/components/PopEventsList.jsx
import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function PopEventsList({ events, selectedDate, onClose }) {
  const navigate = useNavigate();
  const maxVisible = 3;

  const handleMoreClick = () => {
    const dateParam = format(selectedDate, 'yyyy-MM-dd');
    navigate(`/liff/event-list?date=${dateParam}`);
    onClose(); // 關閉彈窗
  };

  const visibleEvents = events.slice(0, maxVisible);
  const hasMore = events.length > maxVisible;

  return (
    <div className="bg-green-50 border-2 border-green-400 shadow-xl rounded-xl p-4 w-80">
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-green-700">
          {format(selectedDate, 'yyyy/MM/dd')} 的事件
        </div>
        <button
          className="text-sm text-green-600 hover:underline"
          onClick={onClose}
        >
          關閉
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-green-500">沒有事件</div>
      ) : (
        <div className="space-y-2">
          {visibleEvents.map((event) => (
            <div
              key={event.id}
              className="p-2 border border-green-300 bg-white rounded hover:bg-green-100 cursor-pointer transition"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              <div className="font-semibold text-green-800">{event.title}</div>
              <div className="text-sm text-green-700">
                {format(new Date(event.date), 'HH:mm')} @ {event.location}
              </div>
              <div className="text-sm text-green-600">類型：{event.type}</div>
            </div>
          ))}

          {hasMore && (
            <button
              className="w-full text-green-700 text-sm underline hover:text-green-900 mt-2"
              onClick={handleMoreClick}
            >
              查看更多...
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// src/components/PopEventsList.jsx
// import React from 'react';
// import { format } from 'date-fns';
// import { useNavigate } from 'react-router-dom';

// export default function PopEventsList({ events, selectedDate, onClose }) {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-green-50 border-2 border-green-400 shadow-xl rounded-xl p-4 w-80">
//       <div className="flex justify-between items-center mb-2">
//         <div className="font-bold text-green-700">
//           {format(selectedDate, 'yyyy/MM/dd')} 的事件
//         </div>
//         <button
//           className="text-sm text-green-600 hover:underline"
//           onClick={onClose}
//         >
//           關閉
//         </button>
//       </div>

//       {events.length === 0 ? (
//         <div className="text-center text-green-500">沒有事件</div>
//       ) : (
//         <div className="space-y-2">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="p-2 border border-green-300 bg-white rounded hover:bg-green-100 cursor-pointer transition"
//               onClick={() => navigate(`/event/${event.id}`)}
//             >
//               <div className="font-semibold text-green-800">{event.title}</div>
//               <div className="text-sm text-green-700">
//                 {format(new Date(event.date), 'HH:mm')} @ {event.location}
//               </div>
//               <div className="text-sm text-green-600">類型：{event.type}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
