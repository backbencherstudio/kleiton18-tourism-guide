'use client';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';
import Header from './_components/header';
import Sidebar from './_components/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className=" bg-[#FAFAFA] min-h-screen relative ">
      {/* Mobile Menu Button - Only visible on small screens */}
      <button 
        onClick={openSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#07080b]"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>
  {/* Header */}
        <div className="w-full sticky top-0 left-0 ">
          <Header onMenuClick={openSidebar} />
        </div>
      {/* Sidebar */}
      <div className={`
        fixed left-0   w-[280px]  
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
      

        {/* Main Content */}
        <main className=" pr-5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 