// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfileAndRole } from '../services/userService'; // 自行實作

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mockMode, setMockMode] = useState(false); // 新增 mockMode 狀態
  useEffect(() => {
    const loadUser = async () => {
      const profile = await getUserProfileAndRole();
      setUser(profile);
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading, mockMode, setMockMode }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
} 