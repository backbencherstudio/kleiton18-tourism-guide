"use client";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import HeadingTwo from "../reusable/HeadingTwo";
import Loading from "../reusable/Loading";
const HotelListing = () => {
   const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAllHotel } = UserService;
  const { token }: any = useToken();

  // Fetch Hotel Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allHotel = await getAllHotel({ token, page: 1, limit: 4 });
        const result = allHotel.data.data;
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
  }, []);

  const handleFavorite = async (id: number) => {
    const dataToSend = {
      entityId: id,
      entityType: "HOTEL",
    };
    try {
      const response = await UserService.addFavorite(dataToSend, token);
      if (response.status === 201) {
        toast.success("Added to favorites!");
        setData((prev) =>
          prev.map((hotel) =>
            hotel.id === id ? { ...hotel, isFavorite: true } : hotel
          )
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      const response = await UserService.deleteFavorite(id, "HOTEL", token);
      if (response.status === 200) {
        toast.success("Removed from favorites!");
        setData((prev) =>
          prev.map((hotel) =>
            hotel.id === id ? { ...hotel, isFavorite: false } : hotel
          )
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };
  return (
    <>
      <div className="max-w-[1352px] px-4 py-10 md:py-20 mx-auto">
        <div className="flex flex-col gap-11">
          <div className="flex items-center justify-between">
            <HeadingTwo HeadingText={"Hotel Listing"} />
            <Link
              href={"/hotel"}
              className="flex items-center justify-center gap-3 px-4 lg:px-8 py-2 lg:py-6 rounded-[8px] text-white bg-[#F81E1E]"
            >
              Explore All <ArrowRight />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
             <Loading />
            ) : (
              data.map((hotel) => (
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
                      <h3 className="min-h-[67px] text-[24px] leading-[140%] font-medium">
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
                          <img src="/images/icons/pool.png" alt="" />
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
                      {
                        token ?
                          (hotel?.isFavorite ?
                            (<button
                              onClick={() => handleRemoveFavorite(hotel?.id)}
                              className={"w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"}
                            >
                             <FaHeart className=" text-yellow-400"/>

                            </button> )
                            : 
                            (<button
                              onClick={() => handleFavorite(hotel?.id)}
                              className={"w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"}
                            >
                               <FaHeart className="text-[#737373]"/>
                            </button>)) 
                            : 
                            (<Link href="/login"

                              className="w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"
                            >
                             <FaHeart  className="text-[#737373]"/>
                          </Link>)
                      }

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
