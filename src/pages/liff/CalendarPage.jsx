// src/pages/CalendarPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../components/Calendar';
//import EventList from '../../components/EventList';
import { fetchEvents } from '../../services/fetchEvents';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  //const [currentPage, setCurrentPage] = useState(1);
  //const itemsPerPage = 10;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loadEvents = async () => {
  //     const allEvents = await fetchEvents();
  //     setEvents(allEvents);
  //   };
  //   loadEvents();
  // }, []);

  useEffect(() => {
    const loadEvents = async () => {
      const allEvents = await fetchEvents();
      const parsedEvents = allEvents.map(event => ({
        ...event,
        date: new Date(event.date) // <- 保證 date 是 Date 物件
      }));
      setEvents(parsedEvents);
    };
    loadEvents();
  }, []);

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const paginatedEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">行事曆</h1>
      <Calendar events={events} onSelectEvent={handleSelectEvent} />
    </div>
  );
}