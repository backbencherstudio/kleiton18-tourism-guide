"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeadingTwo from "../reusable/HeadingTwo";

const FavoritesListing = () => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [area, setArea] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelRes = await fetch("/hotel.json");
        const restaurantRes = await fetch("/restaurant.json");
        const dishRes = await fetch("/dish.json");
        const areas = await fetch("/area.json");

        const hotelsData = await hotelRes.json();
        const restaurantsData = await restaurantRes.json();
        const dishesData = await dishRes.json();
        const areaData = await areas.json();

        setHotels(hotelsData);
        setRestaurants(restaurantsData);
        setDishes(dishesData);
        setArea(areaData);
      } catch (error) {
        console.error("Error fetching favorite data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-[1352px] px-4 py-10 md:py-20 mx-auto">
      <div className="flex flex-col gap-11">
        <HeadingTwo HeadingText={"Favorite Listing"} />
        <Tabs defaultValue="hotel" className="w-full flex flex-col gap-12">
          <TabsList className="min-h-[57px] flex flex-wrap gap-2 bg-[#FAFAFA] rounded-[12px] p-2">
            <TabsTrigger
              value="hotel"
              className="px-6 py-3 rounded-[8px] border border-[#EDEDED] bg-white data-[state=active]:border-[#FCA3A3] data-[state=active]:bg-[#FFF5F5]"
            >
              Hotels
            </TabsTrigger>
            <TabsTrigger
              value="restaurant"
              className="px-6 py-3 rounded-[8px] border border-[#EDEDED] bg-white data-[state=active]:border-[#FCA3A3] data-[state=active]:bg-[#FFF5F5]"
            >
              Restaurants
            </TabsTrigger>
            <TabsTrigger
              value="dish"
              className="px-6 py-3 rounded-[8px] border border-[#EDEDED] bg-white data-[state=active]:border-[#FCA3A3] data-[state=active]:bg-[#FFF5F5]"
            >
              Popular Dishes
            </TabsTrigger>
            <TabsTrigger
              value="area"
              className="px-6 py-3 rounded-[8px] border border-[#EDEDED] bg-white data-[state=active]:border-[#FCA3A3] data-[state=active]:bg-[#FFF5F5]"
            >
              Visited Area
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotel">
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading ? (
                <p>Loading hotels...</p>
              ) : (
                hotels.map((hotel) => (
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
                                i < Math.round(hotel.rating)
                                  ? "#FF991F"
                                  : "none"
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
                        {hotel.amenities?.spa && (
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/spa.png" alt="" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                              Spa
                            </p>
                          </div>
                        )}
                        {hotel.amenities?.pool && (
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/wifi.png" alt="" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                              Pool
                            </p>
                          </div>
                        )}
                        {hotel.amenities?.free_wifi && (
                          <div className="flex items-center gap-2">
                            <img src="/images/icons/wifi.png" alt="" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                              Free Wifi
                            </p>
                          </div>
                        )}
                        {hotel.amenities?.restaurant && (
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
                          href='/login'
                          className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                        >
                          Book Now
                          <ArrowRight size={18} />
                        </Link>
                        <Link
                         href='/login'
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
          </TabsContent>

          <TabsContent value="restaurant">
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading ? (
                <p>Loading restaurants...</p>
              ) : (
                restaurants.map((restaurant) => (
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
                      <p className="text-[14px] text-[#4A4A4A] leading-[160%] lg:truncate">
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
          </TabsContent>

          <TabsContent value="dish">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {loading ? (
                <p>Loading dishes...</p>
              ) : (
                dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex flex-col gap-5 rounded-[12px] bg-[#FAFAFA]"
                  >
                    <img
                      src={dish.image_link}
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
                            {dish.rating} Out of {dish.total_reviews} Review
                          </p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                          <h3 className="text-[32px] leading-[140%] font-medium">
                            {dish.name}
                          </h3>
                          <p className="text-[32px] leading-[140%] font-medium countNumber">
                            {dish.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Link
                          href={dish.booking_link}
                          className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                        >
                          Book Now
                          <ArrowRight size={18} />
                        </Link>
                        <Link
                          href={dish.details_link}
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
          </TabsContent>

          <TabsContent value="area">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 rounded-[12px] overflow-hidden">
              {loading ? (
                <p>Loading areas...</p>
              ) : (
                area.map((area, index) => {
                  return (
                    <div
                      key={area.id}
                      className={`group relative transition-all duration-300 ease-in-out bg-cover bg-center bg-no-repeat h-[400px] flex flex-col justify-end p-4`}
                      style={{ backgroundImage: `url(${area.image_link})` }}
                    >
                      <div className="absolute inset-0 bg-black/50 z-0" />

                      <div className="relative z-10 w-full flex flex-col gap-3">
                        <div
                          className={`flex items-center gap-2 transform transition-all duration-300 ease-in-out `}
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
                          className={`text-white text-[24px] font-medium leading-[140%] transform transition-all duration-300 ease-in-out`}
                        >
                          {area.name}
                        </h3>

                        <p
                          className={`text-white text-[14px] leading-[160%] tracking-[0.5px] transform transition-all duration-300 ease-in-out`}
                        >
                          {area.details}
                        </p>

                        <div className="flex justify-between items-center mt-2">
                          <Link
                            href={area.details_link}
                            className="flex items-center gap-2 text-[16px] font-normal leading-[130%] text-white"
                          >
                            View Details <ArrowRight size={18} />
                          </Link>
                          <Link
                            href={area.details_link}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FavoritesListing;
