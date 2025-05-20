// src/pages/EventCreatePage.jsx
import React from 'react';
import { db } from '../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import PracticeMatchForm from '../../components/PracticeMatchForm';

export default function EventCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const docRef = await addDoc(collection(db, 'events'), {
      ...data,
      type: 'match',
      createdAt: new Date().toISOString(),
    });
    navigate(`/event/${docRef.id}`);
  };

  return <PracticeMatchForm onSubmit={handleSubmit} type="match" />;
}
// import React, { useState } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';

// export default function MatchForm() {
//   const [match, setMatch] = useState({ date: '', location: '', participants: '' });

//   const handleChange = (e) => {
//     setMatch({ ...match, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       await addDoc(collection(db, 'matches'), {
//         ...match,
//         createdAt: new Date().toISOString(),
//       });
//       alert('比賽已建立');
//     } catch (err) {
//       console.error(err);
//       alert('建立失敗');
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4 space-y-4">
//       <Card>
//         <CardContent className="space-y-3">
//           <h2 className="text-xl font-bold">🏁 建立比賽</h2>
//           <Input name="date" type="datetime-local" value={match.date} onChange={handleChange} placeholder="比賽時間" />
//           <Input name="location" value={match.location} onChange={handleChange} placeholder="地點" />
//           <Input name="participants" value={match.participants} onChange={handleChange} placeholder="參與人員（用逗號分隔）" />
//           <Button onClick={handleSubmit}>送出</Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
