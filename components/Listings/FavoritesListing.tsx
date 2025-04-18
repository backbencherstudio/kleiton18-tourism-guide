"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeadingTwo from "../reusable/HeadingTwo";
import Loading from "../reusable/Loading";
import AreaCard from "./AreaCard";
import DishCard from "./DishCard";
import HotelCard from "./HotelCard";
import RestaurantCard from "./RestaurantCard";

const FavoritesListing = () => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [area, setArea] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token }: any = useToken()
  const [reRun, setReRUn] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (token) {
          const resulte = await UserService.getAllFavorite({ token })
          console.log("log", resulte);
          setHotels(resulte.data.data.hotel);
          setRestaurants(resulte.data.data.restaurant);
          setDishes(resulte.data.data.dish);
          setArea(resulte.data.data.visit_area);
        }



      } catch (error) {
        console.error("Error fetching favorite data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleRemoveFavorite = async (id: number, type: string) => {
    try {
      const response = await UserService.deleteFavorite(id, type, token);
      if (response.status === 200) {
        toast.success("Removed from favorites!");

        if (type === "HOTEL") {
          setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
        } else if (type === "DISH") {
          setDishes((prev) => prev.filter((dish) => dish.id !== id));
        } else if (type === "VISIT_AREA") {
          setArea((prev) => prev.filter((area) => area.id !== id));
        } else if (type === "RESTAURANT") {
          setRestaurants((prev) => prev.filter((restaurant) => restaurant.id !== id));
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error?.message);
    }
  };
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
                <Loading />
              ) : (
                hotels.length > 0 ? hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} onUnFav={handleRemoveFavorite} />
                )) : <p className="col-span-4  text-center mt-5 font-semibold">No Hotel items are available in Favorites.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="restaurant">
            <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading ? (
                <Loading />
              ) : (
                restaurants.length > 0 ? restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} onUnFav={handleRemoveFavorite} />
                )) : <p className="col-span-4  text-center mt-5 font-semibold">No Restaurant items are available in Favorites.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="dish">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {loading ? (
                <Loading />
              ) : (
                dishes.length > 0 ? dishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} onUnFav={handleRemoveFavorite} />
                )) : <p className="col-span-4  text-center mt-5 font-semibold">No Tradittional Dish items are available in Favorites.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="area">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 rounded-[12px] overflow-hidden">
              {loading ? (
                <Loading />
              ) : (
                area.length > 0 ? area.map((area, index) => (
                  <AreaCard key={area.id} area={area} onUnFav={handleRemoveFavorite} />
                )) : <p className="col-span-4  text-center mt-5 font-semibold">No area items are available in Favorites.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FavoritesListing;
