// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

/**
 * AuthProvider wraps the app and syncs auth state with localStorage.
 * - token: JWT string or null
 * - user: parsed user object or null
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });

  // Keep localStorage in sync with state
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Convenience: set both token and user at once after login
  const setAuth = ({ token: newToken, user: newUser }) => {
    setToken(newToken || null);
    setUser(newUser || null);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use in components
export const useAuth = () => useContext(AuthContext);
