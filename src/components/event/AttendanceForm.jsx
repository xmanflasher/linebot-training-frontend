// src/components/AttendanceForm.jsx
import React from 'react';
import { Input } from '../ui/input';
import { Select, SelectItem } from '../ui/select';
import { Button } from '../ui/button';

export default function AttendanceForm({ onSubmit, value, setValue }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">出席回覆</h3>
      <Select value={value.status} onValueChange={(val) => setValue({ ...value, status: val })}>
        <SelectItem value="yes">出席</SelectItem>
        <SelectItem value="no">不出席</SelectItem>
        <SelectItem value="maybe">尚未確定</SelectItem>
      </Select>
      <Input placeholder="想補充的話..." value={value.notes || ''} onChange={(e) => setValue({ ...value, notes: e.target.value })} />
      <Button onClick={onSubmit}>送出回覆</Button>
    </div>
  );
}