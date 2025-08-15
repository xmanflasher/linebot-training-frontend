// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios';
//import { API_URL } from '../config.ts';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const isMock = process.env.REACT_APP_USE_MOCK === 'true';

  useEffect(() => {
    if (authUser !== null) return; // 如果已經有 authUser，就不再初始化
    const init = async () => {
      if (isMock) {
        // ✅ 加這段：mock 情境下直接塞一個 mock user
        setAuthUser({ userId: 'UID002' }); // or UID002
        setAuthLoading(false);
        return;
      }
      try {
        await liff.init({ liffId: process.env.VITE_LIFF_ID });
        if (!liff.isLoggedIn()) return liff.login();
        const profile = await liff.getProfile();
        setAuthUser({ userId: profile.userId, name: profile.displayName });
      } catch (error) {
        console.error('LIFF 驗證錯誤：', error);
      } finally {
        setAuthLoading(false);
      }
    };
    init();
  }, []);
  // ✅ debug log（當 authUser 改變時）
  useEffect(() => {
    console.log('[AuthContext] authUser updated:', authUser);
    console.log('[AuthContext] authLoading updated:', authLoading);
  }, [authUser]);
  return (
    <AuthContext.Provider value={{ authUser: authUser, authLoading: authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);