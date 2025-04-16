"use client";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeadingTwo from "../reusable/HeadingTwo";

const RestaurantListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { getAllRestaurant } = UserService;
  const { token }: any = useToken();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Restaurant = await getAllRestaurant({ token, page: 1, limit: 10 });
        const result = Restaurant.data.data;
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
  }, []);
const handleFavorite =async(id:any)=>{
  const data ={
    entityId: id,
  entityType: "RESTAURANT",
  }
  try {
     const response = await UserService.addFavorite(data ,token )
     if(response.status === 201){
       toast.success("Added to favorites!");
     }
  } catch (error:any) {
    toast.error(  error.response.data.message || error?.message);
  }   
}
  return (
    <div className="max-w-[1352px] px-4 pt-10 pb-20 md:pb-32 md:pt-20 mx-auto">
      <div className="flex flex-col gap-11">
        <div className="flex items-center justify-between">
          <HeadingTwo HeadingText={"Restaurant Listing"} />
          <Link
            href={"/restaurant"}
            className="flex items-center justify-center gap-3 px-4 lg:px-8 py-2 lg:py-6 rounded-[8px] text-white bg-[#F81E1E]"
          >
            Explore All <ArrowRight />
          </Link>
        </div>

        <div className="relative w-full">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1280: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="pb-16 w-full"
          >
            {loading ? (
              <p>Loading restaurants...</p>
            ) : (
              data.map((restaurant) => (
                <SwiperSlide key={restaurant.id} className="w-full">
                  <div className="flex flex-col md:flex-row gap-5 h-full p-5 border border-[#E0E0E0] rounded-[12px] bg-[#FAFAFA] overflow-hidden">
                    <div className="w-full md:min-w-[260px] md:max-w-[260px] h-[275px]">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover rounded-[8px]"
                      />
                    </div>
                    <div className="flex flex-col gap-10 w-full">
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
                              {restaurant.numberOfReview} Review
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/location.png" alt="" />
                            <p className="text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                              {restaurant.location}
                            </p>
                          </div>
                          <h3 className="text-[22px] lg:text-[32px] leading-[140%] font-medium">
                            {restaurant.name}
                          </h3>
                        </div>
                        <p className="text-[16px] leading-[160%] text-[#4A4A4A] line-clamp-2">
                          {restaurant.details}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/open.png" alt="" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                              Open: {restaurant.openTime}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/close.png" alt="" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                              Close: {restaurant.closeTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Link
                          href={token ? restaurant?.bookingLink : "/login"}
                          className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                        >
                          Book Now
                          <ArrowRight size={18} />
                        </Link>
                        <button
                         onClick={()=>handleFavorite(restaurant?.id)}
                          className="w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"
                        >
                          <img src="/images/icons/heart.png" alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>

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
