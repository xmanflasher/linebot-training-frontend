// src/pages/liff/PracticeForm.jsx
//import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import PracticeMatchForm from '../../components/PracticeMatchForm';

export default function PracticeForm() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const docRef = await addDoc(collection(db, 'events'), {
      ...data,
      type: 'practice',
      createdAt: new Date().toISOString(),
    });
    navigate(`/event/${docRef.id}`);
  };

  return <PracticeMatchForm onSubmit={handleSubmit} type="practice" />;
}


// import React, { useState } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../../lib/firebase';
// import ParticipantInput from '../../components/ParticipantInput';
// //import RoleSelector from '../../components/RoleSelector';
// //import WeatherInput from '../../components/WeatherInput';
// import FutureMatchPicker from '../../components/FutureMatchPicker';

// export default function PracticeForm() {
//   const [datetime, setDatetime] = useState('');
//   const [location, setLocation] = useState('');
//   const [participants, setParticipants] = useState([{ name: '', role: '' }]);
//   const [matches, setMatches] = useState([]);
//   //const [weather, setWeather] = useState({ temp: '', rain: '', manual: true });
//   const [notes, setNotes] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, 'practices'), {
//         datetime,
//         location,
//         participants,
//         matches,
//         //weather,
//         notes,
//         reminderStatus: {
//           pre3days: false,
//           pre1day: false,
//         },
//         createdAt: new Date()
//       });
//       alert('練習已建立 ✅');
//     } catch (error) {
//       console.error('Error adding practice:', error);
//       alert('建立失敗 ❌');
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>建立練習</h2>
//       <form onSubmit={handleSubmit}>
//         <label>🕒 練習時間：</label>
//         <input
//           type="datetime-local"
//           value={datetime}
//           onChange={(e) => setDatetime(e.target.value)}
//           required
//         />

//         <label>📍 地點：</label>
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           required
//         />

//         <label>👥 出席人員：</label>
//         <ParticipantInput participants={participants} setParticipants={setParticipants} />

//         <label>🎯 預備賽事：</label>
//         <FutureMatchPicker selected={matches} setSelected={setMatches} />

//         {/* <label>🌤️ 天氣資訊：</label>
//         <WeatherInput weather={weather} setWeather={setWeather} /> */}

//         <label>📝 備註：</label>
//         <textarea
//           rows={4}
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />

//         <button type="submit">📤 建立練習</button>
//       </form>
//     </div>
//   );
// }
