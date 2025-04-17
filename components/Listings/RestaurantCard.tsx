"use client"
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'

function RestaurantCard({ restaurant, onUnFav }: any) {
    return (
        <div>
            <div

                className="flex flex-col gap-4 border border-[#E0E0E0] p-4 rounded-[12px] bg-[#FAFAFA]"
            >
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-[220px] object-cover rounded-[8px]"
                />
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                fill={
                                    i < Math.round(restaurant.rating)
                                        ? "#facc15"
                                        : "none"
                                }
                                stroke="#facc15"
                                className="w-4 h-4"
                            />
                        ))}
                        <p className="text-sm text-gray-700">
                            {restaurant.rating} out of {restaurant.numberOfReview}{" "}
                            reviews
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/images/icons/location.png" alt="" />
                        <p className="text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                            {restaurant.location}
                        </p>
                    </div>
                    <h3 className="text-[20px] font-medium">
                        {restaurant.name}
                    </h3>
                    <p className="text-[14px] text-[#4A4A4A] leading-[160%] lg:truncate">
                        {restaurant.details}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src="/images/icons/open.png" alt="open" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                                Open: {restaurant.open_time}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/images/icons/close.png" alt="close" />
                            <p className="text-[14px] text-[#4A4A4A] leading-[150%]">
                                Close: {restaurant.close_time}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Link
                            href={restaurant.bookingLink}
                            className="flex items-center gap-2 text-[#111111] text-[16px]"
                        >
                            Book Now <ArrowRight size={18} />
                        </Link>
                        <button
                            onClick={() => onUnFav(restaurant?.id, "RESTAURANT")}
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

export default RestaurantCard
