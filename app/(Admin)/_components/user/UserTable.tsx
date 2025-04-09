"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
function UserTable() {
     const [page, setPage] = useState<number>(0);
    
      const users = Array.from({ length: 50 }, (_, i) => ({
        sl: i + 1,
        id: 41256,
        name: "Adam Smith",
        email: "demo@gmail.com",
        image: "/images/up.png",
        joinDate: "03/02/2025",
      }));
    
      const parPage = 10;
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
    <div>
        <div className="flex flex-col justify-between  min-h-[calc(100vh-100px)] border border-[#E2E8F0] shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
        rounded-[12px] p-5  bg-white w-full">
       <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-medium text-[#232323] !font-[Poppins]">
           User List
        </h2>
        <button className="text-sm text-[#4A4A4A] border px-4 py-3 rounded-md font-normal flex items-center">
          All <ChevronDown />
        </button>
      </div>

      <div className="">
        <div className="max-h-[480px] ">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#FAFAFA] text-[#4A4A4A] font-normal text-xs !rounded-[16px]">
              <tr className="">
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

      {/* Footer */}
      
    </div>
    <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
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
    </div>
  )
}

export default UserTable
