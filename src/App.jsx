// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import { UserProvider } from './context/UserContext';
//----------prod pages-----------
import ProfileForm from './pages/liff/ProfileForm';
import EventDetailPage from './pages/liff/EventDetailPage';
import EventCreatePage from './pages/liff/EventCreatePage';
import RoleSelectionPage from './pages/liff/RoleSelectionPage';
import CalendarPage from './pages/liff/CalendarPage';
import EventListPage from './pages/liff/EventListPage';
// import StatsPage from './pages/liff/StatsPage';
//test pages
import PracticeForm from './pages/liff/PracticeForm';
// import AdminPage from './pages/liff/AdminPage';
import TestPage from './pages/liff/TestPage';
import './App.css';
//EventDetailPage http://localhost:3000/liff/mock123
function App() {
  return (
    <UserProvider>
      <Router>
        <div className="pb-16"> {/* 預留底部空間避免內容被 toolbar 擋住 */}
          <Routes>
            {/* ----------prod pages----------- */}
            {/* 預設首頁導向 /liff/calendar */}
            {<Route path="/" element={<Navigate to="/liff/calendar" replace />} />}
            <Route path="/liff/calendar" element={<CalendarPage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            {/* <Route path="/liff/:id" element={<EventDetailPage />} /> */}
            <Route path="/liff/event-list" element={<EventListPage />} />
            <Route path="/liff/event-create" element={<EventCreatePage />} />
            <Route path="/liff/practice" element={<PracticeForm />} />
            <Route path="/liff/profile" element={<ProfileForm />} />
            <Route path="/liff/role" element={<RoleSelectionPage />} />
            {/* ----------test pages----------- */}
            {/* <Route path="/liff/stats" element={<StatsPage />} />
        <Route path="/liff/admin" element={<AdminPage />} /> */}
            <Route path="/liff/test" element={<TestPage />} />
            <Route path="*" element={<div>404 Not Found</div>} /> {/* fallback route */}

          </Routes>
        </div>
        <Toolbar />
      </Router>
    </UserProvider>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PracticeForm from './pages/PracticeForm';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/liff/practice" element={<PracticeForm />} />
//         {/* 其他頁面可以繼續加 */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
