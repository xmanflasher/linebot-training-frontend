// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfileAndRole } from '../services/userService'; // 自行實作

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const profile = await getUserProfileAndRole();
      setUser(profile);
      setLoading(false);
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
} 