"use client"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'

function AreaCard({ area ,onUnFav}: any) {
    return (
        <div>
            <div

                className={`group relative transition-all duration-300 ease-in-out bg-cover bg-center bg-no-repeat h-[400px] flex flex-col justify-end p-4`}
                style={{ backgroundImage: `url(${area.image})` }}
            >
                <div className="absolute inset-0 bg-black/50 z-0" />

                <div className="relative z-10 w-full flex flex-col gap-3">
                    <div
                        className={`flex items-center gap-2 transform transition-all duration-300 ease-in-out `}
                    >
                        <img
                            src="/images/icons/locationwhite.png"
                            alt="Location"
                        />
                        <p className="text-white text-[14px] font-normal leading-[150%]">
                            {area.location}
                        </p>
                    </div>

                    <h3
                        className={`text-white text-[24px] font-medium leading-[140%] transform transition-all duration-300 ease-in-out`}
                    >
                        {area.name}
                    </h3>

                    <p
                        className={`text-white text-[14px] leading-[160%] tracking-[0.5px] transform transition-all duration-300 ease-in-out`}
                    >
                        {area.details}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                        <Link
                            href={area.detailsLink}
                            className="flex items-center gap-2 text-[16px] font-normal leading-[130%] text-white"
                        >
                            View Details <ArrowRight size={18} />
                        </Link>
                     
                            <button
                              onClick={() => onUnFav(area?.id, "VISIT_AREA")}
                              className={"w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-[8px] bg-white shadow p-[7px]"}
                            >
                             <FaHeart className=" text-yellow-400"/>

                            </button> 
                           
                     
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AreaCard
