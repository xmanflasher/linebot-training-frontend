// ✅ src/components/dock/UnassignedList.jsx
import React, { useEffect } from 'react';

export default function UnassignedList({ participants, boats, setBoats, setBench }) {
  useEffect(() => {
    const parsed = participants
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const match = p.match(/(.+?)\((L|R)\)/);
        return match ? { name: match[1], side: match[2] } : { name: p, side: null };
      });

    const assigned = [];
    const bench = [];
    const newBoats = boats.map((boat) => {
      const updatedSeats = boat.seatData.map((seat) => {
        if (seat.name) return seat;
        const candidate = parsed.find((p) => {
          if (seat.seat.includes('L') && p.side === 'L') return true;
          if (seat.seat.includes('R') && p.side === 'R') return true;
          if (!seat.seat.match(/[LR]/)) return true; // extra positions
          if (!p.side) return true;
          return false;
        });
        if (candidate) {
          assigned.push(candidate.name);
          return { ...seat, name: candidate.name };
        }
        return seat;
      });
      return { ...boat, seatData: updatedSeats };
    });

    const unassigned = parsed.filter((p) => !assigned.includes(p.name));
    setBoats(newBoats);
    setBench(unassigned);
  }, [participants]);

  return null;
}