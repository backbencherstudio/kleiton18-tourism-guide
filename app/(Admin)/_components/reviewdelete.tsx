import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import deletereview from '../../../public/dashboard/icon/deletereview.svg'

export default function ReviewDelete({ isOpen, onClose, onConfirm }) {
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300); // Match this with your animation duration
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
          <div className="w-[120px] h-[120px] p-[5px] relative bg-[#fbd8db] rounded-[60px] inline-flex justify-start items-center gap-2.5">
            <div className="w-[110px] h-[110px] bg-[#f38b94] rounded-full" />
            <div className="w-[100px] h-[100px] left-[10px] top-[10px] absolute bg-[#ef6471] rounded-full" />
            <div className="w-[90px] h-[90px] left-[15px] top-[15px] absolute bg-[#ea3c4d] rounded-full" />
            <div className="w-[42px] h-[42px] left-[39px] top-[39px] absolute">
              <Image
                src={deletereview}
                alt="Delete Review"
                width={42}
                height={42}
                className="brightness-0 invert"
              />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-10">
            <div className="self-stretch flex flex-col justify-start items-center gap-10">
              <div className="self-stretch text-center text-white text-2xl font-medium font-['Montserrat'] leading-[31.20px] tracking-tight">
                Are you sure you want to delete the review?
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
                    className="flex-1 px-4 py-2.5 bg-[#ea3c4d] rounded-lg shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] flex justify-center items-center gap-2.5 cursor-pointer"
                  >
                    <div className="text-white text-base font-semibold font-['Montserrat'] leading-normal">
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
