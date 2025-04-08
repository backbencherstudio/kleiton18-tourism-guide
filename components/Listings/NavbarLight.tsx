"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";

const NavbarLight = () => {
  return (
    <div className="sticky z-50 top-0 left-0 right-0 bg-[#FFFFFF1A] backdrop-blur-xs p-4">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-[40px] font-medium leading-[140%] text-[#111111]"
        >
          <h1>Logo</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center gap-8">
          <Link href="/" className="text-[#111111]">
            Home
          </Link>
          <Link href="/hotel" className="text-[#111111]">
            Hotel
          </Link>
          <Link href="/restaurant" className="text-[#111111]">
            Restaurant
          </Link>
          <Link href="/" className="text-[#111111]">
            Favorites
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-[23px] py-[9px] border border-[#EDEDED] rounded-[8px] text-[#111111] text-[16px] font-medium leading-[130%]"
          >
            Emergency Contacts
          </Link>
          <Link href="/" className="rounded-full">
            <Image
              height={44}
              width={44}
              src="/images/up.png"
              alt="user photo"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <Link href="/" className="rounded-full">
            <Image
              height={40}
              width={40}
              src="/images/up.png"
              alt="user photo"
            />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-[#111111] p-2">
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6">
              <div className="flex flex-col gap-6 mt-10">
                <Link href="/" className="text-[#111111]">
                  Home
                </Link>
                <Link href="/hotel" className="text-[#111111]">
                  Hotel
                </Link>
                <Link href="/restaurant" className="text-[#111111]">
                  Restaurant
                </Link>
                <Link href="/" className="text-[#111111]">
                  Favorites
                </Link>
                <Link
                  href="/"
                  className="mt-4 inline-block px-[23px] py-[9px] border border-[#EDEDED] rounded-[8px] text-[#111111] text-[16px] font-medium leading-[130%]"
                >
                  Emergency Contacts
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavbarLight;
