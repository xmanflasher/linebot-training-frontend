// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
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
function AppRoutes() {
  return (
    <Routes>
      {/* ----------prod pages----------- */}
      {/* <Route path="/" element={<Navigate to="/liff/calendar" replace />} /> */}
      <Route path="/" element={<Navigate to="/entry" replace />} />
      <Route path="/liff/calendar" element={<CalendarPage />} />
      <Route path="/event/:id" element={<EventDetailPage />} />
      <Route path="/liff/event-list" element={<EventTablePage />} />
      <Route path="/liff/event" element={<EventCreatePage />} />
      <Route path="/liff/practice" element={<PracticeForm />} />
      <Route path="/liff/profile" element={<ProfileForm />} />
      <Route path="/liff/role" element={<RoleSelectionPage />} />
      {/* ----------test pages----------- */}
      {/* <Route path="/liff/stats" element={<StatsPage />} />
      <Route path="/liff/admin" element={<AdminPage />} /> */}
      <Route path="/liff/test" element={<TestPage />} />
      <Route path="*" element={<div>404 Not Found</div>} /> {/* fallback route */}
      <Route path="/entry" element={<EntryPage />} />
      <Route path="/team/select" element={<SelectTeamPage />} />
      <Route path="/team/create" element={<CreateTeamPage />} />
      <Route path="/team/join" element={<JoinTeamPage />} />
    </Routes>
  );
}

export default AppRoutes;
