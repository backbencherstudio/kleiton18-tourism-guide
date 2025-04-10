"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const RecentUserTable = () => {
  const [page, setPage] = useState<number>(0);

  const users = Array.from({ length: 50 }, (_, i) => ({
    sl: i + 1,
    id: 41256,
    name: "Adam Smith",
    email: "demo@gmail.com",
    image: "/images/up.png",
    joinDate: "03/02/2025",
  }));

  const parPage = 8;
  const skipuser = page * parPage;
  const countpage = Math.ceil(users.length / parPage);
  const perPageUser = users.slice(skipuser, skipuser + parPage);

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < countpage - 1) setPage((prev) => prev + 1);
  };

  return (
    <div className=" flex flex-col justify-between h-full mt-4 lg:mt-0">
        <div>
<div className="flex justify-between items-center mb-4 w-[550px] md:w-auto md:pr-0 pr-3">
        <h2 className="text-2xl font-medium text-[#232323] !font-[Poppins]">
          Recent User List
        </h2>
        <button className="text-sm text-[#4A4A4A] border px-4 py-3 rounded-md font-normal flex items-center">
          All <ChevronDown />
        </button>
      </div>

      <div className="">
        <div className=" ">
          <table className="min-w-full text-sm text-left">
            <thead className="sticky top-0 bg-[#FAFAFA] text-[#4A4A4A] font-normal text-xs ">
              <tr className="!rounded-[16px]">
                <th className="px-4 py-3 font-normal text-xs">Sl</th>
                <th className="px-4 py-3 font-normal text-xs">User ID</th>
                <th className="px-4 py-3 font-normal text-xs">User Name</th>
                <th className="px-4 py-3 font-normal text-xs">Image</th>
                <th className="px-4 py-3 font-normal text-xs">Email</th>
                <th className="px-4 py-3 font-normal text-xs">Join Date</th>
              </tr>
            </thead>
            <tbody className=" text-[#111]">
              {perPageUser.map((user, index) => (
                <tr key={index} className="border-b-[0.5px] border-borderColor">
                  <td className="px-4 py-3 text-sm font-normal">{user.sl}</td>
                  <td className="px-4 py-3 text-sm font-normal">{user.id}</td>
                  <td className="px-4 py-3 text-sm font-normal">{user.name}</td>
                  <td className="px-4 py-3 text-sm font-normal">
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </div>
      

      {/* Footer */}
      <div className="flex justify-between gap-2 items-center mt-6 text-sm text-gray-600 w-[550px] md:w-auto md:pr-0 pr-3 mb-6 lg:mb-0">
        <span>
          {skipuser + 1} - {Math.min(skipuser + parPage, users.length)} Result Showing Out of{" "}
          {users.length} 
        </span>

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
              page === countpage - 1 ? "opacity-50  bg-gray-300 cursor-not-allowed" : ""
            }`}
            disabled={page === countpage - 1}
          >
            &#x276F;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentUserTable;
