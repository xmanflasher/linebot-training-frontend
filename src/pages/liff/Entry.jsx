// src/pages/liff/Entry.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';

export default function EntryPage() {
    console.log('Testiing');
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    console.log('EntryPage user:', user, 'loading:', loading);
    useEffect(() => {
        if (loading) return;

        if (!user?.team_id) {
            navigate('/team/select'); // 無團隊 → 前往選擇頁
        } else {
            navigate('/liff/calendar'); // 有團隊 → 前往主頁
        }
    }, [loading, user, navigate]);

    return <div>驗證中...</div>;
}
