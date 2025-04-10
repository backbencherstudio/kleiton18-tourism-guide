'use client';
import React, { useState } from 'react';
import Header from './_components/header';
import Sidebar from './_components/sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className=" lg:bg-[#FAFAFA] min-h-screen relative ">
      {/* Mobile Menu Button - Only visible on small screens */}
      {/* <button 
        onClick={openSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md "
      >
        <Menu className="h-6 w-6 text-white" />
      </button> */}
  {/* Header */}
        <div className="w-full sticky top-0 left-0 ">
          <Header onMenuClick={openSidebar} sidebarOpen={sidebarOpen} />
        </div>
      {/* Sidebar */}
      <div className={`
        fixed left-0   w-[280px]  
        transition-transform duration-300 ease-in-out z-20
        lg:translate-x-0 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50  lg:hidden"
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
        <main className=" lg:pr-5 px-3">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 