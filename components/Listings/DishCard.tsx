"use client"
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'
function DishCard({ dish, onUnFav }: any) {
    return (
        <div>
            <div

                className="flex flex-col gap-5 rounded-[12px] bg-[#FAFAFA]"
            >
                <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full min-h-[440px] object-cover rounded-[8px]"
                />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    fill={
                                        i < Math.round(dish.rating) ? "#FF991F" : "none"
                                    }
                                    stroke="#FF991F"
                                />
                            ))}
                            <p className="ms-2 text-[#4A4A4A] text-[14px] font-normal leading-[150%]">
                                {dish.rating} Out of {dish.numberOfReview} Review
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <h3 className="text-[32px] leading-[140%] font-medium">
                                {dish.name}
                            </h3>
                            <p className="text-[32px] leading-[140%] font-medium countNumber">
                                {dish.price}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Link
                            href={dish.bookingLink}
                            className="flex items-center gap-2 text-[#111111] text-[18px] font-normal leading-[130%]"
                        >
                            Book Now
                            <ArrowRight size={18} />
                        </Link>
                        <button
                            onClick={() => onUnFav(dish?.id, "DISH")}
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

export default DishCard
