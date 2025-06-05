import React, { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const login = (name) => {
    setUsername(name);
    localStorage.setItem('username', name);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ username, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Add this export so your components can do: `const { username } = useUser();`
export const useUser = () => useContext(UserContext);
