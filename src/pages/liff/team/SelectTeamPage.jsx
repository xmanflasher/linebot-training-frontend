// src/pages/liff/team/SelectTeamPage.jsx
import { useNavigate } from 'react-router-dom';

export default function SelectTeamPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6 text-center">
            <h2 className="text-2xl font-bold">你還沒有加入任何團隊</h2>
            <p className="text-gray-600">請選擇以下其中一項：</p>
            <div className="space-y-4">
                <button
                    onClick={() => navigate('/team/create')}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    ➕ 創建團隊
                </button>
                <button
                    onClick={() => navigate('/team/join')}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    👥 加入現有團隊
                </button>
            </div>
        </div>
    );
}
