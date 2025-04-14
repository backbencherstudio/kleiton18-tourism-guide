"use client";

import { useLenis } from "@/hooks/useLenis";
import React from "react";

export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  return <>{children}</>;
}
