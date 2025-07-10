// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
//import { getUserProfileAndRole } from '../services/userService'; // 自行實作
import { useAuth } from './AuthContext';
import { mockProfiles } from '../mock/mockProfiles';
import { API_URL } from '../config.ts'; // 確保這個路徑正確

const UserContext = createContext();

export function UserProvider({ children }) {
  const { authUser, authLoading } = useAuth(); // ✅ 改為明確命名
  const [profile, setProfile] = useState(null); // ✅ 使用更清楚的 profile 命名
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !authUser?.userId) return;

    const isMock = process.env.REACT_APP_USE_MOCK === 'true';
    console.log('[UserProvider] isMock:', isMock);

    const loadUserProfile = async () => {
      try {
        if (isMock) {
          const mockUser = mockProfiles.find((p) => p.id === authUser.userId);
          if (mockUser) {
            setProfile({ ...authUser, ...mockUser });
          } else {
            console.warn(`[UserProvider] 找不到 mock user 對應 ID: ${authUser.userId}`);
            setProfile(authUser);
          }
        } else {
          const res = await fetch(`${API_URL}/api/users/${authUser.userId}`);
          const data = await res.json();
          setProfile({ ...authUser, ...data });
        }
      } catch (err) {
        console.error('[UserProvider] 錯誤:', err);
      } finally {
        setProfileLoading(false);
      }
    };

    loadUserProfile();
  }, [authUser, authLoading]);

  return (
    <UserContext.Provider value={{ profile, profileLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
//authContext.jsx userContext.jsx 重構前
// // src/context/UserContext.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { getUserProfileAndRole } from '../services/userService'; // 自行實作

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [environment, setEnvironment] = useState('prod');  /// 預設值可以設定為 'prod' 或你希望的初始環境
//   useEffect(() => {
//     const loadUser = async () => {
//       const profile = await getUserProfileAndRole();
//       setUser(profile);
//       setLoading(false);
//     };
//     loadUser();
//   }, [environment]);

//   return (
//     <UserContext.Provider value={{ user, setUser, loading, setLoading, environment, setEnvironment }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUserContext() {
//   return useContext(UserContext);
// } 