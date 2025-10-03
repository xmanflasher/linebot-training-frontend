// src/hooks/useTeam.js
import { useUserContext } from "../context/UserContext";
import { useTeamContext } from "../context/TeamContext";
import { useMemo } from "react";

export function useTeam() {
    const { profile: user, setProfile } = useUserContext();
    const { teamId, setTeamId } = useTeamContext();
    console.log('[useTeam] user:', user);
    // 找到目前選中的 team
    const currentTeam = useMemo(() => {
        return user?.teams?.find((team) => team.id === teamId) || null;
    }, [user, teamId]);

    // 切換 team
    const switchTeam = (id) => {
        setTeamId(id);
        // 如果要同步 user context (例如 Toolbar 跟 SelectTeamPage 同步)，可以在這裡更新
        setProfile((prev) => ({
            ...prev,
            currentTeamId: id,
        }));
    };

    return {
        teamId,
        setTeamId: switchTeam, // ✅ 讓 setTeamId 變成高階方法
        currentTeam,            // ✅ 提供完整 team 資訊
        joinedTeams: user?.teamIds || [], // ✅ 提供已加入隊伍列表
    };
}
