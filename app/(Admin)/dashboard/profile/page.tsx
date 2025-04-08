'use client'

import React, { useState, useRef } from 'react'
import { FaCamera } from 'react-icons/fa'
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string;
  password: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("https://placehold.co/80x80");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Hook Form
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      email: 'admin@gmail.com',
      password: '12345678'
    }
  });

  // Watch form values
  const watchedValues = watch();

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isEditing) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setUploadedFile(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  // Form submit handler
  const onSubmit = (data: FormValues) => {
    // Create a single object with all data
    const updatedData = {
      email: data.email,
      password: data.password,
      image: {
        file: uploadedFile,
        url: profileImage
      }
    };

    // Log the complete data object
    console.log('Complete Profile Update Data:', updatedData);

    // If you need FormData for API call
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (uploadedFile) {
      formData.append('image', uploadedFile);
    }

    // Log FormData entries if needed
    console.log('\nFormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    setIsEditing(false);
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="inline-flex flex-col justify-start items-center gap-10">
        <div className="inline-flex flex-col justify-start items-start gap-8">
          <div className="self-stretch justify-start text-[#07080b] text-2xl font-semibold font-['Montserrat'] leading-[31.20px] tracking-tight">
            Profile
          </div>
          
          <div className="w-[1040px] px-8 pt-10 pb-14 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] outline-[#dfe1e6] flex flex-col justify-start items-start gap-10">
            {/* Profile Image and Button Section */}
            <div className="self-stretch relative inline-flex justify-between items-start">
              <div 
                className={`relative ${isEditing ? 'cursor-pointer' : ''}`} 
                onClick={triggerFileInput}
              >
                <img 
                  className="w-20 h-20 rounded-full border border-[#d2d2d5] object-cover" 
                  src={profileImage} 
                  alt="Profile"
                />
                <div className={`w-6 h-6 left-[56px] top-[56px] absolute ${isEditing ? 'bg-[#666666]' : 'bg-[#888888]'} rounded-full outline-1 outline-offset-[-1px] outline-[#e9e9ea] flex justify-center items-center ${isEditing ? 'cursor-pointer' : ''}`}>
                  <FaCamera className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={!isEditing}
              />
              
              {isEditing ? (
                <button 
                  onClick={handleSubmit(onSubmit)}
                  type="button"
                  className="w-[125px] h-12 px-4 py-2 bg-[#e9e9ea] rounded-[99px] flex justify-center items-center gap-2.5"
                >
                  <span className="justify-start text-[#1d1f2c] text-sm font-medium font-['Montserrat'] leading-tight tracking-tight">
                    Update
                  </span>
                </button>
              ) : (
                <button 
                  type="button"
                  className="w-[125px] h-12 px-4 py-2 bg-[#e9e9ea] rounded-[99px] flex justify-center items-center gap-2.5"
                  onClick={() => setIsEditing(true)}
                >
                  <span className="justify-start text-[#1d1f2c] text-sm font-medium font-['Montserrat'] leading-tight tracking-tight">
                    Edit
                  </span>
                </button>
              )}
            </div>

            {/* Form Fields */}
            <form className="self-stretch flex flex-col justify-start items-start gap-6">
              {/* Email Field */}
              <div className="self-stretch h-[72px] relative">
                <div className="w-[976px] h-14 px-6 py-4 left-0 top-[16px] absolute rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] inline-flex justify-start items-center gap-2.5">
                  {isEditing ? (
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full bg-transparent text-[#07080b] text-lg font-normal font-['Montserrat'] leading-[18px] outline-none"
                    />
                  ) : (
                    <div className="justify-center text-[#07080b] text-lg font-normal font-['Montserrat'] leading-[18px]">
                      {watchedValues.email}
                    </div>
                  )}
                </div>
                <div className="px-2.5 py-1 left-[16px] top-0 absolute bg-white inline-flex justify-center items-center gap-2.5">
                  <div className="justify-center text-[#07080b] text-sm font-medium font-['Montserrat'] leading-[14px]">
                    Email
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="self-stretch h-[72px] relative">
                <div className="w-[976px] h-14 px-6 py-4 left-0 top-[16px] absolute rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] inline-flex justify-start items-center gap-2.5">
                  {isEditing ? (
                    <input
                      type="password"
                      {...register('password')}
                      className="w-full bg-transparent text-[#07080b] text-lg font-normal font-['Montserrat'] leading-[18px] outline-none"
                    />
                  ) : (
                    <div className="justify-center text-[#07080b] text-lg font-normal font-['Montserrat'] leading-[18px]">
                      {watchedValues.password}
                    </div>
                  )}
                </div>
                <div className="px-2.5 py-1 left-[16px] top-0 absolute bg-white inline-flex justify-center items-center gap-2.5">
                  <div className="justify-center text-[#07080b] text-sm font-medium font-['Montserrat'] leading-[14px]">
                    Password
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
