import { AppConfig } from "@/config/app.config";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ToastContainer/>
        {children}</body>
    </html>
  );
}
