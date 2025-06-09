// src/components/Toolbar.jsx
import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function Toolbar() {
  const { user, loading } = useUserContext();
  const location = useLocation();
  const { mockMode, setMockMode } = useUserContext();
  const toggleMockMode = () => setMockMode((prev) => !prev);
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
      <button
        onClick={toggleMockMode}
        className="px-3 py-1 rounded bg-yellow-500 text-black text-sm"
      >
        {mockMode ? '🟢 Mock 模式' : '⚪ 關閉 Mock'}
      </button>
    </div>
  );
}




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useUserContext } from '../context/UserContext';

// export default function Toolbar() {
//   const { user, loading } = useUserContext();

//   if (loading) return null;

//   return (
//     <div className="bg-gray-800 text-white px-4 py-2 flex gap-4">
//       <Link to="/liff/calendar">📅 行事曆</Link>
//       <Link to="/liff/event-list">📋 事件列表</Link>
//       {user?.role === 'leader' && <Link to="/create-event">➕ 發起活動</Link>}
//       {user?.role === 'admin' && <Link to="/manage-users">👥 使用者管理</Link>}
//     </div>
//   );
// }