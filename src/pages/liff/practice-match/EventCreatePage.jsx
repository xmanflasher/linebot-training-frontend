// src/pages/EventCreatePage.jsx
import React from 'react';
import { db } from '../../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import PracticeMatchForm from '../../../components/PracticeMatchForm';
import { useUserContext } from '../../../context/UserContext'; // 引入 context

export default function EventPage() {
  const navigate = useNavigate();
  const { mockMode } = useUserContext(); // 取用 mockMode

  const handleSubmit = async (data) => {
    if (mockMode) {
      console.log('[Mock Mode] Submit data:', {
        ...data,
        type: 'match',
        createdAt: new Date().toISOString(),
      });
      alert('Mock 模式：活動已模擬提交');
      return;
    }
    const docRef = await addDoc(collection(db, 'events'), {
      ...data,
      type: 'match',
      createdAt: new Date().toISOString(),
    });
    navigate(`/event/${docRef.id}`);
  };

  return <PracticeMatchForm onSubmit={handleSubmit} type="match" />;
}