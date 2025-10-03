// src/contexts/TeamContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, isMock } from '../config'; // 確保這個路徑正確
import { mockTeamData } from '../mock/mockTeamData';
const TeamContext = createContext();

export function TeamProvider({ children }) {
    const [teamId, setTeamId] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const groupId = params.get("groupId");

        if (groupId) {
            setTeamId(groupId);
        } else if (!teamId) {
            // 沒有帶 groupId 且 context 尚未有值 → 導向選擇團隊
            navigate("/team/select");
        }
    }, [location.search, teamId, navigate]);

    return (
        <TeamContext.Provider value={{ teamId, setTeamId }}>
            {children}
        </TeamContext.Provider>
    );
}

export function useTeamContext() {
    return useContext(TeamContext);
}
