// src/pages/liff/CreateTeamPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TeamForm from './TeamForm';

export default function CreateTeamPage() {
    const [team, setTeam] = useState({
        name: '',
        description: '',
        location: '',
        logoUrl: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        try {
            await axios.post('/api/teams/create', team, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/liff/calendar');
        } catch (error) {
            alert(error.response?.data?.message || '創建失敗');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold px-4 pt-4">創建團隊</h2>
            <TeamForm team={team} onChange={setTeam} onSubmit={handleSubmit} submitText="創建" />
        </div>
    );
}

// // src/pages/liff/CreateTeamPage.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function CreateTeamPage() {
//     const [teamName, setTeamName] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('jwt'); // 從登入後取得的 token
//         try {
//             await axios.post('/api/teams/create', { name: teamName }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             navigate('/liff/calendar');
//         } catch (error) {
//             alert(error.response?.data?.message || '創建失敗');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>創建團隊</h2>
//             <input
//                 value={teamName}
//                 onChange={(e) => setTeamName(e.target.value)}
//                 placeholder="輸入團隊名稱"
//                 required
//             />
//             <button type="submit">創建</button>
//         </form>
//     );
// }

// export default CreateTeamPage;
