"use client";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeadingTwo from "../reusable/HeadingTwo";

const VisitArea = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isXL, setIsXL] = useState(false);
  const { getAllVisitArea } = UserService;
  const { token } = useToken();

  useEffect(() => {
    const controller = new AbortController();
    const url = "/area.json";

    const fetchData = async () => {
      try {
        const Restaurant = await getAllVisitArea({ token, page: 1, limit: 10 });
        const result = Restaurant.data.data;
        const latestVisit = result
          .sort((a: any, b: any) => b.id - a.id)
          .slice(0, 4);
        setData(latestVisit);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching area data:", error);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXL(window.innerWidth >= 1380);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
 

  return (
    <div className="px-4 py-10 md:py-20">
      <div className="max-w-[1320px] mx-auto flex flex-col gap-11">
        <div className="flex items-center justify-between">
          <HeadingTwo HeadingText={"Must Visit Area's"} />
          <Link
            href={"/"}
            className="flex items-center justify-center gap-3 px-4 lg:px-8 py-2 lg:py-6 rounded-[8px] text-white bg-[#F81E1E]"
          >
            Explore All <ArrowRight />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center rounded-[8px] overflow-hidden">
          {loading ? (
            <p>Loading areas...</p>
          ) : (
            data.map((area, index) => {
              const isHovered = hoveredIndex === index;
              const isDefault = hoveredIndex === null && index === 1;
              const showHover = isXL && (isHovered || isDefault);
              const widthClass = isXL
                ? showHover
                  ? "w-[420px]"
                  : "w-[300px]"
                : "w-full";

              return (
                <div
                  key={area.id}
                  className={`group relative transition-all duration-300 ease-in-out bg-cover bg-center bg-no-repeat h-[400px] flex flex-col justify-end p-4 ${widthClass}`}
                  style={{ backgroundImage: `url(${area.image})` }}
                  onMouseEnter={() => isXL && setHoveredIndex(index)}
                  onMouseLeave={() => isXL && setHoveredIndex(null)}
                >
                  <div className="absolute inset-0 bg-black/50 z-0" />

                  <div className="relative z-10 w-full flex flex-col gap-3">
                    <div
                      className={`flex items-center gap-2 transform transition-all duration-300 ease-in-out ${
                        showHover
                          ? "opacity-100 translate-y-0"
                          : isXL
                          ? "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
                          : "opacity-100 translate-y-0"
                      }`}
                    >
                      <img
                        src="/images/icons/locationwhite.png"
                        alt="Location"
                      />
                      <p className="text-white text-[14px] font-normal leading-[150%]">
                        {area.location}
                      </p>
                    </div>

                    <h3
                      className={`text-white text-[24px] font-medium leading-[140%] transform transition-all duration-300 ease-in-out ${
                        showHover
                          ? "translate-y-0"
                          : isXL
                          ? "translate-y-[80px] group-hover:translate-y-0"
                          : "translate-y-0"
                      }`}
                    >
                      {area.name}
                    </h3>

                    <p
                      className={`text-white text-[14px] leading-[160%] tracking-[0.5px] transform transition-all duration-300 ease-in-out ${
                        showHover
                          ? "opacity-100 translate-y-0"
                          : isXL
                          ? "opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
                          : "opacity-100 translate-y-0"
                      }`}
                    >
                      {area.description}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <Link
                        href="/login"
                        className="flex items-center gap-2 text-[16px] font-normal leading-[130%] text-white"
                      >
                        View Details <ArrowRight size={18} />
                      </Link>
                      <Link
                        href="/login"
                        className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] bg-white shadow p-[6px]"
                      >
                        <img src="/images/icons/heart.png" alt="Heart" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitArea;
