"use client";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { ArrowRight, Search, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeadingTwo from "../reusable/HeadingTwo";
import { Input } from "../ui/input";

const HotelListings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationSearch, setLocationSearch] = useState("");
 const { getAllHotel } = UserService;
      const { token }: any = useToken();
  useEffect(() => {
   
    const controller = new AbortController();
    const url = "/hotel.json";

    const fetchData = async () => {
      try {
        const allHotel = await getAllHotel({ token: "" });

        const result = allHotel.data.data;
        setData(result);
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

  const filteredHotels = data.filter((hotel) =>
    hotel.location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1352px] px-4 py-10 md:py-20 mx-auto">
      <div className="flex flex-col gap-12">
        <HeadingTwo HeadingText={"Hotel Listing"} />

        <div className="flex flex-col lg:flex-row items-start gap-4">
          <div className="w-full lg:w-[318px] sticky top-[120px] p-4 flex flex-col items-start lg:items-center justify-between gap-5 border border-[#EDEDED] rounded-[12px] bg-white">
            <div className="flex flex-col items-start gap-4 w-full">
              <h4 className="text-[20px] text-[#111111] font-medium leading-[150%]">
                Filter by Location
              </h4>
              <div className="relative w-full border border-[#737373] rounded-[8px] bg-white">
                <Input
                  placeholder="Search"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="pl-8 pr-[130px] h-[60px] text-[#111111] placeholder:text-[#737373] text-[16px] leading-[130%] border-none focus:border-none focus:ring-0 focus:outline-none shadow-none focus-visible:ring-0"
                />
                <Search
                  color="#737373"
                  size={16}
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[74.7%] grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading hotels...</p>
            ) : filteredHotels.length === 0 ? (
              <p>No hotels match your filter.</p>
            ) : (
              filteredHotels.map((hotel) => (
               <div
                  key={hotel.id}
                  className="flex flex-col gap-5 border border-[#E0E0E0] p-4 rounded-[12px] bg-[#FAFAFA]"
                >
                  <img
                    src={hotel.image}
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
                          {hotel.rating} Out of {hotel.numberOfReview} Review
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
                      {hotel.spa && (
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/spa.png" alt="" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Spa
                          </p>
                        </div>
                      )}
                      {hotel.pool && (
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/wifi.png" alt="" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Pool
                          </p>
                        </div>
                      )}
                      {hotel.freeWifi && (
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/wifi.png" alt="" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Free Wifi
                          </p>
                        </div>
                      )}
                      {hotel.restaurant && (
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
                        href={token ? hotel?.bookingLink : "/login"}
                        className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                      >
                        Book Now
                        <ArrowRight size={18} />
                      </Link>
                      <Link
                        href={token ? hotel?.bookingLink : "/login"}
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

export default HotelListings;
