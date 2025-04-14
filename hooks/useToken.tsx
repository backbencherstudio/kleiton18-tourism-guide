"use client";

import { CookieHelper } from "@/helper/cookie.helper";
import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext<string | null>(null);

export const useToken = () => {
  return useContext(TokenContext);
};

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const userToken = CookieHelper.get({ key: "token" });
      setToken(userToken || null);
    }, 1000); // check every 1 second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};
