'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  replyMessage: string;
}

export default function MessageDetailsModal({ message, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Log the form data along with the original message details
    console.log({
      to: message.email,
      from: 'admin@example.com',
      subject: `Re: ${message.subject}`,
      message: data.replyMessage
    });
    
    // Close the modal after submission
    handleClose();
  };

  useEffect(() => {
    if (message) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [message]);

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
    }, 300);
  };

  if (!message) return null;

  return (
    <div 
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-black/80 flex justify-center z-50 
        ${!isClosing ? 'animate-fadeIn' : 'animate-fadeOut'}`}
    >
      <div className={`absolute top-[140px] p-8 bg-white rounded-3xl 
        inline-flex flex-col justify-center items-center gap-2.5
        ${!isClosing ? 'animate-modalSlide' : 'animate-modalSlideOut'}`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-[575px] inline-flex flex-col justify-start items-start gap-8">
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {/* Name */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">
                Name
              </div>
              <div className="self-stretch h-12 px-6 py-3 bg-[#eceff3] rounded-lg inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-[#1d1f2c] text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">
                  {message.name}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">
                Email
              </div>
              <div className="self-stretch h-12 px-6 py-3 bg-[#eceff3] rounded-lg inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-[#1d1f2c] text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">
                  {message.email}
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">
                Subject
              </div>
              <div className="self-stretch h-12 px-6 py-3 bg-[#eceff3] rounded-lg inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-[#1d1f2c] text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">
                  {message.subject}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">
                Message
              </div>
              <div className="self-stretch px-6 py-3 bg-[#eceff3] rounded-lg inline-flex justify-start items-center gap-2.5">
                <div className="flex-1 justify-start text-[#1d1f2c] text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">
                  {message.message || 'No message content available'}
                </div>
              </div>
            </div>

            {/* Reply Message */}
            <div className="self-stretch flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">
                Your Reply
              </div>
              <textarea
                {...register('replyMessage', { required: true })}
                className="self-stretch min-h-[120px] px-6 py-3 bg-[#eceff3] rounded-lg text-[#1d1f2c] text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight resize-none"
                placeholder="Type your reply here..."
              />
              {errors.replyMessage && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="self-stretch inline-flex justify-start items-center gap-4">
            <button 
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-2.5 bg-[#d2d2d5] rounded-lg flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#c2c2c5] transition-colors"
            >
              <div className="justify-center text-[#07080b] text-base font-medium font-['Montserrat'] leading-normal">
                Cancel
              </div>
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-2.5 bg-[#a601aa] rounded-lg shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#8e0191] transition-colors"
            >
              <div className="justify-center text-white text-base font-medium font-['Montserrat'] leading-normal">
                Send Email
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}