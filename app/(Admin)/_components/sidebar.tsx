'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const navItems: NavItem[] = [
  { icon: '/images/dashboard/dashboard.png', label: 'Dashboard', href: '/dashboard', isActive: true },
  { icon: '/images/dashboard/user.png', label: 'User', href: '/dashboard/user' },
  { icon: '/images/dashboard/hotel.png', label: 'Hotel', href: '/dashboard/hotel' },
  { icon: '/images/dashboard/restaurant.png', label: 'Restaurant', href: '/dashboard/restaurant' },
  { icon: '/images/dashboard/dish.png', label: 'Traditional Dish', href: '/dashboard/dish' },
  { icon: '/images/dashboard/location.png', label: 'Visited Area', href: '/dashboard/visited' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
 const pathname = usePathname()
  return (
    <div className="max-w-[1920px] px-5 mb-5">
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden bg-black/30" 
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div className={`
        ${isOpen ? 'inset-0 z-50 h-full overflow-hidden relative' : 'h-full'} 
        flex flex-col justify-between 
        min-h-[calc(100vh-100px)] 
        bg-white 
         border border-[#E2E8F0] shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
        rounded-[12px] p-5 w-full max-w-[250px]
      `}>
        
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item, idx:any) => (
            <Link
              key={idx}
              href={item.href}
              
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg 
                transition-colors duration-200 
                ${item.href == pathname ? 'bg-borderColor' : 'hover:bg-borderColor'}
              `}
            >
              <div className="w-[30px] flex justify-center items-center   h-[30px] flex-shrink-0 rounded-[8px] bg-white shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]">
              <Image src={item.icon} alt={item.label} width={16} height={16} />
              </div>
              <span className="text-base font-medium text-[#111111]">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
