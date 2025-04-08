'use client'
import DeleteDJ from '@/app/(Admin Dashboard)/_components/deletedj'
import DjRatings from '@/app/(Admin Dashboard)/_components/djratings'
import ReviewDelete from '@/app/(Admin Dashboard)/_components/reviewdelete'
import UserDelete from '@/app/(Admin Dashboard)/_components/userdelete'
import ReviewCard from '@/components/ReviewCard/ReviewCard'
import save from '@/public/dashboard/icon/save.svg'
import dynamic from "next/dynamic"
import Image from 'next/image'
import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

const Rating = dynamic<any>(
  () => import("react-rating").then(mod => mod.default as any),
  { ssr: false }
);

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

interface DJProfileData {
  name: string;
  email: string;
  instagram: string;
  location: string;
  avatar: string;
  rating: number;
}

export default function Details() {
  // Sample DJ profile data
  const [djProfile] = useState<DJProfileData>({
    name: "La fly",
    email: "lafly@example.com",
    instagram: "@iinoubliable",
    location: "Toronto, Canada",
    avatar: "https://placehold.co/120x120",
    rating: 1.6
  });

  // State for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Add reviews state
  const [reviews, setReviews] = useState<ReviewItemType[]>([
    {
      id: 1,
      avatar: "https://placehold.co/50x51",
      username: "John Smith",
      date: "11 Feb, 2025",
      rating: 5,
      review: "Amazing DJ performance! The energy was incredible throughout the night.",
      tags: [
        { id: 1, name: "Great Music" },
        { id: 2, name: "Very Pro" },
        { id: 3, name: "Smooth Mix" }
      ]
    },
    {
      id: 2,
      avatar: "https://placehold.co/50x51",
      username: "Emma Wilson",
      date: "15 Feb, 2025",
      rating: 4,
      review: "Fantastic song selection and mixing skills. Would definitely recommend!",
      tags: [
        { id: 1, name: "High Energy" },
        { id: 2, name: "Good Flow" }
      ]
    }
  ]);

  // Add review deletion states and handlers
  const [isReviewDeleteModalOpen, setIsReviewDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  // Add ratings distribution data
  const ratingDistribution = [
    { rating: 5, label: "Stars", count: 125, percentage: 80 },
    { rating: 4, label: "Stars", count: 20, percentage: 40 },
    { rating: 3, label: "Stars", count: 15, percentage: 20 },
    { rating: 2, label: "Stars", count: 5, percentage: 10 },
    { rating: 1, label: "Stars", count: 2, percentage: 5 },
  ];

  // Add tags data
  const djTags = [
    { text: "Great Music" },
    { text: "Professional" },
    { text: "High Energy" },
    { text: "Crowd Favorite" },
    { text: "Punctual" },
    { text: "Versatile" }
  ];

  // Replace isFeaturedModalOpen with isDeleteDJModalOpen
  const [isDeleteDJModalOpen, setIsDeleteDJModalOpen] = useState(false);

  // Handle profile deletion
  const handleProfileDelete = () => {
    // Add your profile deletion logic here
    console.log('Profile deleted');
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setReviewToDelete(id);
    setIsReviewDeleteModalOpen(true);
  };

  const handleReviewDeleteConfirm = () => {
    if (reviewToDelete !== null) {
      setReviews(reviews.filter(review => review.id !== reviewToDelete));
      setIsReviewDeleteModalOpen(false);
      setReviewToDelete(null);
    }
  };

  // Replace handleFeatureProfile with handleRemoveFeatured
  const handleRemoveFeatured = () => {
    // Add your remove featured DJ logic here
    console.log('DJ removed from featured');
    setIsDeleteDJModalOpen(false);
  };

  return (
    <div className="p-6 flex justify-center">
      {/* User Delete modal */}
      <UserDelete 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleProfileDelete}
      />

      {/* Add ReviewDelete modal */}
      <ReviewDelete
        isOpen={isReviewDeleteModalOpen}
        onClose={() => {
          setIsReviewDeleteModalOpen(false);
          setReviewToDelete(null);
        }}
        onConfirm={handleReviewDeleteConfirm}
      />

      {/* Replace MakeFeatured modal with DeleteDJ modal */}
      <DeleteDJ 
        isOpen={isDeleteDJModalOpen}
        onClose={() => setIsDeleteDJModalOpen(false)}
        onConfirm={handleRemoveFeatured}
      />

      <div className="inline-flex flex-col justify-start items-start gap-8">
        <div className="w-[994px] px-8 pt-8 pb-12 bg-[#07080b] rounded-3xl outline outline-[0.50px] outline-offset-[-0.50px] outline-[#a5a5ab] inline-flex flex-col justify-start items-start gap-6">
          <div className="self-stretch pb-2 border-b-[0.50px] border-white inline-flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <Image 
                src={save} 
                alt="save" 
                className="w-[18px] h-[18px] text-[#faad14]"
                style={{ filter: 'invert(70%) sepia(50%) saturate(1000%) hue-rotate(350deg) brightness(100%)' }}
              />
              <div className="justify-start text-white text-lg font-semibold font-['Montserrat'] leading-[28.80px]">Profile</div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <div className="justify-center text-[#a5a5ab] text-lg font-semibold font-['Montserrat'] leading-[28.80px]">Overall Rating</div>
              <div className="flex justify-start items-center gap-[11px]">
                <div className="justify-center">
                  <span className="text-white text-xl font-semibold font-['Montserrat'] leading-relaxed tracking-tight">{djProfile.rating}</span>
                  <span className="text-white text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">/5</span>
                </div>
                <Rating
                  initialRating={djProfile.rating}
                  readonly
                  emptySymbol={<AiFillStar className="w-5 h-5 text-white" />}
                  fullSymbol={<AiFillStar className="w-5 h-5 text-[#faad14]" />}
                />
              </div>
            </div>
          </div>

          <div className="self-stretch inline-flex justify-between items-end">
            <div className="flex-1 flex justify-start items-center gap-4">
              <img className="w-[120px] h-[120px] rounded-xl" src={djProfile.avatar} alt="Profile" />
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  <div className="justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Name:</div>
                  <div className="w-[254px] h-5 justify-start text-white text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">{djProfile.name}</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Email:</div>
                  <div className="w-[254px] justify-start text-white text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">{djProfile.email}</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Instagram:</div>
                  <div className="w-[254px] justify-start text-white text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">{djProfile.instagram}</div>
                </div>
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-[#a601aa] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Location:</div>
                  <div className="w-[254px] justify-start text-white text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">{djProfile.location}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <button 
                onClick={() => setIsDeleteDJModalOpen(true)}
                className="px-4 py-2.5 bg-[#d2d2d5] rounded-[99px] shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] flex justify-center items-center gap-2.5 hover:bg-[#c2c2c5] transition-colors cursor-pointer"
              >
                <div className="justify-center text-[#07080b] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">
                  Remove Featured
                </div>
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2.5 bg-[#ea3c4d] rounded-[99px] shadow-[0px_1px_2px_0px_rgba(5,32,81,0.05)] flex justify-center items-center gap-2.5 hover:bg-[#d93545] transition-colors cursor-pointer"
              >
                <div className="justify-center text-white text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">
                  Delete Profile
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="w-[994px] px-8 pt-8 pb-12 rounded-3xl outline outline-[0.50px] outline-offset-[-0.50px] outline-[#a5a5ab] inline-flex flex-col justify-start items-start gap-6">

          <div className="self-stretch pb-2 border-b border-[#a5a5ab] inline-flex justify-center items-center gap-2.5">
            <div className="w-[869px] justify-start text-black text-lg font-semibold font-['Montserrat'] leading-[28.80px]">
              {reviews.length} Ratings
            </div>
          </div>

            {/* Add DjRatings component before reviews */}
            <DjRatings 
            ratings={ratingDistribution}
            tags={djTags}
            djName={djProfile.name}
            />

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
