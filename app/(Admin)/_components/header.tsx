'use client'
import avatar from "@/public/images/up.png";
import { EllipsisVertical, Menu, X } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import React from 'react';


interface HeaderProps {
  onNotificationClick?: () => void;
  adminName?: string;
  sidebarOpen:boolean,
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({onMenuClick ,sidebarOpen}:HeaderProps) => {
 

  return (
    <div className="max-w-[1920px] bg-[#FAFAFA] px-5 py-3 relative flex justify-between mb-1 z-50">
        {/* Mobile menu button */}
        <div className=" flex items-center">
       <button 
       onClick={onMenuClick}
          className=" p-2  text-[#4A4C56]" 
        >
       {sidebarOpen ? <X className=" z-50 "/> :  <Menu/>}
        
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
