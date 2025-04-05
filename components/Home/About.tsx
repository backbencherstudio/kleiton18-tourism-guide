import React from 'react';

const About = () => {
    return (
        <div className='max-w-[1352px] px-4 py-10 md:py-20 mx-auto'>
            <div className="flex items-start justify-between gap-6">
                <div className="w-full lg:w-[66%] flex flex-col gap-6">
                    <div className="flex items-start justify-between gap-6">
                        <div className="w-full lg:w-[52%]">
                            <img className='w-full h-full object-cover' src="/images/hs.png" alt="Hill place" />
                        </div>
                        <div className="w-full lg:w-[48%] flex flex-col items-center justify-start">
                            <h2 className='text-[48px] font-medium leading-[130%] text-[#111111]'>We are always ready to discover our Albania</h2>
                            <p className="text-[16px] leading-[160%] tracking-[0.5px] font-normal text-[#4A4A4A]">Nestled along the breathtaking Albanian Riviera, Elysian Pearl Resort is a sanctuary of elegance and tranquility. Overlooking crystal-clear turquoise waters and surrounded by lush Mediterranean landscapes,</p>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#FEE9E9]"></div>
                    <div className="flex items-center justify-between pr-16">
                        <div className="flex flex-col items-start gap-2">
                            <div className="countNumber text-[48px] font-bold leading-[120%] text-[#121212]">2000+</div>
                            <p className="text-[16px] font-normal leading-[160%] text-[#4A4A4A] tracking-[0.5px]">Tourist have visited</p>
                        </div>
                        <div className="w-[1px] h-[80px] bg-[#FEE9E9]"></div>
                        <div className="flex flex-col items-start gap-2">
                            <div className="countNumber text-[48px] font-bold leading-[120%] text-[#121212]">576+</div>
                            <p className="text-[16px] font-normal leading-[160%] text-[#4A4A4A] tracking-[0.5px]">Tourist have visited</p>
                        </div>
                        <div className="w-[1px] h-[80px] bg-[#FEE9E9]"></div>
                        <div className="flex flex-col items-start gap-2">
                            <div className="countNumber text-[48px] font-bold leading-[120%] text-[#121212]">654+</div>
                            <p className="text-[16px] font-normal leading-[160%] text-[#4A4A4A] tracking-[0.5px]">Tourist have visited</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-[32%]">
                    <img className='w-full h-full object-cover' src="/images/hill.png" alt="Hill place" />
                </div>
            </div>
        </div>
    );
};

export default About;