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

const HotelListTable = () => {
  const { token } = useToken();
   const [hotels, setHotels] = useState<any[]>([]);
   const [dataCount , setDataCount] = useState<any>() 
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [selectHotel, setSelectHotel] = useState<any>(null);
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 
 
   const limit = 5;
 
   const fetchhotels = async () => {
     try {
       const response = await UserService.getAllHotel({ token, context: null, page, limit });
       setHotels(response?.data.data || []);
       const total = response?.data.pagination.totalData || 0;
       setDataCount(response?.data.pagination.totalData);
 
       setTotalPages(Math.ceil(total / limit));
     } catch (error: any) {
       toast.error(error?.message || "Failed to load hotels");
     }
   };
 
   useEffect(() => {
     fetchhotels();
   }, [page]);
 
   const handleDeleteClick = (id: string) => {
     setSelectHotel(id);
     setDeleteDialogOpen(true);
   };
 
   const handleDelete = async () => {
   try {
     const res = await UserService.deleteHotel(selectHotel, token);
     if (res.status === 200 || res.status === 204) {
       toast.success("Hotel deleted successfully");
 
       // ✅ Filter out the deleted restaurant from local state
       setHotels((prev) =>
         prev.filter((restaurant) => restaurant.id !== selectHotel)
       );
 
       // ✅ Also update the total data count
       setDataCount((prev: number) => prev - 1);
     } else {
       toast.error("Something went wrong while deleting.");
     }
   } catch (error: any) {
     toast.error(error?.message || "Failed to delete Hotel");
   } finally {
     setDeleteDialogOpen(false);
     setSelectHotel(null);
   }
 };
 
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 pt-4 lg:pt-0 w-[760px] md:w-auto md:pr-0 pr-3">
        <h2 className="text-2xl font-medium text-[#232323] !font-[Poppins]">
          Hotel List
        </h2>
        <Link
          href="/dashboard/hotel/add-hotel"
          className="bg-primaryColor  font-medium text-white lg:px-5 lg:py-3 px-3 py-2 text-base rounded-[8px] cursor-pointer"
        >
          Add Hotel
        </Link>
      </div>

      <div className=" flex flex-col md:w-full md:overflow-auto ">
        <div className="  rounded-md ">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 bg-[#FAFAFA] text-[#4A4A4A] font-normal text-xs ">
              <tr>
                <th className="px-4 text-start py-4 font-normal text-xs">Sl</th>
                <th className="px-4 text-start py-4 font-normal text-xs">
                  Hotel Name
                </th>
                <th className="px-4 text-start py-4 font-normal text-xs">
                  Image
                </th>
                <th className="px-4 text-start py-4 font-normal text-xs">
                  Number of review
                </th>
                <th className="px-4 text-start py-4 font-normal text-xs">
                  Rating
                </th>
                <th className="px-4 text-start py-4 font-normal text-xs">
                  Location
                </th>
                <th className="px-4 text-start py-4 font-normal text-xs md:w-[120px]">
                  Booking Link
                </th>
                <th className="px-4 text-start py-4 font-normal text-xs">
                  Amenities
                </th>
                <th className="px-4 text-start py-4 font-normal text-xs">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=" text-[#111]">
              {hotels.map((hotel, index) => (
                <tr
                  key={hotel?.id}
                  className="border-b-[0.5px] border-borderColor"
                >
                  <td className="px-4 py-3 text-sm font-normal">{(page - 1) * limit + index + 1}</td>
                  <td className="px-4 py-3 text-sm font-normal">
                    {hotel.name}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        fill
                        sizes="32px"
                        className=" h-full w-full"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-normal">
                    {hotel.numberOfReview}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal">
                    <span className="">{hotel.rating}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-normal">
                    {hotel.location}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal md:w-[120px]">
                    <Link
                      href={`#`}
                      className="  !w-[120px]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {hotel.bookingLink}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm font-normal">
                    <ul className="space-y-1">
                      {hotel?.pool && (
                        <li className=" flex gap-2 items-center">
                          <Image
                            src="/images/icons/pool.png"
                            width={16}
                            height={16}
                            alt="pool"
                          />
                          Pool
                        </li>
                      )}
                      {hotel?.restaurant && (
                        <li className=" flex gap-2 items-center">
                          <Image
                            src="/images/icons/restaurant.png"
                            width={16}
                            height={16}
                            alt="restaurant"
                          />
                          Restaurant
                        </li>
                      )}
                      {hotel?.freeWifi && (
                        <li className=" flex gap-2 items-center">
                          <Image
                            src="/images/icons/wifi.png"
                            width={16}
                            height={16}
                            alt="restaurant"
                          />
                          Free Wifi
                        </li>
                      )}
                      {hotel?.spa && (
                        <li className=" flex gap-2 items-center">
                          <Image
                            src="/images/icons/spa.png"
                            width={16}
                            height={16}
                            alt="restaurant"
                          />
                          Spa
                        </li>
                      )}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-sm font-normal">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => handleDeleteClick(hotel.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <div className="w-full flex justify-between items-center mt-6 text-sm text-gray-600">
        <span>
          {(page - 1) * limit + 1} -{" "}
          {Math.min(page * limit,dataCount  )} Result Showing Out of{" "}
          {dataCount}
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
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this hotel? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HotelListTable;
