import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const storageKey = "loggedInUser";

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored && stored !== "undefined") {
      setUser(JSON.parse(stored));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem(storageKey, JSON.stringify(userData));
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(storageKey);
    localStorage.removeItem("authToken");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
