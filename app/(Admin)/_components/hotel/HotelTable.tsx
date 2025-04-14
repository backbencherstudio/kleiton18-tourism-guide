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
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HotelListTable = ({ allHotel }: any) => {
  const [page, setPage] = useState<number>(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);

  const handleDeleteClick = (hotelId: number) => {
    setSelectedHotel(hotelId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    // In a real app, you would delete the hotel from your database here
    console.log(`Deleting hotel with ID: ${selectedHotel}`);
    setDeleteDialogOpen(false);
  };
  const parPage = 5;
  const skipHotel = page * parPage;
  const countpage = Math.ceil(allHotel.length / parPage);
  const validHotels = Array.isArray(allHotel.data) ? allHotel.data : [];

  const perPageHotel =
    validHotels.length > 8
      ? validHotels.slice(skipHotel, skipHotel + parPage)
      : validHotels;
  console.log("hotel=========", perPageHotel);

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < countpage - 1) setPage((prev) => prev + 1);
  };
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4  w-[760px] md:w-auto md:pr-0 pr-3">
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

      <div className=" flex flex-col ">
        <div className="  rounded-md ">
          <table className="min-w-full text-sm table-fixed">
            <thead className=" bg-[#FAFAFA] text-[#4A4A4A] font-normal text-xs text-start">
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
                <th className="px-4 text-start py-4 font-normal text-xs !w-[120px]">
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
              {perPageHotel.map((hotel, index) => (
                <tr
                  key={hotel?.id}
                  className="border-b-[0.5px] border-borderColor"
                >
                  <td className="px-4 py-3 text-sm font-normal">{index + 1}</td>
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
                  <td className="px-4 py-3 text-sm font-normal !w-[120px]">
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
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600 mb-6 lg:mb-0 w-[760px] md:w-auto md:pr-0 pr-3">
          <span>
            {skipHotel + 1} -{" "}
            {Math.min(skipHotel + parPage, validHotels.length)} Result Showing
            Out of {validHotels.length}
          </span>
          {allHotel.length > 8 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className={`px-2 py-1 rounded border cursor-pointer ${
                  page === 0 ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""
                }`}
                disabled={page === 0}
              >
                &#x276E;
              </button>

              {[...Array(countpage)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`px-3 py-1 rounded border cursor-pointer ${
                    page === index
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                className={`px-2 py-1 rounded border cursor-pointer ${
                  page === countpage - 1
                    ? "opacity-50  bg-gray-300 cursor-not-allowed"
                    : ""
                }`}
                disabled={page === countpage - 1}
              >
                &#x276F;
              </button>
            </div>
          )}
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
