"use client";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { ArrowRight, Search, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import HeadingTwo from "../reusable/HeadingTwo";
import Loading from "../reusable/Loading";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const RestaurantListings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationSearch, setLocationSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  
  const { token }: any = useToken();

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getAllRestaurant({ token, page, limit });
        const result = response.data.data;
        const total = response?.data.pagination?.totalData || 0;

        setData(result);
        setTotalPages(Math.ceil(total / limit));
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
  }, [page, token]);

  const filteredRestaurants = data.filter((item) =>
    item.location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  function formatNumber(num: number): string {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return num.toString();
  }

  const handleFavorite = async (id: number) => {
    const dataToSend = { entityId: id, entityType: "RESTAURANT" };
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
      const response = await UserService.deleteFavorite(id, "RESTAURANT", token);
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
    <div className="max-w-[1352px] px-4 py-10 md:py-20 mx-auto">
      <div className="flex flex-col gap-12">
        <HeadingTwo HeadingText={"Restaurant Listing"} />

        <div className="flex flex-col lg:flex-row items-start gap-4">
          <div className="w-full sticky top-[120px] lg:w-[318px]">
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

          <div className="w-full lg:w-[74.7%]">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <Loading />
              ) : filteredRestaurants.length === 0 ? (
                <p>No restaurants match your filter.</p>
              ) : (
                filteredRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="flex flex-col gap-4 border border-[#E0E0E0] p-4 rounded-[12px] bg-[#FAFAFA]"
                  >
                    <img
                      src={restaurant.image}
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
                          {formatNumber(restaurant.rating)} out of {formatNumber(restaurant.numberOfReview)}{" "}
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

                      <p className="text-[14px] text-[#4A4A4A] leading-[160%] lg:truncate">
                        {restaurant.details}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/open.png" alt="open" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Open: {restaurant.openTime}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <img src="/images/icons/close.png" alt="close" />
                          <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                            Close: {restaurant.closeTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Link
                          href={token ? restaurant?.bookingLink : "/login"}
                          className="flex items-center gap-2 text-[#111111] text-[16px]"
                        >
                          Book Now <ArrowRight size={18} />
                        </Link>
                        <div>
                          {token ? (
                            restaurant?.isFavorite ? (
                              <button
                                onClick={() => handleRemoveFavorite(restaurant?.id)}
                                className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"
                              >
                                <FaHeart className="text-yellow-400" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleFavorite(restaurant?.id)}
                                className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"
                              >
                                <FaHeart className="text-[#737373]" />
                              </button>
                            )
                          ) : (
                            <Link
                              href={"/login"}
                              className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"
                            >
                              <img src="/images/icons/heart.png" alt="heart" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <Button
                   className="text-white bg-primaryColor cursor-pointer"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <p className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </p>
                <Button
                   className="text-white bg-primaryColor cursor-pointer"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantListings;
