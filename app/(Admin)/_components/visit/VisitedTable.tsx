"use client"

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

function VisitedTable() {
    const [page, setPage] = useState<number>(0);

    const restaurants = Array.from({ length: 50 }, (_, i) => ({
        sl: i + 1,
        name: "Taste Saranda",
        location: "Dhaka",
        bookingLink: "bookinglink.org",
        image: "/images/up.png",
        description: "Nestled along the breathtaking Albanian Riviera, Elysian Pearl Resort is a sanctuary of",
    }));
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedHotel, setSelectedHotel] = useState<number | null>(null)

    const handleDeleteClick = (hotelId: number) => {
        setSelectedHotel(hotelId)
        setDeleteDialogOpen(true)
    }

    const handleDelete = () => {
        // In a real app, you would delete the hotel from your database here
        console.log(`Deleting hotel with ID: ${selectedHotel}`)
        setDeleteDialogOpen(false)
    }
    const parPage = 6;
    const skiprestaurant = page * parPage;
    const countpage = Math.ceil(restaurants.length / parPage);
    const perPagerestaurant = restaurants.slice(skiprestaurant, skiprestaurant + parPage);

    const handlePrev = () => {
        if (page > 0) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < countpage - 1) setPage((prev) => prev + 1);
    };
    return (
        <div>
            <div className=" flex flex-col justify-between h-full">
                <div>
                    <div className="flex justify-between items-center mb-4  w-[645px] md:w-auto md:pr-0 pr-3">
                        <h2 className="text-2xl font-medium text-[#232323] !font-[Poppins]">
                            Visit Area List
                        </h2>
                        <Link href="/dashboard/visited/add-traditional-dish" className="bg-primaryColor  font-medium text-white lg:px-5 lg:py-3 px-3 py-2 text-base rounded-[8px] cursor-pointer">Add Location</Link>
                    </div>

                    <div className="">
                        <div className=" ">
                            <table className="min-w-full text-sm text-left">
                                <thead className="sticky top-0 bg-[#FAFAFA] text-[#4A4A4A] font-normal text-xs ">
                                    <tr className="!rounded-[16px]">
                                        <th className="px-4 py-4 font-normal text-xs">Sl</th>
                                        <th className="px-4 py-4 font-normal text-xs">Visit Area Name</th>
                                        <th className="px-4 py-4 font-normal text-xs">Image</th>
                                        <th className="px-4 py-4 font-normal text-xs">Location</th>
                                        <th className="px-4 py-4 font-normal text-xs lg:w-[230px]">Description</th>
                                        <th className="px-4 py-4 font-normal text-xs">Booking Link</th>
                                        <th className="px-4 py-4 font-normal text-xs">Action</th>
                                    </tr>
                                </thead>
                                <tbody className=" text-[#111]">
                                    {perPagerestaurant.map((restaurant, index) => (
                                        <tr key={index} className="border-b-[0.5px] border-borderColor">
                                            <td className="px-4 py-3 text-sm font-normal">{restaurant.sl}</td>
                                            <td className="px-4 py-3 text-sm font-normal">{restaurant.name}</td>
                                            <td className="px-4 py-3 text-sm font-normal">
                                                <Image
                                                    src={restaurant.image}
                                                    alt={restaurant.name}
                                                    width={30}
                                                    height={30}
                                                    className="rounded-full"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-sm font-normal">{restaurant.location}</td>

                                            <td className="px-4 py-2 lg:w-[230px]">{restaurant.description}</td>

                                            <td className="px-4 py-2">  <Link
                                                href={`#`}
                                                className="  "
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {restaurant.bookingLink}
                                            </Link></td>

                                            <td className="px-4 py-3 text-sm font-normal">
                                                <div className="flex items-center space-x-2">

                                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(restaurant.sl)}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                {/* Footer */}
                <div className=" w-[645px] md:w-auto md:pr-0 pr-3">
                    <div className="flex justify-between items-center mt-10 text-sm text-gray-600">
                        <span>
                            {skiprestaurant + 1} - {Math.min(skiprestaurant + parPage, restaurants.length)} Result Showing Out of{" "}
                            {restaurants.length}
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrev}
                                className={`px-2 py-1 rounded border cursor-pointer ${page === 0 ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""
                                    }`}
                                disabled={page === 0}
                            >
                                &#x276E;
                            </button>

                            {[...Array(countpage)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPage(index)}
                                    className={`px-3 py-1 rounded border cursor-pointer ${page === index
                                            ? "bg-black text-white"
                                            : "bg-white text-black"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={handleNext}
                                className={`px-2 py-1 rounded border cursor-pointer ${page === countpage - 1 ? "opacity-50  bg-gray-300 cursor-not-allowed" : ""
                                    }`}
                                disabled={page === countpage - 1}
                            >
                                &#x276F;
                            </button>
                        </div>
                    </div>
                </div>

                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this hotel? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default VisitedTable
