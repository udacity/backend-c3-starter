import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      try {
        const decoded = jwtDecode(access_token);
        setUser(decoded);
      } catch (error) {
        console.error('Failed to decode access token', error);
        setUser(null);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
