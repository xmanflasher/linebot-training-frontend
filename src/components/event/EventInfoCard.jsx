// src/components/EventInfoCard.jsx
import React from 'react';
import { Card, CardContent } from '../ui/card';

export default function EventInfoCard({ event }) {
  if (!event) return null;

  return (
    <Card className="mb-4">
      <CardContent className="space-y-2">
        <h2 className="text-xl font-bold">{event.title}</h2>
        <p>📅 {new Date(event.date).toLocaleString()}</p>
        <p>📍 {event.location}</p>
        <p>👥 {event.participants}</p>
        <p>🌀 組別：{event.group}</p>
        <p>☁️ 天氣：{event.weather}</p>
        <p>📝 備註：{event.notes}</p>
      </CardContent>
    </Card>
  );
}