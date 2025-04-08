'use client';

import React from 'react';

interface NavItem {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {




  return (
    <>
      {/* Dark overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      <div className={`${isOpen 
        ? 'inset-0 z-50 h-[90vh] overflow-hidden bg-black relative ' 
        : ' h-full'} 
        flex flex-col justify-between min-h-screen`}>
        
        {/* Top section with logo and nav */}
        <div className="flex flex-col flex-1">
          {/* Logo */}
          <div className="p-6">
            Logo
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 overflow-y-auto">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
             nav
            </div>
          </nav>
        </div>

        {/* Logout button */}
        <div className="self-stretch h-[52px] relative md:mb-8">
          <div className="w-1 h-[52px] left-0 top-0 absolute rounded-tr rounded-br" />
          <button className="w-full px-8 py-4 left-[20px] absolute rounded-lg inline-flex justify-start items-center gap-3 hover:bg-white/5 transition-colors duration-300 ease-in-out">
         
            <div className="whitespace-nowrap text-[#ea3c4d] text-sm font-medium font-['Montserrat'] leading-tight tracking-tight">
              Logout
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

