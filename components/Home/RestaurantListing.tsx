"use client";

import React, { useEffect, useState, useRef } from "react";
import HeadingTwo from "../reusable/HeadingTwo";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const RestaurantListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const url = "/restaurant.json";

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching restaurant data:", error);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <div className="max-w-[1352px] px-4 pt-10 pb-20 md:pb-32 md:pt-20 mx-auto">
      <div className="flex flex-col gap-11">
        <div className="flex items-center justify-between">
          <HeadingTwo HeadingText={"Restaurant Listing"} />
          <Link
            href={"/"}
            className="flex items-center justify-center gap-3 px-8 py-6 rounded-[8px] text-white bg-[#F81E1E]"
          >
            Explore All <ArrowRight />
          </Link>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            slidesPerView={2}
            spaceBetween={20}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              if (typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="pb-16"
          >
            {loading ? (
              <p>Loading restaurants...</p>
            ) : (
              data.map((restaurant) => (
                <SwiperSlide key={restaurant.id}>
                  <div className="flex gap-5 h-full p-5 border border-[#E0E0E0] rounded-[12px] bg-[#FAFAFA] overflow-hidden">
                    <div className="max-w-[260px]">
                      <img
                        src={restaurant.image_link}
                        alt={restaurant.name}
                        className="w-full h-full object-cover rounded-[8px]"
                      />
                    </div>
                    <div className="flex flex-col gap-10">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col items-start gap-2">
                          <div className="flex items-center gap-2 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                fill={
                                  i < Math.round(restaurant.rating)
                                    ? "#facc15"
                                    : "none"
                                }
                                stroke="#facc15"
                                className="w-4 h-4"
                              />
                            ))}
                            <p className="text-sm text-gray-700">
                              {restaurant.rating} Out of{" "}
                              {restaurant.total_reviews} Review
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/location.png" alt="" />
                            <p className="text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                              {restaurant.location}
                            </p>
                          </div>
                          <h3 className="text-[24px] leading-[140%] font-medium">
                            {restaurant.name}
                          </h3>
                        </div>
                        <p className="text-[16px] leading-[160%] text-[#4A4A4A]">
                          {restaurant.details}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/open.png" alt="" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                              Open: {restaurant.open_time}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/close.png" alt="" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                              Close: {restaurant.close_time}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Link
                          href={restaurant.booking_link}
                          className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                        >
                          Book Now
                          <ArrowRight size={18} />
                        </Link>
                        <Link
                          href={restaurant.details_link}
                          className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"
                        >
                          <img src="/images/icons/heart.png" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

          {/* Custom bottom-right arrows */}
          <div className="absolute -bottom-10 right-0 z-10 flex gap-2">
            <button
              ref={prevRef}
              className="w-8 h-8 flex items-center justify-center bg-[#F81E1E] text-white px-3 py-2 rounded cursor-pointer"
            >
              ←
            </button>
            <button
              ref={nextRef}
              className="w-8 h-8 flex items-center justify-center bg-[#F81E1E] text-white px-3 py-2 rounded cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListing;
