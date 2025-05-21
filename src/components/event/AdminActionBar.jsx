// src/components/AdminActionBar.jsx
import React from 'react';
import { Button } from '../ui/button';

export default function AdminActionBar({ onNotify, onExport }) {
  return (
    <div className="flex space-x-2 mt-4">
      <Button onClick={onNotify}>提醒未回覆</Button>
      <Button onClick={onExport}>匯出報表</Button>
    </div>
  );
}