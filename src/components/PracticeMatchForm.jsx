// src/components/PracticeMatchForm.jsx
import React, { useState } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, pointerWithin, DragOverlay, TouchSensor } from '@dnd-kit/core';
import {
  SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import BoatSeatBoard, { BOAT_TYPES, createBoatSeatBoard } from './dock/BoatSeatBoard';
import UnassignedList from './dock/UnassignedList';
import Bench from './dock/Bench';
import { DockArea } from './dock/DockArea';
import { mockProfiles } from '../mock/mockProfiles';
import BoatCard from './dock/BoatCard';

export default function PracticeMatchForm({ onSubmit, type }) {
  // 初始化 DnD 拖曳偵測器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 拖曳觸發距離，與點擊觸發boatseatcard區分
      },
    }),
    //useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
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
  const [roster, setRoster] = useState([]); // 來存儲出席名單
  // 處理表單欄位變更
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // 新增一艘船，依照船型設定左/右槳與額外職位座位 BoatSeatBoard.jsx line 41
  const addBoat = () => {
    const newBoat = createBoatSeatBoard(boatType, boats.length);
    setBoats([...boats, newBoat]);
  };
  // 處理送出表單邏輯，將所有資料組合後傳回上層
  const handleSubmit = async () => {
    try {
      // 更新 roster 資料
      const updatedRoster = updateRosterFromSeatMap(roster, boats);
      //只傳 id 與 boatType
      const sanitizedBoats = boats.map(({ id, boatType }) => ({
        id,
        boatType
      }));
      const finalData = {
        ...formData,
        boats: sanitizedBoats,
        roster: updatedRoster, // 將出席名單加入
        //bench,
        createdAt: new Date().toISOString(),
      };
      console.log('🧪 finalData:', JSON.stringify(finalData, null, 2));
      //await onSubmit(finalData);
    } catch (error) {
      console.error('建立活動失敗:', error);
      alert('建立活動失敗，請稍後再試');
    }
  };
  function assignCrewmateToBoat(crewmate, boat) {
    const newSeats = [...boat.seatData];
    const character = crewmate.character;
    //console.log('🚀line76 boat:', boat.seatData.at(11));
    let indexToAssign = -1;
    if (character === '左') {
      indexToAssign = newSeats.findIndex(s => s?.seat?.endsWith('L') && !s.name);
    } else if (character === '右') {
      indexToAssign = newSeats.findIndex(s => s?.seat?.endsWith('R') && !s.name);
    } else {
      indexToAssign = newSeats.findIndex(s => s?.seat === character && !s.name);
    }
    //console.log('🚀line85 seatData:', newSeats.at(11));
    if (indexToAssign !== -1) {
      const seatLabel = newSeats[indexToAssign].seat;
      //newSeats[indexToAssign] = { ...crewmate }; 
      //crewmateData接上版本
      crewmate.tempseat = seatLabel; // 更新臨時座位標籤
      newSeats[indexToAssign] = {
        name: crewmate.name,
        seat: seatLabel,
        seatID: seatLabel,
        crewmateData: { ...crewmate },
        tempseat: crewmate.tempseat || 'bench' // 確保有 tempseat 屬性
      };
      return { updatedBoat: { ...boat, seatData: newSeats }, seatLabel };
    }
    console.log('🚀line91 seatData:', newSeats.at(11));
    // 無法分配
    return null;
  }
  const [activeBoat] = useState(null);

  const updateBoat = (index, newBoat) => {
    setBoats(prev => prev.map((b, i) => i === index ? newBoat : b));
  };

  const removeFromBench = (crewmateId) => {
    setBench(prev => prev.filter(c => c.id !== crewmateId));
  };

  const updateRosterAssignment = (crewmateID, boatID, seat, tempseat) => {
    setRoster(prev =>
      prev.map(r =>
        r.crewmateID === crewmateID
          ? { ...r, boatID: String(boatID), seat: seat || '', tempseat }
          : r
      )
    );
  };

  // 交換兩個座位的資料並更新 boats 狀態
  const swapSeatsAndUpdate = (fromSeatID, toSeatID) => {
    setBoats(prevBoats => {
      return prevBoats.map(boat => {
        const fromIndex = boat.seatData.findIndex(s => s.seatID === fromSeatID);
        const toIndex = boat.seatData.findIndex(s => s.seatID === toSeatID);

        if (fromIndex === -1 || toIndex === -1) return boat;

        const newSeatData = [...boat.seatData];
        const fromSeat = newSeatData[fromIndex];
        const toSeat = newSeatData[toIndex];
        const fromTempseat = fromSeat.tempseat;
        const toTempseat = toSeat.tempseat;

        const fromCrewmate = fromSeat.crewmateData;
        const toCrewmate = toSeat.crewmateData;


        // 執行交換
        newSeatData[fromIndex] = {
          ...fromSeat,
          name: toCrewmate?.name || '',
          seat: fromSeat.seatID, // 保持一致
          crewmateData: toCrewmate,
          tempseat: fromTempseat, // 更新臨時座位標籤
        };
        newSeatData[toIndex] = {
          ...toSeat,
          name: fromCrewmate?.name || '',
          seat: toSeat.seatID,
          crewmateData: fromCrewmate,
          tempseat: toTempseat,
        };

        return { ...boat, seatData: newSeatData };
      });
    });
  };

  // 根據 seatMap 資訊更新 roster
  const updateRosterFromSeatMap = (roster, boats) => {
    console.log('boats181:', boats);
    return roster.map((member) => {
      console.log('member192:', member);
      let updatedBoatID = '';
      let updatedSeat = '';
      let updatedTempseat = '';

      for (const boat of boats) {
        const { boatID, seatData } = boat;

        for (const seat of seatData) {
          if (seat.crewmateData?.id === member.crewmateID) {
            updatedBoatID = boatID;
            updatedSeat = seat.seatID; // or seat.seat, 根據你要填入哪個格式
            updatedTempseat = seat.tempseat;
            break;
          }
        }

        if (updatedBoatID) break;
      }

      return {
        ...member,
        boatID: updatedBoatID,
        seat: updatedSeat,
        tempseat: updatedTempseat,
        // 若要順便更新 status 為參加，可以取消註解以下
        // status: updatedBoatID ? '參加' : member.status,
      };
    });
  };
  //handleDragEnd
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (
      handleDeleteBoat(activeId, overId) ||
      handleAssignCrewmate(activeId, overId) ||
      handleSwapSeats(activeId, overId)
    ) {
      return;
    }
  };

  const handleDeleteBoat = (activeId, overId) => {
    if (activeId.startsWith('boat-') && (overId === 'shore-left' || overId === 'shore-right')) {
      setBoats((prev) => prev.filter((_, i) => `boat-${i}` !== activeId));
      return true;
    }
    return false;
  };

  const handleAssignCrewmate = (activeId, overId) => {
    if (activeId.startsWith('crewmate-') && overId.startsWith('boat-')) {
      const originalID = activeId.replace('crewmate-', '');
      const crewmate = bench.find(c => c.id === originalID);
      if (!crewmate) return false;

      const boatIndex = parseInt(overId.replace('boat-', ''), 10);
      const boat = boats[boatIndex];
      const result = assignCrewmateToBoat(crewmate, boat);
      if (result) {
        const { updatedBoat, seatLabel } = result;
        updateBoat(boatIndex, updatedBoat);
        removeFromBench(originalID);
        updateRosterAssignment(crewmate.id, boatIndex, seatLabel, crewmate.tempseat);
        return true;
      }
    }
    return false;
  };

  const handleSwapSeats = (activeId, overId) => {
    if (activeId.startsWith('seat-') && overId.startsWith('seat-')) {
      const fromSeatID = activeId.replace('seat-', '');
      const toSeatID = overId.replace('seat-', '');
      swapSeatsAndUpdate(fromSeatID, toSeatID);
      console.log('test226')
      return true;
    }
    return false;
  };

  // method handleImport 匯入 mockProfiles 為備用人員
  const handleImport = () => {
    // 👇 先取得最新的 crewmateID
    const existingIds = new Set(roster.map(r => r.crewmateID));

    // 過濾 mockProfiles
    const newProfiles = mockProfiles
      .filter(p => !existingIds.has(p.id))
      .map(p => ({
        id: p.id,
        name: p.name,
        avatar: p.avatarUrl,
        gender: p.gender,
        character: p.character,
        status: '',
        tempseat: 'bench',
      }));

    const newRosterEntries = newProfiles.map(p => ({
      crewmateID: p.id,
      boatID: '',
      seat: '',
      seatID: '',
      status: 'non-responding',
      tempseat: 'bench',
    }));

    // ✅ 先加進 roster
    setRoster(prev => [...prev, ...newRosterEntries]);

    // ✅ 再加進 bench
    setBench(prev => [...prev, ...newProfiles]);
  };

  return (
    <DndContext sensors={sensors}
      collisionDetection={pointerWithin}
      // onDragStart={(e) => console.log('🚀drag start', e.active.id, '→', e.over?.id)}
      //onDragEnd={(e) => console.log('🏁 drag end:', e.active.id, '→', e.over?.id)}
      //onDragEnd={handleDragEnd}
      //暫時包起來
      onDragStart={(event) => {
        const activeId = event.active.id;
        console.log('🚀drag start', event.active.id, '→', event.over?.id)
        if (activeId.startsWith('member-')) {
          const index = parseInt(activeId.replace('member-', ''), 10);
          assignCrewmateToBoat(boats[index]);
        }
      }}

      // onDragEnd={handleDragEnd}
      onDragEnd={(event) => {
        console.log('🏁 drag end:', event.active.id, '→', event.over?.id);
        handleDragEnd(event);
      }}
    //暫時包起來
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
            //setSelectedBoatIndex={null}
            bench={bench}
            setSelectedBoatIndex={setSelectedBoatIndex}
            selectedBoatIndex={selectedBoatIndex}
            updateBoat={(index, newSeats) => {
              setBoats(prev =>
                prev.map((b, i) => (i === index ? { ...b, seatData: newSeats } : b))
              );
            }}
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
      <DragOverlay>
        {activeBoat ? (
          <BoatCard
            boat={activeBoat}
            index={0}
            onClick={() => { }}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}