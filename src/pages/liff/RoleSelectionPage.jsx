// src/pages/RoleSelectionPage.jsx
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectItem } from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const roles = ['左', '右', '砝碼', '舵', '龍頭'];

export default function RoleSelectionPage() {
  const [data, setData] = useState({ name: '', role: '', eventId: '' });

  const handleSubmit = async () => {
    if (!data.name || !data.role || !data.eventId) return alert('請填寫完整');

    try {
      await setDoc(doc(db, `roles`, `${data.eventId}_${data.name}`), data);
      alert('角色已儲存');
    } catch (err) {
      console.error(err);
      alert('儲存失敗');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardContent className="space-y-3">
          <h2 className="text-xl font-bold">🎯 選擇角色</h2>
          <Input name="name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="你的名字" />
          <Input name="eventId" value={data.eventId} onChange={e => setData({ ...data, eventId: e.target.value })} placeholder="活動 ID" />
          <Select name="role" value={data.role} onValueChange={(val) => setData({ ...data, role: val })}>
            {roles.map(role => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </Select>
          <Button onClick={handleSubmit}>儲存</Button>
        </CardContent>
      </Card>
    </div>
  );
}