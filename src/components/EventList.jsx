// src/components/EventList.jsx
import React from 'react';
import { Button } from './ui/button';

export default function EventList({ events, total, page, onPageChange, onSelectEvent }) {
  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">活動列表</h2>
      <ul className="space-y-2 max-h-[400px] overflow-y-auto">
        {events.map(event => (
          <li
            key={event.id}
            className="p-3 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectEvent(event)}
          >
            <strong>{event.title}</strong><br />
            <span>{new Date(event.start).toLocaleString()}</span>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? 'default' : 'outline'}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
