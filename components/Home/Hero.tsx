import Image from 'next/image';
import HomeSearch from './HomeSearch';


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
                        <div  className="flex  flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <HomeSearch/>
                            <p className="w-full lg:max-w-[434px] text-[16px] text-white leading-[160%] tracking-[0.5px] lg:text-right">Discover the breathtaking landscapes, rich history, and vibrant culture of Albania. our Virtual & Technologically Enabled Travel Guide ensures a</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;