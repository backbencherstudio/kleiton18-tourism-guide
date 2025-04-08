import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import question from '@/public/dashboard/icon/question.png'

interface DeleteDJProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDJ({ isOpen, onClose, onConfirm }: DeleteDJProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handleConfirm = () => {
    setIsClosing(true);
    setTimeout(() => {
      onConfirm();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-black/80 flex justify-center z-50 
        ${isOpen && !isClosing ? 'animate-fadeIn' : ''}
        ${isClosing ? 'animate-fadeOut' : ''}`}
    >
      <div className={`absolute top-[140px] p-20 bg-[#030304] rounded-3xl 
        inline-flex flex-col justify-center items-center gap-2.5
        ${isOpen && !isClosing ? 'animate-modalSlide' : ''}
        ${isClosing ? 'animate-modalSlideOut' : ''}`}
      >
        <div className="w-[535px] flex flex-col justify-start items-center gap-10">
          <div className="w-[120px] h-[120px] relative rounded-[60px] inline-flex justify-start items-center">
            <div className="absolute">
              <Image
                src={question}
                alt="Question Icon"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-10">
            <div className="self-stretch flex flex-col justify-start items-center gap-10">
              <div className="w-[413px] text-center text-white text-2xl font-medium font-['Montserrat'] leading-[31.20px] tracking-tight">
                Are you sure you want to delete this DJ profile?
              </div>
              <div className="self-stretch inline-flex justify-start items-start gap-3">
                <button 
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 bg-white rounded-lg shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] flex justify-center items-center gap-2.5 cursor-pointer"
                >
                  <div className="text-[#0f1016] text-base font-semibold font-['Montserrat'] leading-normal">
                    No
                  </div>
                </button>
                <div className="flex-1 flex justify-start items-start">
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-2.5 bg-[#faad14] rounded-lg shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] flex justify-center items-center gap-2.5 cursor-pointer"
                  >
                    <div className="text-[#1d1f2c] text-base font-semibold font-['Montserrat'] leading-normal">
                      Yes
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
