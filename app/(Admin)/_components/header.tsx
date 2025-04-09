'use client'
import avatar from "@/public/images/up.png";
import { EllipsisVertical, Menu } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import React from 'react';


interface HeaderProps {
  onNotificationClick?: () => void;
  adminName?: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = () => {
 

  return (
    <div className="max-w-[1920px] px-5 py-4 relative flex justify-between ">
        {/* Mobile menu button */}
        <div className=" flex items-center">
       <button 
          className="hidden p-2 lg:block text-[#4A4C56]" 
        >
          {/* Menu icon */}
         <Menu/>
        </button>
        <Link href={'/dashbord'} className='text-[24px] font-medium leading-[140%] text-[#4A4C56]'>
          <p>Logo</p>
        </Link>
        </div>
        
        {/* Notification and Profile Group */}
        <div className="flex items-center gap-5 justify-end ml-[18%] sm:ml-0">
          <div 
            className="flex justify-start items-center gap-2 cursor-pointer hover:opacity-90">
            <Image
              src={avatar}
              alt="Admin Avatar"
              width={26}
              height={26}
              className="rounded-full  "
            />
            <div className="text-center justify-center text-[#1D1F2C]  text-base font-semibold leading-relaxed tracking-tight">
               <EllipsisVertical/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Header;
