'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import notification from "@/public/dashboard/icon/notification.svg";
import back from "@/public/dashboard/icon/back.svg";
import search from "@/public/dashboard/icon/search.svg";
import avatar from "@/public/dashboard/icon/avatar.png";
import NotificationPage from '../dashboard/notification/page';

interface HeaderProps {
  onNotificationClick?: () => void;
  adminName?: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onNotificationClick,
  adminName = 'Admin',
  onMenuClick
}) => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleProfileClick = () => {
    router.push('/dashboard/profile');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  return (
    <div className="w-full h-[70px] relative ">
      <div className="w-full h-[70px] left-0 top-0 absolute bg-[#07080b] border-b border-[#e9e9ea]/50" />
      <div className="absolute inset-0 px-10 flex items-center">
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={onMenuClick}
        >
          {/* Menu icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Back Button */}
        <div 
          className=" justify-start items-center gap-[7px] cursor-pointer hidden md:block"
          onClick={handleBack}
        >
          <Image
            src={back}
            alt="Back"
            width={18}
            height={18}
          />
          <div className="text-white text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">
            Back
          </div>
        </div>

        {/* Search Box */}
        <div className="mx-auto w-[404px] h-12 px-4 bg-black bg-opacity-10 rounded-lg hidden md:flex outline-1 outline-offset-[-1px] outline-[#a5a5ab] backdrop-blur-[2px] items-center justify-center">
          <div className="flex items-center gap-2 w-full">
            <Image
              src={search}
              alt="Search"
              width={18}
              height={18}
              className="text-[#a5a5ab]"
            />
            <input
              type="text"
              placeholder="Search by name or email"
              className="bg-transparent border-none outline-none text-[#a5a5ab] placeholder-[#a5a5ab] w-full"
            />
          </div>
        </div>

        {/* Notification and Profile Group */}
        <div className="flex items-center gap-5 justify-end ml-[18%] sm:ml-0">
          <div className="relative">
            <div 
              className="w-6 h-6 relative overflow-hidden cursor-pointer"
              onClick={handleNotificationClick}
            >
              <Image
                src={notification}
                alt="Notifications"
                width={24}
                height={24}
                className="absolute"
              />
              <div className="w-[5px] h-[5px] left-[17px] top-[2px] absolute bg-[#ea3c4d] rounded-full" />
            </div>
            
            {/* Notification Popup */}
            {showNotifications && (
              <div className="absolute right-0 top-[calc(100%+22px)] z-50 transform origin-top transition-all duration-300 ease-out animate-in slide-in-from-top-2 fade-in-0 scale-in-95">
                <NotificationPage />
              </div>
            )}
          </div>

          <div 
            className="flex justify-start items-center gap-2 cursor-pointer hover:opacity-90"
            onClick={handleProfileClick}
          >
            <Image
              src={avatar}
              alt="Admin Avatar"
              width={40}
              height={40}
              className="rounded-full shadow-[2px_2px_4px_0px_rgba(135,7,136,0.50)] shadow-[-2px_-2px_4px_0px_rgba(135,7,136,0.50)] border border-[#a601aa]"
            />
            <div className="text-center justify-center text-white text-base font-semibold font-['Montserrat'] leading-relaxed tracking-tight">
              {adminName}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add click outside handler */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default Header;
