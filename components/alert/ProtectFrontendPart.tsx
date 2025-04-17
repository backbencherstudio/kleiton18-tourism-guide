"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectFrontendPart({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  const getCookieToken = () => {
    if (typeof document === "undefined") return null;

    const cookieString = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="));
    return cookieString?.split("=")[1] || null;
  };

  useEffect(() => {
    const token = getCookieToken();

    // 🔒 Public routes where logged-in users should NOT go
    const publicRoutes = [
      "/login",
      "/signup",
      "/forgot-password",
      "/confirm-otp",
      "/update-password",
    ];

    if (token) {
       
      if (publicRoutes.includes(pathname)) {
        router.replace("/"); // or "/" or any private route
        return;
      }
    }

    setChecking(false);

    

   
  }, [router, pathname]);

  if (checking) return null;

  return <>{children}</>;
}
