"use client";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
function UserTable() {
  const { token } = useToken();
  const [users, setUsers] = useState<any[]>([]);
  const [dataCount, setDataCount] = useState<any>()
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const limit = 5;

  const fetchUsers = async () => {
    if (!token) {
      toast.error("No token found");
      return;
    }

    try {
      const response = await UserService.getAllUser({ token, page, limit });
      setUsers(response?.data.data || []);
      const total = response?.data.pagination.totalData || 0;
      setDataCount(total);
      setTotalPages(Math.ceil(total / limit));
    } catch (error: any) {
      toast.error(error?.message || "Failed to load users");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [page, token]);




  return (
    <div>
      <div className="flex  flex-col justify-between  md:min-h-screen  lg:min-h-[calc(100vh-100px)] lg:border border-[#E2E8F0] shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
        rounded-[12px] md:p-5  bg-white w-full">
        <div>
          <div className="flex justify-between items-center mb-4  w-[550px] md:w-auto md:pr-0 pr-3">
            <h2 className="text-2xl font-medium text-[#232323] !font-[Poppins]">
              User List
            </h2>
            <button className="text-sm text-[#4A4A4A] border px-4 py-3 rounded-md font-normal flex items-center">
              All <ChevronDown />
            </button>
          </div>

          <div className="">
            <div className=" ">
              <table className="min-w-full text-sm text-left border  border-[#E2E8F0] ">
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
                  {users.map((user, index) => (
                    <tr key={index} className="border-b-[0.5px] border-borderColor">
                      <td className="px-4 py-3 text-sm font-normal">{(page - 1) * limit + index + 1}</td>
                      <td className="px-4 py-3 text-sm font-normal">{(page - 1) * limit + index + 1}</td>
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
                      <td className="px-4 py-2">  {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}

        </div>
        <div className="w-full flex justify-between items-center mt-6 text-sm text-gray-600">
          <span>
            {(page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, dataCount)} Result Showing Out of{" "}
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
    </div>
  )
}

export default UserTable
