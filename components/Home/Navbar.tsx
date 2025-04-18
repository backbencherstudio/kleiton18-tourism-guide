"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CookieHelper } from "@/helper/cookie.helper";
import { useToken } from "@/hooks/useToken";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { token } = useToken();
  const [isShow, seIsShow] = useState<boolean>(false)
  const router = useRouter()
  const handleLogout = () => {
    CookieHelper.destroy({ key: "token" }); // ✅ Correct usage
    router.push("/"); // Optional redirect
  };
  return (
    <div className="absolute z-50 top-0 left-0 right-0 bg-[#FFFFFF1A] backdrop-blur-xs p-4">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between">
        <Link
          href={"/"}
          className="text-[40px] font-medium leading-[140%] text-white"
        >
          <h1>Logo</h1>
        </Link>
        <div className="flex items-center gap-4 lg:hidden">
           {token ? (
            <div className=" relative">
              {
                isShow &&
                <div className=" absolute top-12 left-[-30px] text-center bg-primaryColor py-3 shadow-2xl rounded-xl  w-[120px]">
                  <button onClick={handleLogout} className=" text-white text-base cursor-pointer font-medium">Log out</button>
                </div>
              }
              <button className="rounded-full cursor-pointer" onClick={() => seIsShow(!isShow)}>
                <Image
                  height={44}
                  width={44}
                  src={"/images/up.png"}
                  alt="user photo"
                />
              </button>

            </div>
          ) : (
            <Link
              href={"/login"}
              className="px-[23px] bg-primaryColor py-[10px]  rounded-[8px] text-white text-[16px] font-medium leading-[130%]"
            >
              Login
            </Link>
          )}
          <Sheet>
            <SheetTrigger>
              <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent className="bg-white p-6 w-[280px]">
              <div className="flex flex-col gap-6">
                <Link href={"/"} className="text-[#111] text-lg">
                  Home
                </Link>
                <Link href={"/hotel"} className="text-[#111] text-lg">
                  Hotel
                </Link>
                <Link href={"/restaurant"} className="text-[#111] text-lg">
                  Restaurant
                </Link>
                <Link href={"/favorites"} className="text-[#111] text-lg">
                  Favorites
                </Link>
                <Link
                  href={"/"}
                  className="px-[23px] py-[9px] border border-[#EDEDED] rounded-[8px] text-[#111] text-[16px] font-medium leading-[130%]"
                >
                  Emergency Contacts
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex items-center justify-center gap-8">
          <Link href={"/"} className="text-white">
            Home
          </Link>
          <Link href={"/hotel"} className="text-white">
            Hotel
          </Link>
          <Link href={"/restaurant"} className="text-white">
            Restaurant
          </Link>
          <Link href={"/favorites"} className="text-white">
            Favorites
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-center gap-8">
          <Link
            href={"/"}
            className="px-[23px] py-[9px] border border-[#EDEDED] rounded-[8px] text-white text-[16px] font-medium leading-[130%]"
          >
            Emergency Contacts
          </Link>
          {token ? (
            <div className=" relative">
              {
                isShow &&
                <div className=" absolute top-12 left-[-30px] text-center bg-primaryColor py-3 shadow-2xl rounded-xl  w-[120px]">
                  <button onClick={handleLogout} className=" text-white text-base cursor-pointer font-medium">Log out</button>
                </div>
              }
              <button className="rounded-full cursor-pointer" onClick={() => seIsShow(!isShow)}>
                <Image
                  height={44}
                  width={44}
                  src={"/images/up.png"}
                  alt="user photo"
                />
              </button>

            </div>
          ) : (
            <Link
              href={"/login"}
              className="px-[23px] bg-primaryColor py-[10px]  rounded-[8px] text-white text-[16px] font-medium leading-[130%]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
