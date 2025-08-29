// src/hooks/useTeam.js
import { useTeamContext } from "../context/TeamContext";

export function useTeam() {
    const { teamId, setTeamId } = useTeamContext();
    return { teamId, setTeamId };
}