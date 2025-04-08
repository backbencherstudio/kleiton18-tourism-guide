'use client';
import React, { useState } from 'react';
import Header from './_components/header';
import Sidebar from './_components/sidebar';
import { Menu } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Menu Button - Only visible on small screens */}
      <button 
        onClick={openSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#07080b]"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen w-[280px] bg-[#07080b] border-r border-[#e9e9ea]/50
        transition-transform duration-300 ease-in-out z-40
        lg:translate-x-0 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className={`
        flex-1 
        transition-[margin] duration-300 ease-in-out
        lg:ml-[280px]
      `}>
        {/* Header */}
        <div className="w-full">
          <Header onMenuClick={openSidebar} />
        </div>

        {/* Main Content */}
        <main className="p-4 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 