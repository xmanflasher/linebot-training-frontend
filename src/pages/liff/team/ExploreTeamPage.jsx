import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ExploreTeamPage() {
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMode, setSearchMode] = useState('name'); // 'name' or 'id'
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/teams/popular').then(res => setTeams(res.data));
    }, []);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`/api/teams/search?${searchMode}=${searchTerm}`);
            setTeams(res.data);
        } catch (err) {
            alert('搜尋失敗');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center">探索團隊</h2>

            {/* 搜尋區域 */}
            <div className="flex space-x-2">
                <input
                    type="text"
                    className="flex-1 border px-3 py-2 rounded"
                    placeholder={`依${searchMode === 'name' ? '名稱' : 'ID'}搜尋團隊...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="border px-2 py-2 rounded"
                    value={searchMode}
                    onChange={(e) => setSearchMode(e.target.value)}
                >
                    <option value="name">名稱</option>
                    <option value="id">ID</option>
                </select>
                <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
                    搜尋
                </button>
            </div>

            {/* 隊伍卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="border rounded-lg p-4 hover:shadow cursor-pointer"
                        onClick={() => navigate(`/team/${team.id}`)}
                    >
                        <div className="flex items-center space-x-4">
                            <img src={team.logo || '/default-logo.png'} className="w-12 h-12 rounded-full" alt="logo" />
                            <div>
                                <div className="font-bold text-lg">{team.name}</div>
                                <div className="text-sm text-gray-500">ID: {team.id}</div>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-700 text-sm line-clamp-2">{team.description}</p>
                        {team.isRecruiting && (
                            <span className="inline-block mt-2 text-xs text-white bg-green-500 px-2 py-1 rounded">
                                積極招生中
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
