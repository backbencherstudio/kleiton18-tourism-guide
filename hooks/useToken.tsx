"use client";

import { CookieHelper } from "@/helper/cookie.helper";
import { createContext, useContext, useEffect, useState } from "react";

// context accepts an object, not just the token
type TokenContextType = {
  token: string | null;
};

const TokenContext = createContext<TokenContextType | null>(null);

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const userToken = CookieHelper.get({ key: "token" });
      setToken(userToken || null);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};
