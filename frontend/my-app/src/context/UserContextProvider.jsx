import React, { useState } from 'react';
import userContext from './userContext';

export default function UserContextProvider({ children }) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [token, setToken] = useState(localStorage.getItem('Token') || null);

  const saveToken = (newToken, newUsername) => {
    localStorage.setItem("Token", newToken);
    localStorage.setItem("username", newUsername);
    setToken(newToken);
    setUsername(newUsername);
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  };

  return (
    <userContext.Provider value={{ form, setForm, token, saveToken, logout, username }}>
      {children}
    </userContext.Provider>
  );
}
