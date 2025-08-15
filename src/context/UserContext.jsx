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
  const isMock = process.env.REACT_APP_USE_MOCK === 'true';

  console.log('[UserProvider] isMock:', isMock);
  console.log('[UserProvider] authLoading:', authLoading);
  console.log('[UserProvider] authUser:', authUser);
  console.log('[UserProvider] profileLoading:', profileLoading);
  console.log('[UserProvider] profile:', profile);
  useEffect(() => {
    if (profile !== null) return;
    const fetchUserProfile = async () => {
      try {
        if (isMock) {
          const mockUser = mockProfiles.find(p => p.id === authUser.userId);
          console.log('[UserContext] mock user26:', mockUser);
          setProfile(mockUser ? { ...authUser, ...mockUser } : authUser);
          console.log('[UserContext] mock user28:', mockUser);
        } else {
          const res = await fetch(`${API_URL}/api/users/${authUser.userId}`);
          const data = await res.json();
          setProfile({ ...authUser, ...data });
        }
        console.log('[UserContext] 使用者資料:', profile);
      } catch (err) {
        console.error('[UserContext] 取得使用者資料失敗', err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [authUser, authLoading]);
  useEffect(() => {
    console.log('[UserContext] authUser updated:', authUser);
  }, [authUser]);
  return (
    <UserContext.Provider value={{ profile, profileLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);