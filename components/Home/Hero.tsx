import Image from 'next/image';
import React from 'react';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search } from 'lucide-react';


const Hero = () => {
    return (
        <div>
            <div className="bg-[url('/images/Hero.png')] bg-cover bg-center bg-no-repeat">
                <div className="max-w-[1352] px-4 py-[136px] mx-auto h-screen flex items-center lg:items-stretch">
                    <div className="flex flex-col items-stretch gap-12 lg:gap-0 lg:justify-between w-full">
                        <div>
                            <h1 className='text-[48px] sm:text-[56px] lg:text-[80px] xl:text-[120px] leading-[120%] text-white font-medium tracking-[0.6px] uppercase'>Explore</h1>
                            <div className="flex items-center justify-start gap-8">
                                <div className="hidden sm:block"><Image height={100} width={220} src={'/images/hp.png'} alt='hero photo' /></div>
                                <h1 className='text-[48px] sm:text-[56px] lg:text-[80px] xl:text-[120px] leading-[120%] text-white font-medium tracking-[0.6px] uppercase'>         Albania</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-center justify-center gap-3 p-3 rounded-[12px] border border-[#737373] bg-[#FFFFFF1A] backdrop-blur-xs">
                                <div className="relative w-full sm:w-[500px] border border-[#737373] rounded-[8px] bg-white">
                                    <Input
                                        placeholder="Search"
                                        className="pl-8 pr-[130px] h-[60px] text-[#111111] placeholder:text-[#737373] text-[16px] leading-[130%] border-none focus:border-none focus:ring-0 focus:outline-none shadow-none focus-visible:ring-0"
                                    />
                                    <div className="absolute right-0 px-8 top-1/2 -translate-y-1/2 z-50">
                                        <Select>
                                            <SelectTrigger className="w-[66px] border-none p-0 m-0">
                                                <SelectValue placeholder="Hotel" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="hotel">Hotel</SelectItem>
                                                <SelectItem value="restaurant">Hotel</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[1px] bg-[#B0B0B0]"></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center h-[60px] w-[60px] bg-[#F81E1E] rounded-[8px]">
                                    <Search size={16} color='white' />
                                </div>
                            </div>
                            <p className="w-full lg:max-w-[434px] text-[16px] text-white leading-[160%] tracking-[0.5px] lg:text-right">Discover the breathtaking landscapes, rich history, and vibrant culture of Albania. our Virtual & Technologically Enabled Travel Guide ensures a</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;