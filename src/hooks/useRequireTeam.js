// src/hooks/useRequireTeam.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTeam } from "./useTeam";

export function useRequireTeam() {
    const { teamId } = useTeam();
    const navigate = useNavigate();

    useEffect(() => {
        if (!teamId) {
            navigate("/team/select");
        }
    }, [teamId, navigate]);

    return teamId;
}
