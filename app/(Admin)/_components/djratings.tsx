import React from 'react';

interface Tag {
  text: string;
}

interface RatingDistribution {
  rating: number;
  label: string;
  count: number;
  percentage: number;
}

interface DjRatingsProps {
  ratings: RatingDistribution[];
  tags: Tag[];
  djName: string;
}

export default function DjRatings({ ratings, tags, djName }: DjRatingsProps) {
  return (
    <div className="self-stretch pb-12 border-b border-[#d2d2d5] inline-flex flex-col justify-start items-start gap-8">
      <div className="w-[869px] p-8 bg-[#f8f9fb] rounded-3xl flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch justify-center text-[#07080b] text-lg font-semibold font-['Montserrat'] leading-[28.80px]">
            Rating Distribution
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            {ratings.map((item) => (
              <div key={item.rating} className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="w-32 h-[31px] justify-center text-[#07080b] text-base font-semibold font-['Montserrat'] leading-relaxed tracking-tight">
                  {item.label} {item.rating}
                </div>
                <div className="w-[504px] h-[26px] relative">
                  <div className="w-[504px] h-[26px] left-0 top-0 absolute bg-[#d2d2d5] rounded" />
                  <div 
                    className="h-[26px] left-0 top-0 absolute bg-[#a601aa] rounded" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="w-20 h-9 justify-center text-[#07080b] text-base font-semibold font-['Montserrat'] leading-relaxed tracking-tight">
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="self-stretch opacity-80 flex flex-col justify-start items-start gap-8">
        <div className="self-stretch justify-center text-[#07080b] text-lg font-semibold font-['Montserrat'] leading-[28.80px]">
          {djName}&apos;s Tags
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-4 flex-wrap content-center">
          {tags.map((tag, index) => (
            <div 
              key={index}
              className="px-4 py-3.5 bg-[#eceff3] rounded-[99px] flex justify-center items-center gap-2.5"
            >
              <div className="justify-center text-[#a601aa] text-xs font-medium font-['Montserrat'] leading-none tracking-tight">
                {tag.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 