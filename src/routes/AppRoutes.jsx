// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LiffLayout from "../layouts/LiffLayout";
//----------prod pages-----------
import ProfileForm from '../pages/liff/ProfileForm';
import EventDetailPage from '../pages/liff/practice-match/EventDetailPage';
import EventCreatePage from '../pages/liff/practice-match/EventCreatePage';
import RoleSelectionPage from '../pages/liff/RoleSelectionPage';
import CalendarPage from '../pages/liff/CalendarPage';
import EventTablePage from '../pages/liff/practice-match/EventTablePage';
// import StatsPage from '../pages/liff/StatsPage';
//test pages
import PracticeForm from '../pages/liff/PracticeForm';
import TestPage from '../pages/liff/TestPage';
import EntryPage from '../pages/liff/Entry';
import SelectTeamPage from '../pages/liff/team/SelectTeamPage';
import CreateTeamPage from '../pages/liff/team/CreateTeamPage';
import JoinTeamPage from '../pages/liff/team/JoinTeamPage';
import ExploreTeamPage from '../pages/liff/team/ExploreTeamPage';
function AppRoutes() {
  return (
    <Routes>
      {/* 預設導向入口 */}
      <Route path="/" element={<Navigate to="/entry" replace />} />

      {/* 入口頁（不套 Layout，可能有 loading 動畫） */}
      <Route path="/entry" element={<EntryPage />} />

      {/* ----------- LIFF 主功能（統一套 LiffLayout） ----------- */}
      <Route element={<LiffLayout />}>
        {/* 行事曆 & 活動 */}
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/event/create" element={<EventCreatePage />} />
        <Route path="/event/list" element={<EventTablePage />} />
        <Route path="/practice" element={<PracticeForm />} />

        {/* 使用者 & 團隊 */}
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/role" element={<RoleSelectionPage />} />
        <Route path="/team/select" element={<SelectTeamPage />} />
        <Route path="/team/create" element={<CreateTeamPage />} />
        <Route path="/team/join" element={<JoinTeamPage />} />
        <Route path="/team/explore" element={<ExploreTeamPage />} />

        {/* 測試 / 開發用 */}
        <Route path="/test" element={<TestPage />} />
        {/* <Route path="/stats" element={<StatsPage />} /> */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Route>

      {/* fallback 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes;
