// src/services/fetchEvents.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { mockEventList } from '../mock/mockEventData';

const USE_MOCK = true; // ✅ 切換 mock 與 Firebase 模式

export const fetchEvents = async () => {
  if (USE_MOCK) {
    return mockEventList;
  }

  const practiceSnapshot = await getDocs(collection(db, 'practices'));
  const matchSnapshot = await getDocs(collection(db, 'matches'));

  const practiceEvents = practiceSnapshot.docs.map(doc => ({
    id: doc.id,
    type: 'practice',
    title: `練習 - ${doc.data().location}`,
    start: new Date(doc.data().date),
    end: new Date(doc.data().date),
    ...doc.data(),
  }));

  const matchEvents = matchSnapshot.docs.map(doc => ({
    id: doc.id,
    type: 'match',
    title: `比賽 - ${doc.data().location}`,
    start: new Date(doc.data().date),
    end: new Date(doc.data().date),
    ...doc.data(),
  }));

  return [...practiceEvents, ...matchEvents];
};

export const fetchReplies = async (eventId) => {
  if (USE_MOCK) {
    const { mockReplies } = await import('../mock/mockReplyData');
    return mockReplies.filter(reply => reply.eventId === eventId);
  }

  // TODO: implement fetch from Firebase if needed
  return [];
};
