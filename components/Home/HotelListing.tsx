"use client";

import React, { useEffect, useState } from "react";
import HeadingTwo from "../reusable/HeadingTwo";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const HotelListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Hotel Data from API
  useEffect(() => {
    const controller = new AbortController();
    const url = "/hotel.json";

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        const result = await response.json();

        // Sort by id DESC (latest first), then slice top 4
        const latestHotels = result
          .sort((a: any, b: any) => b.id - a.id)
          .slice(0, 4);
        setData(latestHotels);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching hotel data:", error);
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
    <>
      <div className="max-w-[1352px] px-4 py-10 md:py-20 mx-auto">
        <div className="flex flex-col gap-11">
          <div className="flex items-center justify-between">
            <HeadingTwo HeadingText={"Hotel Listing"} />
            <Link
              href={"/hotel"}
              className="flex items-center justify-center gap-3 px-8 py-6 rounded-[8px] text-white bg-[#F81E1E]"
            >
              Explore ALl <ArrowRight />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
              <p>Loading hotels...</p>
            ) : (
              data.map((hotel) => (
                <div
                  key={hotel.id}
                  className="flex flex-col gap-5 border border-[#E0E0E0] p-4 rounded-[12px] bg-[#FAFAFA]"
                >
                  <img
                    src={hotel.image_link}
                    alt={hotel.name}
                    className="w-full h-[220px] object-cover rounded-[8px]"
                  />
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={
                              i < Math.round(hotel.rating) ? "#FF991F" : "none"
                            }
                            stroke="#FF991F"
                          />
                        ))}
                        <p className="ms-2 text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                          {hotel.rating} Out of {hotel.total_reviews} Review
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/images/icons/location.png" alt="" />
                        <p className="text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                          {hotel.location}
                        </p>
                      </div>
                      <h3 className="text-[24px] leading-[140%] font-medium">
                        {hotel.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {hotel.amenities.spa && (
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/spa.png" alt="" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Spa
                          </p>
                        </div>
                      )}
                      {hotel.amenities.pool && (
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/wifi.png" alt="" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Pool
                          </p>
                        </div>
                      )}
                      {hotel.amenities.free_wifi && (
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/wifi.png" alt="" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Free Wifi
                          </p>
                        </div>
                      )}
                      {hotel.amenities.restaurant && (
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/restaurant.png" alt="" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Restaurant
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Link
                        href={hotel.booking_link}
                        className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                      >
                        Book Now
                        <ArrowRight size={18} />
                      </Link>
                      <Link
                        href={hotel.details_link}
                        className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"
                      >
                        <img src="/images/icons/heart.png" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelListing;
