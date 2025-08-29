// src/components/Toolbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, matchPath, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import ProfileCard from './profile/ProfileCard';
import { useTeam } from "../hooks/useTeam";

export function TopBar() {
  // const { user, currentTeam } = useUserContext();
  const { profile: user } = useUserContext();
  const { currentTeam } = useTeam();
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const avatarRef = useRef();

  // 點擊大頭貼 → 設定顯示卡片與位置
  const handleAvatarClick = () => {
    const rect = avatarRef.current?.getBoundingClientRect();
    setAnchorRect(rect);
    console.log("Toolbar.jsx user", user);
    setShowCard(true);
  };

  // 點擊卡片 → 導向個人頁
  const handleCardClick = () => {
    setShowCard(false);
    console.log("handleCardClick user:", user);
    navigate('/liff/profile');
  };

  // 點擊外部 → 關閉卡片
  useEffect(() => {
    if (!showCard) return;
    const handleClickOutside = (event) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target) &&
        !document.getElementById('profile-card')?.contains(event.target)
      ) {
        setShowCard(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCard]);

  const baseClass = 'px-3 py-1 rounded text-sm';
  const inactiveClass = 'bg-gray-700 hover:bg-gray-600';

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white px-4 py-2 flex justify-between items-center z-50">
      {/* 使用者頭像與名稱 */}
      <div
        ref={avatarRef}
        onClick={handleAvatarClick}
        className={`${baseClass} flex items-center cursor-pointer ${inactiveClass}`}
      >
        <img
          src={user?.avatar || '/default-avatar.png'}
          alt="avatar"
          className="w-6 h-6 rounded-full mr-2"
        />
        <span>{user?.name || '使用者'}</span>
      </div>

      {/* 當前團隊 */}
      <div
        onClick={() => navigate('/team/select')}
        className={`${baseClass} cursor-pointer ${inactiveClass}`}
      >
        {currentTeam?.name || '團隊管理'}
      </div>

      {showCard && user && (
        <ProfileCard
          profile={{
            userId: user.userId,
            name: user.name,
            avatarUrl: user.avatar,
            gender: user.gender,
            character: user.character,
          }}
          anchorRect={anchorRect}
          onClose={() => setShowCard(false)}
          //onClick={handleCardClick}
          onClick={(e) => {
            //e.stopPropagation();  // ✅ 阻止事件冒泡
            handleCardClick();    // 或其他行為
          }}
        />
      )}
    </div>
  );
}

export default function Toolbar() {
  //const { user, loading } = useUserContext();
  const { profile: user, profileLoading: loading } = useUserContext();
  const location = useLocation();
  //const { mockMode, setMockMode } = useUserContext();
  //const toggleMockMode = () => setMockMode((prev) => !prev);
  console.log("Toolbar user:", user);
  console.log("Toolbar loading:", loading);
  //console.log("Toolbar mockMode:", mockMode);
  //console.log("Toolbar setMockMode:", setMockMode);
  if (loading) return null;

  const baseClass = "px-3 py-1 rounded text-sm";
  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "bg-gray-700 hover:bg-gray-600";

  const isActive = (paths) =>
    paths.some((path) => matchPath({ path, end: false }, location.pathname));

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-4 py-2 flex flex-wrap justify-around z-50">
      <Link
        to="/liff/calendar"
        className={`${baseClass} ${isActive(['/liff/calendar']) ? activeClass : inactiveClass}`}
      >
        📅 行事曆
      </Link>
      <Link
        to="/liff/event-list"
        className={`${baseClass} ${isActive(['/liff/event-list']) ? activeClass : inactiveClass}`}
      >
        📋 事件列表
      </Link>
      <Link
        to="/liff/practice"
        className={`${baseClass} ${isActive(['/liff/practice']) ? activeClass : inactiveClass}`}
      >
        🏋️ 發起訓練
      </Link>
      <Link
        to="/liff/match"
        className={`${baseClass} ${isActive(['/liff/match']) ? activeClass : inactiveClass}`}
      >
        ⚽ 發起比賽
      </Link>
      <Link
        to="/event/mock1"
        className={`${baseClass} ${isActive(['/event/mock1']) ? activeClass : inactiveClass}`}
      >
        🧪 測試事件
      </Link>
      {user?.role === 'leader' && (
        <Link
          to="/create-event"
          className={`${baseClass} ${isActive(['/create-event']) ? activeClass : inactiveClass}`}
        >
          ➕ 發起活動
        </Link>
      )}
      {user?.role === 'admin' && (
        <Link
          to="/manage-users"
          className={`${baseClass} ${isActive(['/manage-users']) ? activeClass : inactiveClass}`}
        >
          👥 使用者管理
        </Link>
      )}
      {/* <button
        onClick={toggleMockMode}
        className="px-3 py-1 rounded bg-yellow-500 text-black text-sm"
      >
        {mockMode ? '🟢 Mock 模式' : '⚪ 關閉 Mock'}
      </button> */}
    </div>
  );
}