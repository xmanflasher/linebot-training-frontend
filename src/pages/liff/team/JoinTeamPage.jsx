// src/pages/liff/JoinTeamPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function JoinTeamPage() {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/teams/all').then(res => setTeams(res.data));
    }, []);

    const handleJoin = async (teamId) => {
        const token = localStorage.getItem('jwt');
        try {
            await axios.post(`/api/teams/${teamId}/join`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/liff/calendar');
        } catch (error) {
            alert(error.response?.data?.message || '加入失敗');
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">選擇要加入的團隊</h2>
            <ul className="space-y-2">
                {teams.map(team => (
                    <li key={team.id} className="border p-4 rounded shadow">
                        <div className="flex items-center space-x-4">
                            {team.logoUrl && <img src={team.logoUrl} alt="logo" className="w-12 h-12 rounded-full" />}
                            <div>
                                <div className="font-bold">{team.name}</div>
                                <div className="text-sm text-gray-600">{team.description}</div>
                                <div className="text-sm text-gray-500">📍 {team.location}</div>
                            </div>
                        </div>
                        <button onClick={() => handleJoin(team.id)} className="mt-2 bg-green-600 text-white py-1 px-3 rounded">
                            加入
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


// // src/pages/liff/JoinTeamPage.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function JoinTeamPage() {
//     const [teams, setTeams] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('/api/teams/all').then(res => setTeams(res.data));
//     }, []);

//     const handleJoin = async (teamId) => {
//         const token = localStorage.getItem('jwt');
//         try {
//             await axios.post(`/api/teams/${teamId}/join`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             navigate('/liff/calendar');
//         } catch (error) {
//             alert(error.response?.data?.message || '加入失敗');
//         }
//     };

//     return (
//         <div>
//             <h2>選擇要加入的團隊</h2>
//             <ul>
//                 {teams.map(team => (
//                     <li key={team.id}>
//                         {team.name}
//                         <button onClick={() => handleJoin(team.id)}>加入</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default JoinTeamPage;
