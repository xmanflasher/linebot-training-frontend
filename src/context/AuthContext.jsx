// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import liff from '@line/liff';
import axios from 'axios';
//import { API_URL } from '../config.ts';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      console.log('mock mode: 使用 mock user 資料');
      const isMock = process.env.REACT_APP_MOCK === 'true';
      if (isMock) {
        console.log('mock mode: 使用 mock user 資料', isMock);
        // ✅ 加這段：mock 情境下直接塞一個 mock user
        setUser({ userId: 'UID002' }); // or UID002
        setLoading(false);
        return;
      }
      try {
        await liff.init({ liffId: process.env.VITE_LIFF_ID });
        if (!liff.isLoggedIn()) return liff.login();
        const profile = await liff.getProfile();
        setUser({ userId: profile.userId, name: profile.displayName });
      } catch (error) {
        console.error('LIFF 驗證錯誤：', error);
        setLoading(false);
      }
    };
    console.log('AuthProvider loading:', loading);
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser: user, authLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//try重構前
// // src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from 'react';
// import liff from '@line/liff';
// import axios from 'axios';
// import { API_URL } from '../config.ts';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const init = async () => {
//       const isMock = process.env.REACT_APP_MOCK === 'true';
//       if (isMock) {
//         //console.log('mock mode: 使用 mock user 資料', process.env.REACT_APP_MOCK);
//         // ✅ 加這段：mock 情境下直接塞一個 mock user
//         setUser({ userId: 'UID002' }); // or UID002
//         setLoading(false);
//         return;
//       }
//       try {
//         await liff.init({ liffId: process.env.REACT_APP_LIFF_ID });

//         // 🌟 核心防無限登入邏輯
//         const isLoggedIn = liff.isLoggedIn();
//         const isRedirected = window.location.href.includes('liff.state');

//         if (!isLoggedIn && !isRedirected) {
//           liff.login();
//           return; // ⛔️ Login 後就不再跑後續
//         }

//         if (!isLoggedIn && isRedirected) {
//           // 登入已發生但尚未完成 → 等等再執行
//           setLoading(false);
//           return;
//         }

//         const idToken = liff.getIDToken();
//         const profile = await liff.getProfile();

//         if (!idToken || !profile) {
//           console.error('LIFF: 無法取得 ID Token 或 Profile');
//           setLoading(false);
//           return;
//         }

//         const res = await axios.post(`${API_URL}/api/auth/verify`, {
//           idToken,
//           profile,
//         });

//         setUser(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('LIFF 驗證錯誤：', error);
//         setLoading(false);
//       }
//     };

//     init();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);