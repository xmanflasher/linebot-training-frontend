// src/pages/liff/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

import EventInfoCard from '../../../components/event/EventInfoCard';
import AttendanceForm from '../../../components/event/AttendanceForm';
import AdminActionBar from '../../../components/event/AdminActionBar';

import { mockEventList } from '../../../mock/mockEventData';
import { mockReplies } from '../../../mock/mockReplyData';

const USE_MOCK = true; // ✅ 切換 mock 與 Firebase 模式
const CURRENT_USER_ID = 'user1'; // 模擬目前登入的使用者

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [reply, setReply] = useState({ status: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (USE_MOCK) {
          const foundEvent = mockEventList.find(e => e.id === id);
          if (!foundEvent) {
            setError('查無此模擬活動');
            return;
          }
          const mockUserReply = mockReplies.find(r => r.userId === CURRENT_USER_ID);
          setEvent(foundEvent);
          if (mockUserReply) {
            setReply({
              status: mockUserReply.status || '',
              notes: mockUserReply.comment || '',
            });
          }
        } else {
          const docRef = doc(db, 'events', id);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            setError('查無此活動');
            return;
          }

          const eventData = docSnap.data();
          setEvent({ id: docSnap.id, ...eventData });

          // TODO：這裡可以加上從 Firebase 拿使用者回覆的邏輯
        }
      } catch (err) {
        console.error(err);
        setError('資料讀取失敗');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = () => {
    if (USE_MOCK) {
      console.log('模擬送出回覆：', reply);
      alert(`送出成功！狀態：${reply.status}，備註：${reply.notes}`);
    } else {
      // TODO：實作 Firebase 送出邏輯
    }
  };

  if (loading) return <div className="p-4">載入中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 space-y-6">
      <EventInfoCard event={event} />
      <AttendanceForm
        value={reply}
        setValue={setReply}
        onSubmit={handleSubmit}
      />
      <AdminActionBar event={event} />
    </div>
  );
}
