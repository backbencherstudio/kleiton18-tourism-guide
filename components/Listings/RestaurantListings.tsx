"use client";

import React, { useEffect, useState } from "react";
import HeadingTwo from "../reusable/HeadingTwo";
import Link from "next/link";
import { ArrowRight, Search, Star } from "lucide-react";
import { Input } from "../ui/input";

const RestaurantListings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationSearch, setLocationSearch] = useState("");

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

  const filteredRestaurants = data.filter((item) =>
    item.location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1352px] px-4 py-10 md:py-20 mx-auto">
      <div className="flex flex-col gap-12">
        <HeadingTwo HeadingText={"Restaurant Listing"} />

        <div className="flex items-start gap-4">
          <div className="sticky top-[120px] w-[318px]">
            <div className="max-h-[calc(100vh-140px)] overflow-auto p-4 flex flex-col gap-5 border border-[#EDEDED] rounded-[12px] bg-white">
              <h4 className="text-[20px] text-[#111111] font-medium leading-[150%]">
                Filter by Location
              </h4>
              <div className="relative w-full border border-[#737373] rounded-[8px] bg-white">
                <Input
                  placeholder="Search"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="pl-8 pr-[130px] h-[60px] text-[#111111] placeholder:text-[#737373] text-[16px] leading-[130%] border-none focus:ring-0 focus:outline-none shadow-none"
                />
                <Search
                  color="#737373"
                  size={16}
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>
          <div className="w-[74.7%] grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading restaurants...</p>
            ) : filteredRestaurants.length === 0 ? (
              <p>No restaurants match your filter.</p>
            ) : (
              filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="flex flex-col gap-4 border border-[#E0E0E0] p-4 rounded-[12px] bg-[#FAFAFA]"
                >
                  <img
                    src={restaurant.image_link}
                    alt={restaurant.name}
                    className="w-full h-[220px] object-cover rounded-[8px]"
                  />

                  <div className="flex flex-col gap-3">
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
                        {restaurant.rating} out of {restaurant.total_reviews}{" "}
                        reviews
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <img src="/images/icons/location.png" alt="" />
                      <p className="text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                        {restaurant.location}
                      </p>
                    </div>

                    <h3 className="text-[20px] font-medium">
                      {restaurant.name}
                    </h3>

                    <p className="text-[14px] text-[#4A4A4A] leading-[160%] truncate">
                      {restaurant.details}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/images/icons/open.png" alt="open" />
                        <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                          Open: {restaurant.open_time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/images/icons/close.png" alt="close" />
                        <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                          Close: {restaurant.close_time}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Link
                        href={restaurant.booking_link}
                        className="flex items-center gap-2 text-[#111111] text-[16px]"
                      >
                        Book Now <ArrowRight size={18} />
                      </Link>
                      <Link
                        href={restaurant.details_link}
                        className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"
                      >
                        <img src="/images/icons/heart.png" alt="heart" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListings;
