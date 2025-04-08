'use client'
import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
import Image from 'next/image';
import cross from "@/public/dashboard/icon/cross.svg";

// Define interfaces for our notification data structure
interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

interface NotificationGroup {
  title: string;
  notifications: Notification[];
}

const NotificationPage: React.FC = () => {
  // State to store notifications
  const [notifications, setNotifications] = useState<NotificationGroup[]>([
    {
      title: 'Today',
      notifications: [
        {
          id: '1',
          message: 'Lorem ipsum sit dolor sit amet...',
          isRead: false,
          createdAt: new Date(),
        },
        {
          id: '2',
          message: 'Lorem ipsum sit dolor sit amet...',
          isRead: false,
          createdAt: new Date(),
        },
      ],
    },
    {
      title: 'Last 7 days',
      notifications: [
        {
          id: '3',
          message: 'Lorem ipsum sit dolor sit amet...',
          isRead: true,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: '4',
          message: 'Lorem ipsum sit dolor sit amet...',
          isRead: true,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
      ],
    },
  ]);
  const [isVisible, setIsVisible] = useState(true);

  // Socket.io connection setup
  useEffect(() => {
    // Initialize socket connection
    // const socket = io('YOUR_SOCKET_SERVER_URL');

    // Listen for new notifications
    // socket.on('newNotification', (notification: Notification) => {
    //   // Add new notification to the appropriate group
    //   setNotifications(prevNotifications => {
    //     const today = new Date();
    //     if (notification.createdAt === today) {
    //       // Add to Today's notifications
    //     } else {
    //       // Add to Last 7 days notifications
    //     }
    //     return [...prevNotifications];
    //   });
    // });

    // Cleanup on component unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  // Notification Icon component
  const NotificationIcon: React.FC<{ isRead: boolean }> = ({ isRead }) => (
    <div className="w-[18px] h-[18px] p-1.5 relative bg-white rounded-[14px] outline outline-[0.50px] outline-offset-[-0.50px] outline-[#777980] flex justify-center items-center gap-2.5">
      <div className="w-3 h-3 relative overflow-hidden">
        <div className="w-[9.50px] h-[8.25px] left-[1.25px] top-[1px] absolute outline outline-[0.75px] outline-offset-[-0.38px] outline-[#777980]" />
        <div className="w-[3px] h-[0.50px] left-[4.50px] top-[10.50px] absolute outline outline-[0.75px] outline-offset-[-0.38px] outline-[#777980]" />
      </div>
      <div 
        className={`w-[3px] h-[3px] left-[11px] top-[4px] absolute rounded-full ${
          isRead ? 'bg-[#777980]' : 'bg-[#ea3c4d]'
        }`} 
      />
    </div>
  );

  // Handle close click
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-[327px] px-5 pt-6 pb-5 relative bg-white rounded-2xl shadow-[2px_2px_4px_0px_rgba(0,0,0,0.06)] outline outline-1 outline-offset-[-1px] outline-[#e9e9ea] inline-flex flex-col justify-start items-start gap-4">
      {/* Header */}
      <div className="self-stretch justify-center text-[#07080b] text-base font-semibold font-['Montserrat'] leading-relaxed tracking-tight">
        Notifications
      </div>

      {/* Close Button - Updated position with larger size */}
      <button
        onClick={handleClose}
        className="absolute w-5 h-5 left-[293px] top-[18px] hover:scale-110 transition-transform duration-200 flex items-center justify-center"
      >
        <Image 
          src={cross} 
          alt="close" 
          width={18} 
          height={18}
          className="text-[#ea3c4d]"
          style={{ filter: 'invert(37%) sepia(74%) saturate(1909%) hue-rotate(328deg) brightness(91%) contrast(98%)' }}
        />
      </button>

      {/* Notification Groups */}
      {notifications.map((group, groupIndex) => (
        <div 
          key={groupIndex}
          className="self-stretch p-2 bg-[#eceff3] rounded-lg flex flex-col justify-start items-start gap-2"
        >
          {/* Group Title */}
          <div className="self-stretch pb-1.5 border-b-[0.50px] border-[#777980] inline-flex justify-start items-center gap-2.5">
            <div className="text-center justify-center text-[#07080b] text-xs font-medium font-['Montserrat'] leading-none tracking-tight">
              {group.title}
            </div>
          </div>

          {/* Notifications List */}
          <div className="self-stretch flex flex-col justify-start items-start">
            {group.notifications.map((notification) => (
              <div 
                key={notification.id}
                className="self-stretch p-2 rounded inline-flex justify-start items-start gap-2"
              >
                <NotificationIcon isRead={notification.isRead} />
                <div className="justify-center text-[#07080b] text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  {notification.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
