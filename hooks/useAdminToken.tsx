
"use client";

import { createContext, useContext, useEffect, useState } from "react";

// context accepts an object, not just the token
type AdminTokenContextType = {
  token: string | null;
};

const AdminTokenContext = createContext<AdminTokenContextType | null>(null);

export const useAdminToken = () => {
  const context = useContext(AdminTokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const getCookieToken = () => {
    if (typeof document === "undefined") return null;

    const cookieString = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("adminToken="));
    
    return cookieString?.split("=")[1] || null;
  };

  useEffect(() => {
    const updateToken = () => {
      const cookieToken = getCookieToken();
      setToken(cookieToken);
    };

    updateToken(); // Run once on mount

    const interval = setInterval(updateToken, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminTokenContext.Provider value={{ token }}>
      {children}
    </AdminTokenContext.Provider>
  );
};
