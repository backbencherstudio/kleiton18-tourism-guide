'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import logo from "@/public/logowhite.svg";
import dashboard from "@/public/dashboard/icon/dashboard.svg";
import usermanagement from "@/public/dashboard/icon/usermanagement.svg";
import djmanagement from "@/public/dashboard/icon/djmanagement.svg";
import featured from "@/public/dashboard/icon/featured.svg";
import reviewques from "@/public/dashboard/icon/reviewques.svg";
import messages from "@/public/dashboard/icon/messages.svg";
import logout from "@/public/dashboard/icon/logout.svg";

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
  const pathname = usePathname();
  const router = useRouter();

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      // Lock the body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Reset body styles when sidebar closes
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      // Cleanup when component unmounts
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    // For dashboard, only exact match should work
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    
    // For other routes, check if the current path starts with the given path
    // but make sure it's not just the dashboard path
    return pathname.startsWith(path) && pathname !== '/dashboard';
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose(); // Close the sidebar after navigation
  };

  const navItems: NavItem[] = [
    {
      icon: dashboard,
      label: 'Dashboard',
      href: '/dashboard',
      isActive: isActive('/dashboard')
    },
    {
      icon: usermanagement,
      label: 'User Management',
      href: '/dashboard/user-management',
      isActive: isActive('/dashboard/user-management')
    },
    {
      icon: djmanagement,
      label: 'DJ Management',
      href: '/dashboard/dj-management',
      isActive: isActive('/dashboard/dj-management')
    },
    {
      icon: featured,
      label: 'Featured DJ',
      href: '/dashboard/featured-dj',
      isActive: isActive('/dashboard/featured-dj')
    },
    {
      icon: reviewques,
      label: 'Review Questions',
      href: '/dashboard/review-questions',
      isActive: isActive('/dashboard/review-questions')
    },
    {
      icon: messages,
      label: 'Messages',
      href: '/dashboard/messages',
      isActive: isActive('/dashboard/messages')
    }
  ];

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
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={40}
            />
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 overflow-y-auto">
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.href)}
                  className="self-stretch h-[52px] relative group cursor-pointer"
                >
                  {/* Active indicator bar */}
                  <div className={`w-1 h-[52px] left-0 top-0 absolute rounded-tr rounded-br transition-colors duration-300 ease-in-out ${
                    item.isActive ? 'bg-[#a601aa]' : 'bg-transparent'
                  }`} />
                  
                  {/* Menu item content */}
                  <div 
                    className={`w-[200px] px-8 py-4 absolute rounded-lg inline-flex justify-start items-center gap-1
                      transition-all duration-300 ease-in-out
                      ${item.isActive 
                        ? 'bg-[#a601aa] left-[20px]' 
                        : 'left-0 group-hover:left-[20px] group-hover:outline group-hover:outline-1 group-hover:outline-offset-[-1px] group-hover:outline-[#a601aa]'
                      }
                    `}
                  >
                    <Image 
                      src={item.icon}
                      alt={`${item.label} icon`}
                      width={18}
                      height={18}
                      className={`transition-transform duration-300 ease-in-out ${item.isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                    />
                    <div className="text-center justify-start text-white text-sm font-medium font-['Montserrat'] leading-tight tracking-tight whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Logout button */}
        <div className="self-stretch h-[52px] relative md:mb-8">
          <div className="w-1 h-[52px] left-0 top-0 absolute rounded-tr rounded-br" />
          <button className="w-full px-8 py-4 left-[20px] absolute rounded-lg inline-flex justify-start items-center gap-3 hover:bg-white/5 transition-colors duration-300 ease-in-out">
            <Image 
              src={logout}
              alt="Logout icon"
              width={18}
              height={18}
              className="text-[#ea3c4d] transition-transform duration-300 ease-in-out hover:scale-110"
            />
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

