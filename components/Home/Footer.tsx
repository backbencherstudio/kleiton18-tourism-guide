import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#111111] px-4 pt-10 md:pt-20">
      <div className="max-w-[1320px]  mx-auto">
        <div className="flex items-start justify-between gap-6 flex-wrap pb-10 md:pb-[66px]">
          <div className="flex flex-col gap-5">
            <Link
              href={"/"}
              className="text-[40px] font-medium leading-[140%] text-white"
            >
              <h1>Logo</h1>
            </Link>
            <p className="max-w-[419px] text-white text-[16px] font-normal leading-[160%] tracking-[0.5px]">
              Discover the breathtaking landscapes, rich history, and vibrant
              culture of Albania. our Virtual & Technologically Enabled Travel
              Guide ensures a seamless and unforgettable journey.
            </p>
            {/* <div className="flex items-center gap-3 mt-3">
              <Link href={"/"}>
                <img src="/images/icons/Facebook.png" alt="" />
              </Link>
              <Link href={"/"}>
                <img src="/images/icons/Instagram.png" alt="" />
              </Link>
              <Link href={"/"}>
                <img src="/images/icons/X.png" alt="" />
              </Link>
              <Link href={"/"}>
                <img src="/images/icons/Linkedin.png" alt="" />
              </Link>
            </div> */}
          </div>
          <div className="flex flex-col items-start gap-5">
            <h4 className="text-white text-[20px] font-medium leading-[150%]">
              Quick links
            </h4>
            <div className="flex flex-col items-start gap-4">
              <Link
                href={"/"}
                className="text-white text-[16px] font-normal leading-[160%] tracking-[0.5px]"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="text-white text-[16px] font-normal leading-[160%] tracking-[0.5px]"
              >
                Hotel
              </Link>
              <Link
                href={"/"}
                className="text-white text-[16px] font-normal leading-[160%] tracking-[0.5px]"
              >
                Restaurant
              </Link>
              <Link
                href={"/"}
                className="text-white text-[16px] font-normal leading-[160%] tracking-[0.5px]"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5">
            <h4 className="text-white text-[20px] font-medium leading-[150%]">
              Contact Information
            </h4>
            <div className="flex flex-col items-start gap-4">
              <Link
                href={"/"}
                className="flex items-center justify-start gap-4 text-[#D2D2D5] text-[16px] font-normal leading-[160%] tracking-[0.5px]"
              >
                <MapPin color="#A5A5AB" size={24} /> Albania
              </Link>
              <Link
                href={"/"}
                className="flex items-center justify-start gap-4 text-[#D2D2D5] text-[16px] font-normal leading-[160%] tracking-[0.5px]"
              >
                <Phone color="#A5A5AB" size={24} /> 247643-545456
              </Link>
              <Link
                href={"/"}
                className="flex items-center justify-start gap-4 text-[#D2D2D5] text-[16px] font-normal leading-[160%] tracking-[0.5px]"
              >
                <Mail color="#A5A5AB" size={24} /> demo.@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-5">
            <h4 className="text-white text-[20px] font-medium leading-[150%]">
              Emergency Contact
            </h4>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-4 text-[#D2D2D5] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                <p className="flex items-center justify-between min-w-[170px]">
                  Ambulance <span>-</span>
                </p>
                <Link href={"/"}>127</Link>
              </div>
              <div className="flex items-center gap-4 text-[#D2D2D5] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                <p className="flex items-center justify-between min-w-[170px]">
                  Police <span>-</span>
                </p>
                <Link href={"/"}>129</Link>
              </div>
              <div className="flex items-center gap-4 text-[#D2D2D5] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                <p className="flex items-center justify-between min-w-[170px]">
                  Fire brigade <span>-</span>
                </p>
                <Link href={"/"}>128</Link>
              </div>
              <div className="flex items-center gap-4 text-[#D2D2D5] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                <p className="flex items-center justify-between min-w-[170px]">
                  Emergency at sea <span>-</span>
                </p>
                <Link href={"/"}>125</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-5 border-t border-t-[#FFFFFF1A]">
          <p className="text-[#A5A5AB] text-[16px] font-normal leading-[160%] tracking-[0.5px]">Copyright 2024 Company name. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
