// src/pages/liff/team/SelectTeamPage.jsx
//ver.9/4
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function SelectTeamPage() {
//   const [joinedTeams, setJoinedTeams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('jwt');
//     axios
//       .get('/api/teams/my', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setJoinedTeams(res.data))
//       .catch((err) => console.error('Failed to fetch teams:', err));
//   }, []);

//   const handleSwitchTeam = async (teamId) => {
//     const token = localStorage.getItem('jwt');
//     try {
//       await axios.post(`/api/teams/${teamId}/switch`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       navigate('/liff/calendar');
//     } catch (err) {
//       alert('切換失敗');
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-2xl font-bold text-center">選擇你的團隊</h2>

//       {joinedTeams.length > 0 ? (
//         <div className="space-y-4">
//           <p className="text-gray-600 text-center">你已加入以下團隊：</p>
//           <ul className="space-y-2">
//             {joinedTeams.map((team) => (
//               <li
//                 key={team.id}
//                 className="border p-4 rounded flex justify-between items-center hover:bg-gray-100"
//               >
//                 <div>
//                   <div className="font-bold">{team.name}</div>
//                   <div className="text-sm text-gray-500">{team.location}</div>
//                 </div>
//                 <button
//                   onClick={() => handleSwitchTeam(team.id)}
//                   className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 >
//                   切換
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <div className="text-center space-y-2">
//           <p className="text-gray-600">你還沒有加入任何團隊</p>
//         </div>
//       )}

//       <div className="pt-6 space-y-4">
//         <button
//           onClick={() => navigate('/team/create')}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           ➕ 創建團隊
//         </button>
//         <button
//           onClick={() => navigate('/team/explore')}
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           👀 探索其他團隊
//         </button>
//       </div>
//     </div>
//   );
// }

// src/pages/liff/team/SelectTeamPage.jsx
//v9.17
// src/pages/liff/team/SelectTeamPage.jsx
// v9.17
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTeam } from "../../../hooks/useTeam";
import { mockTeamData } from '../../../mock/mockTeamData';
import { isMock } from '../../../config'; // 確保這個路徑正確

export default function SelectTeamPage() {
  const { joinedTeams, setTeamId } = useTeam(); // ✅ 已加入隊伍 (來自 TeamContext)
  const [allTeams, setAllTeams] = useState([]); // 探索功能
  const navigate = useNavigate();

  useEffect(() => {
    if (isMock) {
      // ✅ mock 模式：直接塞 mock 資料
      setAllTeams(mockTeamData);
      return;
    }

    // ✅ 正常模式：打 API
    const token = localStorage.getItem("jwt");
    axios
      .get("/api/teams", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAllTeams(res.data))
      .catch((err) => console.error("Failed to fetch all teams:", err));
  }, []);

  const handleSwitchTeam = (teamId) => {
    setTeamId(teamId);
    navigate("/liff/calendar");
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">選擇你的團隊</h2>

      {/* 功能 1: 已加入的團隊 */}
      {joinedTeams.length > 0 ? (
        <div className="space-y-4">
          <p className="text-gray-600 text-center">你已加入以下團隊：</p>
          <ul className="space-y-2">
            {joinedTeams.map((team) => (
              <li
                key={team.id}
                className="border p-4 rounded flex justify-between items-center hover:bg-gray-100"
              >
                <div>
                  <div className="font-bold">{team.name}</div>
                  <div className="text-sm text-gray-500">{team.location}</div>
                </div>
                <button
                  onClick={() => handleSwitchTeam(team.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  切換
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center space-y-2">
          <p className="text-gray-600">你還沒有加入任何團隊</p>
        </div>
      )}

      {/* 功能 2: 探索其他團隊 */}
      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-2">探索其他團隊</h3>
        <ul className="space-y-2">
          {allTeams.map((team) => (
            <li
              key={team.id}
              className="border p-4 rounded flex justify-between items-center hover:bg-gray-100"
            >
              <div>
                <div className="font-bold">{team.name}</div>
                <div className="text-sm text-gray-500">
                  {team.location || "未設定地點"}
                </div>
              </div>
              <button
                onClick={() => navigate(`/team/${team.id}/join`)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                加入
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 功能 3: 創建新團隊 */}
      <div className="pt-6">
        <button
          onClick={() => navigate("/team/create")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ 創建團隊
        </button>
      </div>
    </div>
  );
}
