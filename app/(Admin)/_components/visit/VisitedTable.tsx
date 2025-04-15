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
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function VisitedTable() {
  const { token } = useToken();
    const [visited, setVisited] = useState<any[]>([]);
    const [dataCount, setDataCount] = useState<any>();
    const [page, setPage] = useState<any>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectVisitArea, setSelectVisitArea] = useState<any>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const limit = 10;//limit par page
    const fetchVisited = async () => {
      try {
        const response = await UserService.getAllVisitArea({ token, context: null, page, limit });
        setVisited(response?.data.data || []);
        const total = response?.data.pagination.totalData || 0;
      
        setDataCount(total);
        setTotalPages(Math.ceil(total / limit));
      } catch (error: any) {
        toast.error(error?.message || "Failed to load VisitedArea");
      }
    };
  
    useEffect(() => {
      fetchVisited();
    }, [page]);
  
    const handleDeleteClick = (id: string) => {
      setSelectVisitArea(id);
      setDeleteDialogOpen(true);
    };
  
    const handleDelete = async () => {
      try {
        const res = await UserService.deleteVisitArea(selectVisitArea, token);
        if (res.status === 200 || res.status === 204) {
          toast.success("Visited Area deleted successfully");
          setVisited((prev) => prev.filter((dish) => dish.id !== selectVisitArea));
          setDataCount((prev: number) => prev - 1);
        } else {
          toast.error("Something went wrong while deleting.");
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to delete Visited Area");
      } finally {
        setDeleteDialogOpen(false);
        setSelectVisitArea(null);
      }
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
                                        <th className="px-4 py-4 font-normal text-xs">Details link</th>
                                        <th className="px-4 py-4 font-normal text-xs">Action</th>
                                    </tr>
                                </thead>
                                <tbody className=" text-[#111]">
                                    {visited.map((restaurant, index) => (
                                        <tr key={index} className="border-b-[0.5px] border-borderColor">
                                            <td className="px-4 py-3 text-sm font-normal">{(page - 1) * limit + index + 1}</td>
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
                                                {restaurant.detailsLink}
                                            </Link></td>

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
                    </div>
                </div>


                {/* Footer */}
              
       <div className="w-full flex justify-between items-center mt-6 text-sm text-gray-600">
        <span>
          {(page - 1) * limit + 1} -{" "}
          {Math.min(page * limit, dataCount )} Result Showing Out of{" "}
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
