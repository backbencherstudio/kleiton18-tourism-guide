"use client"
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'

function HotelCard({ hotel, onUnFav }: any) {
    return (
        <div>
            <div

                className="flex flex-col gap-5 border border-[#E0E0E0] p-4 rounded-[12px] bg-[#FAFAFA]"
            >
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-[220px] object-cover rounded-[8px]"
                />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    fill={
                                        i < Math.round(hotel.rating)
                                            ? "#FF991F"
                                            : "none"
                                    }
                                    stroke="#FF991F"
                                />
                            ))}
                            <p className="ms-2 text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                                {hotel.rating} Out of {hotel.numberOfReview} Review
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/images/icons/location.png" alt="" />
                            <p className="text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                                {hotel.location}
                            </p>
                        </div>
                        <h3 className="text-[24px] leading-[140%] font-medium">
                            {hotel.name}
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {hotel?.spa && (
                            <div className="flex items-center gap-2">
                                <img src="/images/icons/spa.png" alt="" />
                                <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                                    Spa
                                </p>
                            </div>
                        )}
                        {hotel?.pool && (
                            <div className="flex items-center gap-2">
                                <img src="/images/icons/wifi.png" alt="" />
                                <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                                    Pool
                                </p>
                            </div>
                        )}
                        {hotel?.freeWifi && (
                            <div className="flex items-center gap-2">
                                <img src="/images/icons/wifi.png" alt="" />
                                <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                                    Free Wifi
                                </p>
                            </div>
                        )}
                        {hotel?.restaurant && (
                            <div className="flex items-center gap-2">
                                <img src="/images/icons/restaurant.png" alt="" />
                                <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                                    Restaurant
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex justify-between">
                        <Link
                            href={hotel?.bookingLink}
                            className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                        >
                            Book Now
                            <ArrowRight size={18} />
                        </Link>
                        <button
                            onClick={() => onUnFav(hotel?.id, "HOTEL")}
                            className={"w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"}
                        >
                            <FaHeart className=" text-yellow-400" />

                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard
