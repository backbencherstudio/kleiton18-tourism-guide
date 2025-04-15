"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function RestaurantTable() {
  const { token } = useToken();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);


  const limit = 10;

  const fetchRestaurants = async () => {
    try {
      const response = await UserService.getAllRestaurant({ token, context: null, page, limit });
      setRestaurants(response?.data.data || []);
      const total = response?.data.pagination.totalData || 0;
      console.log(response?.data.pagination.totalData);

      setTotalPages(Math.ceil(total / limit));
    } catch (error: any) {
      toast.error(error?.message || "Failed to load restaurants");
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [page]);

  const handleDeleteClick = (id: string) => {
    setSelectedRestaurant(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    console.log("Deleting ID:", selectedRestaurant);
    // Actual delete API call should go here
    setDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-4 w-full">
          <h2 className="text-2xl font-medium text-[#232323] font-[Poppins]">
            Restaurant List
          </h2>
          <Link
            href="/dashboard/restaurant/add-restaurant"
            className="bg-primaryColor font-medium text-white lg:px-5 lg:py-3 px-3 py-2 text-base rounded-[8px] cursor-pointer"
          >
            Add Restaurant
          </Link>
        </div>

        <table className="min-w-full text-sm text-left">
          <thead className="sticky top-16 bg-[#FAFAFA] text-[#4A4A4A] font-normal text-xs ">
            <tr className="!rounded-[16px]">
              <th className="px-4 py-3 font-normal text-xs">Sl</th>
              <th className="px-4 py-3 font-normal text-xs">Restaurant Name</th>
              <th className="px-4 py-3 font-normal text-xs">Image</th>
              <th className="px-4 py-3 font-normal text-xs">Number of review</th>
              <th className="px-4 py-3 font-normal text-xs">Rating</th>
              <th className="px-4 py-3 font-normal text-xs">Open</th>
              <th className="px-4 py-3 font-normal text-xs">Close</th>
              <th className="px-4 py-3 font-normal text-xs">Location</th>
              <th className="px-4 py-3 font-normal text-xs">Booking Link</th>
              <th className="px-4 py-3 font-normal text-xs">Details</th>
              <th className="px-4 py-3 font-normal text-xs">Action</th>
            </tr>
          </thead>
          <tbody className=" text-[#111]">
            {restaurants.map((restaurant, index) => (
              <tr key={index} className="border-b-[0.5px] border-borderColor">
                <td className="px-4 py-3 text-sm font-normal">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-normal">{restaurant.name}</td>
                <td className="px-4 py-3 text-sm font-normal">
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      width={30}
                      height={30}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-normal">{restaurant.numberOfReview}</td>

                <td className="px-4 py-2">{restaurant.rating}</td>
                <td className="px-4 py-2">{restaurant.openTime}</td>
                <td className="px-4 py-2">{restaurant.closeTime}</td>
                <td className="px-4 py-2">{restaurant.location}</td>
                <td className="px-4 py-2">  <Link
                  href={restaurant.bookingLink}
                  className="  "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {restaurant.bookingLink}
                </Link></td>
                <td className="px-4 py-2">{restaurant?.details}</td>
                <td className="px-4 py-3 text-sm font-normal">
                  <div className="flex items-center space-x-2">

                    <button className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => handleDeleteClick(restaurant.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-between items-center mt-6 text-sm text-gray-600">
        <span>
          {(page - 1) * limit + 1} -{" "}
          {Math.min(page * limit, restaurants.length * totalPages)} Result Showing Out of{" "}
          {restaurants.length * totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-2 py-1 rounded border ${page === 1 ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""
              }`}
          >
            &#x276E;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-black text-white" : "bg-white text-black"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-2 py-1 rounded border ${page === totalPages ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""
              }`}
          >
            &#x276F;
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this restaurant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className=" cursor-pointer" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RestaurantTable;
