// src/pages/liff/TeamEntryPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TeamEntryPage() {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 假設你已經完成 LINE 登入，token 透過 liff.getAccessToken() 傳給後端
        async function fetchUserData() {
            try {
                const res = await axios.get("/api/user/me"); // 預設會回傳 user + team 資訊
                setUserInfo(res.data);
                if (res.data.team) {
                    // 已經加入團隊
                    navigate("/liff/calendar"); // 主頁
                } else {
                    // 尚未加入團隊，停留顯示選項
                    setLoading(false);
                }
            } catch (err) {
                console.error("取得用戶資料失敗", err);
            }
        }
        fetchUserData();
    }, [navigate]);

    if (loading) return <div>載入中...</div>;

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">歡迎加入團隊系統</h2>
            <p>你尚未加入任何團隊，請選擇以下操作：</p>
            <div className="flex flex-col gap-2">
                <button
                    className="bg-blue-600 text-white p-2 rounded"
                    onClick={() => navigate("/liff/create-team")}
                >
                    🔧 創建新團隊（我當管理員）
                </button>
                <button
                    className="bg-green-600 text-white p-2 rounded"
                    onClick={() => navigate("/liff/join-team")}
                >
                    👥 加入既有團隊（我當隊員）
                </button>
            </div>
        </div>
    );
}
