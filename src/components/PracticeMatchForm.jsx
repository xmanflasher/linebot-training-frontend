// src/components/PracticeMatchForm.jsx
import React, { useState } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, pointerWithin, DragOverlay } from '@dnd-kit/core';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import BoatSeatBoard from './dock/BoatSeatBoard';
import UnassignedList from './dock/UnassignedList';
import Bench from './dock/Bench';
import { DockArea } from './dock/DockArea';
import { mockProfiles } from '../mock/mockProfiles';

// 定義不同船型對應的座位配置
const BOAT_TYPES = {
  '競技小龍': { left: 5, right: 5, extra: ['鼓手', '舵手'] },
  '競技大龍': { left: 16, right: 16, extra: ['鼓手', '搶旗', '舵手'] },
  '傳統小龍': { left: 5, right: 5, extra: ['鼓手', '舵手'] },
  '傳統大龍': { left: 18, right: 18, extra: ['鼓手', '搶旗', '舵手'] },
};

export default function PracticeMatchForm({ onSubmit, type }) {
  // 初始化 DnD 拖曳偵測器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 拖曳觸發距離，與點擊觸發boatseatcard區分
      },
    })
  );
  // 表單基本資料狀態
  const [formData, setFormData] = useState({
    title: '',
    type,
    date: '',
    location: '',
    participants: '',
    group: '',
    weather: '',
    notes: '',
  });
  // 選擇的船型、現有船隻、當前選擇的船索引、備用區成員
  const [boatType, setBoatType] = useState('競技小龍');
  const [boats, setBoats] = useState([]);
  const [selectedBoatIndex, setSelectedBoatIndex] = useState(null);
  const [bench, setBench] = useState([]);
  // 處理表單欄位變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // 新增一艘船，依照船型設定左/右槳與額外職位座位
  const addBoat = () => {
    const config = BOAT_TYPES[boatType];
    const seats = [];
    for (let i = 0; i < config.left; i++) seats.push({ id: `L${i + 1}`, name: '', seat: `${i + 1}L` });
    for (let i = 0; i < config.right; i++) seats.push({ id: `R${i + 1}`, name: '', seat: `${i + 1}R` });
    config.extra.forEach((pos) => seats.push({ id: pos, name: '', seat: pos }));
    setBoats([...boats, { id: `${boats.length}`, boatType, seatData: seats }]);
  };
  // 處理送出表單邏輯，將所有資料組合後傳回上層
  const handleSubmit = async () => {
    try {
      const finalData = {
        ...formData,
        boats,
        bench,
        createdAt: new Date().toISOString(),
      };
      await onSubmit(finalData);
    } catch (error) {
      console.error('建立活動失敗:', error);
      alert('建立活動失敗，請稍後再試');
    }
  };
  function assignCrewmateToBoat(crewmate, boat) {
    const newSeats = [...boat.seatData];
    const position = crewmate.position;

    let indexToAssign = -1;
    if (position === 'L') {
      indexToAssign = newSeats.findIndex(s => s?.seat?.endsWith('L') && !s.name);
    } else if (position === 'R') {
      indexToAssign = newSeats.findIndex(s => s?.seat?.endsWith('R') && !s.name);
    } else {
      indexToAssign = newSeats.findIndex(s => s?.seat === position && !s.name);
    }

    if (indexToAssign !== -1) {
      newSeats[indexToAssign] = { ...crewmate };
      return { ...boat, seatData: newSeats };
    }

    // 無法分配
    return null;
  }
  // 拖曳結束後處理成員與船隻的分配
  const handleDragEnd = (event) => {
    const { active, over } = event;
      console.log('🏁 drag end:', active.id, '→', over?.id);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    //1. 拖曳整艘船進入岸邊區，刪除該船
    if (activeId.startsWith('boat-') && (overId === 'shore-left' || overId === 'right-shore')) {
      setBoats(prev => prev.filter(boat => boat.id !== activeId));
      return;
    }
  // 2. 拖曳 crewmate 到船上 → 執行分配邏輯
  if (activeId.startsWith('crewmate-') && overId.startsWith('boat-')) {
    const crewmate = bench.find(c => c.id === activeId);
    if (!crewmate) return;

    setBoats(prevBoats =>
      prevBoats.map(boat => {
        if (boat.id !== overId) return boat;
        const updatedBoat = assignCrewmateToBoat(crewmate, boat);
        return updatedBoat || boat;
      })
    );
    setBench(prev => prev.filter(c => c.id !== activeId));
    return;
  }
    // 3.拖曳人員到岸邊，從船上移除並放回 bench
    if (activeId.startsWith('crewmate-') && (overId === 'shore-left' || overId === 'right-shore')) {
      setBoats(prevBoats =>
        prevBoats.map(boat => {
          const updatedSeats  = boat.seatData.map(seat =>
            seat?.id === activeId ? null : seat
          );
          return { ...boat, seatData: updatedSeats  };
        })
      );

      setBench(prev => {
        if (prev.some(p => p.id === activeId)) return prev;
        return [...prev, { id: activeId }];
      });

      return;
    }
  };
  // 匯入 mockProfiles 為備用人員
  const handleImport = () => {
    const profiles = mockProfiles.map(p => ({
      id: p.id, name: p.name,
      avatar: p.avatarUrl,
      gender: p.gender,
      position: p.position,
    }));
    setBench((prev) => [...prev, ...profiles]);
  };

  return (
    <DndContext sensors={sensors}
      collisionDetection={pointerWithin}
      //onDragStart={(e) => console.log('🚀drag start', e.active.id, '→', e.over?.id)}
      //onDragEnd={(e) => console.log('🏁 drag end:', e.active.id, '→', e.over?.id)}
      //onDragEnd={handleDragEnd}
      onDragStart={(event) => {
        const activeId = event.active.id;
        if (activeId.startsWith('member-')) {
          const index = parseInt(activeId.replace('member-', ''), 10);
          assignCrewmateToBoat(boats[index]);
        }
      }}
      onDragEnd={handleDragEnd}
      >
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {/* 活動表單區塊 */}
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-bold">{type === 'practice' ? '發起練習' : '發起比賽'}</h2>
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="標題" />
            <Input name="date" type="datetime-local" value={formData.date} onChange={handleChange} placeholder="時間" />
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="地點" />
            <Input name="participants" value={formData.participants} onChange={handleChange} placeholder="參與人員（用逗號分隔，如 張三(L),李四(R)）" />
            <Input name="group" value={formData.group} onChange={handleChange} placeholder="組別（例如混合組）" />
            <Input name="weather" value={formData.weather} onChange={handleChange} placeholder="天氣資訊" />
            <Textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="備註" />
            <Button
              onClick={handleImport}
            >
              匯入所有成員
            </Button>
            <div className="flex items-center gap-2">
              <select value={boatType} onChange={(e) => setBoatType(e.target.value)} className="p-2 border rounded">
                {Object.keys(BOAT_TYPES).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <Button onClick={addBoat}>新增船</Button>
            </div>
          </CardContent>
        </Card>
        {/* 板凳區 */}
        <Bench bench={bench} />
        {/* 未分配人員列表:邏輯尚未定義 */}
        <UnassignedList
          participants={formData.participants}
          boats={boats}
          setBoats={setBoats}
          setBench={setBench}
        />
        {/* 碼頭區，顯示所有船 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">碼頭區</h3>
          <DockArea
            boats={boats}
            setBoats={setBoats}
            setSelectedBoatIndex={(index) =>
              setSelectedBoatIndex((prev) => (prev === index ? null : index))
            }
            bench={bench}
          />
        </div>
        {/* 選擇某艘船時，顯示該船的座位表 */}
        {selectedBoatIndex !== null && (
          <div className="p-4 border rounded-xl bg-blue-50">
            <h3 className="text-lg font-bold mb-2">
              {boats[selectedBoatIndex].boatType} #{selectedBoatIndex + 1} 座位配置
            </h3>
            <BoatSeatBoard
              isAdmin={true}
              rowers={boats[selectedBoatIndex].seatData}
              setRowers={(newSeats) => {
                const updated = [...boats];
                updated[selectedBoatIndex].seatData = newSeats;
                setBoats(updated);
              }}
            />
          </div>
        )}
        {/* 送出按鈕 */}
        <div className="text-center">
          <Button onClick={handleSubmit}>送出</Button>
        </div>
      </div>
    </DndContext>
  );
}