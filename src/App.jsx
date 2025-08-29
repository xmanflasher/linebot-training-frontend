// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
//import Toolbar from './components/Toolbar';
import Toolbar, { TopBar } from './components/Toolbar';
import { UserProvider } from './context/UserContext';
import { TeamProvider } from './context/TeamContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ReactDOM from 'react-dom/client';

const isMock = process.env.REACT_APP_USE_MOCK === 'true';//config落在source外，無法使用
//console.log('App isMock:', isMock);
//console.log('App process.env.REACT_APP_MOCK:', process.env.REACT_APP_USE_MOCK);
//const isMock = process.env.REACT_APP_MOCK === 'false';
function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <TeamProvider>
            <TopBar />
            <div className="pb-16">
              <AppRoutes />
            </div>
            <Toolbar />
          </TeamProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}
function MockApp() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <TeamProvider>
            <TopBar />
            <div className="pb-16">
              <AppRoutes />
            </div>
            <Toolbar />
          </TeamProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}
// function MockApp() {
//   return (
//     <Router>
//       <div className="pb-16">
//         <AppRoutes />
//       </div>
//       <Toolbar />
//     </Router>
//   );
// }
ReactDOM.createRoot(document.getElementById('root')).render(
  isMock ? <MockApp /> : <App />
);

export default isMock ? MockApp : App;