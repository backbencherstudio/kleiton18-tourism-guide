"use client";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeadingTwo from "../reusable/HeadingTwo";

const TraditionalDish = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const { getAlltraditionalDish } = UserService;
  const { token }: any = useToken();
  // Fetch Dish Data from API
  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
    const Restaurant = await getAlltraditionalDish({ token: "" });
        const result = Restaurant.data.data;

        // Sort by id DESC (latest first), then slice top 4
        const latestHotels = result
          .sort((a: any, b: any) => b.id - a.id)
          .slice(0, 3);
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
    <div className="bg-[#FAFAFA] px-4 py-10 md:py-20">
      <div className="max-w-[1320px]  mx-auto flex flex-col gap-11">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <HeadingTwo HeadingText={"Traditional Dish"} />
          <Link
            href={"/"}
            className="flex items-center justify-center gap-3 px-4 lg:px-8 py-2 lg:py-6 rounded-[8px] text-white bg-[#F81E1E]"
          >
            Explore All <ArrowRight />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {loading ? (
            <p>Loading hotels...</p>
          ) : (
            data.map((dish) => (
              <div
                key={dish.id}
                className="flex flex-col gap-5 rounded-[12px] bg-[#FAFAFA]"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full min-h-[440px] object-cover rounded-[8px]"
                />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={
                            i < Math.round(dish.rating) ? "#FF991F" : "none"
                          }
                          stroke="#FF991F"
                        />
                      ))}
                      <p className="ms-2 text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                        {dish.rating} Out of {dish.numberOfReview} Review
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <h3 className="text-[22px] lg:text-[32px] leading-[140%] font-medium">
                        {dish.name}
                      </h3>
                      <p className="text-[22px] lg:text-[32px] leading-[140%] font-medium countNumber">
                        {dish.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Link
                      href={token ? dish?.bookingLink : "/login"}
                      className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                    >
                      Book Now
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                       href={token ? dish?.bookingLink : "/login"}
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
  );
};

export default TraditionalDish;
