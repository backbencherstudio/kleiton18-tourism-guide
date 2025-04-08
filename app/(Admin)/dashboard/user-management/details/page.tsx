'use client'
import React, { useState } from 'react'
import ReviewCard from '@/components/ReviewCard/ReviewCard'
import UserDelete from '@/app/(Admin Dashboard)/_components/userdelete'
import ReviewDelete from '@/app/(Admin Dashboard)/_components/reviewdelete'

// Define interfaces for the review data structure
interface TagType {
  id: number;
  name: string;
}

interface ReviewItemType {
  id: number;
  avatar: string;
  username: string;
  date: string;
  rating: number;
  review: string;
  tags: TagType[];
}

export default function Details() {
  // Sample reviews data with initial state
  const [reviews, setReviews] = useState<ReviewItemType[]>([
    {
      id: 1,
      avatar: "https://placehold.co/50x51",
      username: "La fly",
      date: "11 Feb, 2025",
      rating: 5,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      tags: [
        { id: 1, name: "Great Music" },
        { id: 2, name: "Very Pro" },
        { id: 3, name: "Smooth Mix" }
      ]
    },
    {
      id: 2,
      avatar: "https://placehold.co/50x51",
      username: "John Doe",
      date: "15 Feb, 2025",
      rating: 3,
      review: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      tags: [
        { id: 1, name: "High Energy" },
        { id: 2, name: "Good Flow" }
      ]
    },
    {
      id: 3,
      avatar: "https://placehold.co/50x51",
      username: "Sarah Smith",
      date: "18 Feb, 2025",
      rating: 4,
      review: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: [
        { id: 1, name: "Perfect Mix" },
        { id: 2, name: "Professional" },
        { id: 3, name: "Great Energy" }
      ]
    }
  ]);

  // Add state for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Add these states after other state declarations
  const [isReviewDeleteModalOpen, setIsReviewDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  // Handle review deletion
  const handleDelete = (id: number) => {
    setReviewToDelete(id);
    setIsReviewDeleteModalOpen(true);
  };

  // Add a new function to handle review deletion confirmation
  const handleReviewDeleteConfirm = () => {
    if (reviewToDelete !== null) {
      setReviews(reviews.filter(review => review.id !== reviewToDelete));
      setIsReviewDeleteModalOpen(false);
      setReviewToDelete(null);
    }
  };

  // Handle profile deletion
  const handleProfileDelete = () => {
    // Add your profile deletion logic here
    console.log('Profile deleted');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6 flex justify-center">
      {/* User Delete modal */}
      <UserDelete 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleProfileDelete}
      />

      {/* Review Delete modal */}
      <ReviewDelete
        isOpen={isReviewDeleteModalOpen}
        onClose={() => {
          setIsReviewDeleteModalOpen(false);
          setReviewToDelete(null);
        }}
        onConfirm={handleReviewDeleteConfirm}
      />

      <div className="inline-flex flex-col justify-start items-start gap-8">
        <div className="w-[996px] px-8 pt-8 pb-12 bg-[#07080b] rounded-3xl outline-[0.50px] outline-offset-[-0.50px] outline-[#a5a5ab] inline-flex flex-col justify-start items-start gap-6">
          <div className="self-stretch pb-2 border-b border-white inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 justify-start text-white text-lg font-semibold font-['Montserrat'] leading-[28.80px]">Profile</div>
          </div>
          
          <div className="self-stretch inline-flex justify-between items-end">
            <div className="flex justify-start items-center gap-4">
              <img className="w-20 h-20 rounded-xl" src="https://placehold.co/80x80" alt="Profile" />
              <div className="w-[316px] inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  <div className="w-[54px] justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Name:</div>
                  <div className="w-[254px] h-5 justify-start text-white text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">Ronald Richards</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div className="w-[54px] justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Email:</div>
                  <div className="w-[254px] justify-start text-white text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">jackson.graham@example.com</div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsDeleteModalOpen(true)} 
              className="px-4 py-2.5 bg-[#ea3c4d] rounded-[99px] shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] flex justify-center items-center gap-2.5 hover:bg-[#d93545] transition-colors"
            >
              <div className="justify-center text-white text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Delete Profile</div>
            </button>
          </div>
        </div>

        <div className="w-[996px] px-8 pt-8 pb-12 rounded-3xl outline-[0.50px] outline-offset-[-0.50px] outline-[#a5a5ab] inline-flex flex-col justify-start items-start gap-6">
          <div className="self-stretch pb-2 border-b border-[#a5a5ab] inline-flex justify-center items-center gap-2.5">
            <div className="w-[869px] justify-start text-black text-lg font-semibold font-['Montserrat'] leading-[28.80px]">
              {reviews.length} Ratings
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-6">
            {reviews.map(review => (
              <ReviewCard 
                key={review.id}
                {...review}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
