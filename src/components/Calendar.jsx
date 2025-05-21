// src/components/Calendar.jsx
import React, { useState, useRef } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isSameDay } from 'date-fns';
import PopEventsList from './PopEventsList';

export default function Calendar({ events }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopover, setShowPopover] = useState(false);
  const calendarRef = useRef(null);

  const filteredEvents = events.filter((event) =>
    isSameDay(new Date(event.date), selectedDate)
  );

  const handleDateClick = (value) => {
    setSelectedDate(value);
    setShowPopover(true);
  };

  // 檢查當天是否有事件
  const hasEvent = (date) =>
    events.some((event) => isSameDay(new Date(event.date), date));

  return (
    <div className="relative flex flex-col items-center">
      <div ref={calendarRef}>
        <ReactCalendar
          value={selectedDate}
          onClickDay={handleDateClick}
          formatDay={(locale, date) => date.getDate().toString()}
          tileContent={({ date, view }) =>
            view === 'month' && hasEvent(date) ? (
              <div className="flex justify-center items-center mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
            ) : null
          }
        />
      </div>

      {showPopover && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-start pt-24"
          onClick={() => setShowPopover(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PopEventsList
              events={filteredEvents}
              selectedDate={selectedDate}
              onClose={() => setShowPopover(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}


// import React, { useState, useRef, useEffect } from 'react';
// import ReactCalendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { isSameDay } from 'date-fns';
// import PopEventsList from './PopEventsList';

// export default function Calendar({ events }) {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [popoverStyle, setPopoverStyle] = useState(null);
//   const [showPopover, setShowPopover] = useState(false);
//   const calendarRef = useRef(null);

//   const filteredEvents = events.filter((event) =>
//     isSameDay(new Date(event.date), selectedDate)
//   );

//   const handleDateClick = (value) => {
//     setSelectedDate(value);
//     const rect = calendarRef.current.getBoundingClientRect();

//     setPopoverStyle({
//       position: 'absolute',
//       top: rect.top + window.scrollY + 10,
//       left: rect.left + rect.width / 2,
//       transform: 'translateX(-50%)',
//       zIndex: 1000,
//     });

//     setShowPopover(true);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!calendarRef.current.contains(e.target)) {
//         setShowPopover(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative flex flex-col items-center">
//       <div ref={calendarRef}>
//         <ReactCalendar
//           value={selectedDate}
//           onClickDay={handleDateClick}
//         />
//       </div>

//       {showPopover && popoverStyle && (
//         <PopEventsList
//           events={filteredEvents}
//           selectedDate={selectedDate}
//           style={popoverStyle}
//           onClose={() => setShowPopover(false)}
//         />
//       )}
//     </div>
//   );
// }
