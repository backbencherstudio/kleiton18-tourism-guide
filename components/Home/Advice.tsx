import React from "react";
import HeadingTwo from "../reusable/HeadingTwo";

const Advice = () => {
  return (
    <div className="bg-[#FFF5F5] px-4 py-10 md:py-20">
      <div className="max-w-[1320px]  mx-auto flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 flex flex-col items-start gap-8">
          <HeadingTwo
            HeadingText={
              "Respect local traditions, try authentic cuisine, stay safe, and embrace Albania’s natural beauty with care."
            }
          />
          <div className="flex items-start justify-start gap-8">
            <img
              src="/images/md.png"
              className="w-[100px] h-[100px] rounded-full"
              alt=""
            />
            <div className="flex flex-col items-start gap-4">
              <p className="text-[16px] text[#4A4A4A] leading[160%]">
                Discover the breathtaking landscapes, rich history, and vibrant
                culture of Albania. our Virtual & Technologically Enabled Travel
                Guide ensures a seamless and unforgettable journey.
              </p>
              <img src="/images/signature.png" alt="" />
            </div>
          </div>
        </div>
        <div className="relative w-full lg:w-1/2">
          <img src="/images/hv.png" className="ms-auto rounded-[8px]" alt="" />
          <img src="/images/np.png" className="absolute top-1/2 -translate-y-1/2 border-[2px] border-white rounded-[8px]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Advice;
