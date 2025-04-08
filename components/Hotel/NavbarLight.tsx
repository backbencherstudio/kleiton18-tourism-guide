import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NavbarLight = () => {
    return (
        <div className='absolute top-0 left-0 right-0 bg-[#FFFFFF1A] backdrop-blur-xs p-4'>
            <div className="max-w-[1320px] mx-auto flex items-center justify-between">
                <Link href={'/'} className='text-[40px] font-medium leading-[140%] text-[#111111]'><h1>Logo</h1></Link>
                <div className="flex items-center justify-center gap-8">
                    <Link href={'/'} className='text-[#111111]'>Home</Link>
                    <Link href={'/'} className='text-[#111111]'>Hotel</Link>
                    <Link href={'/'} className='text-[#111111]'>Restaurant</Link>
                    <Link href={'/'} className='text-[#111111]'>Favorites</Link>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <Link href={'/'} className='px-[23px] py-[9px] border border-[#EDEDED] rounded-[8px] text-[#111111] text-[16px] font-medium leading-[130%]'>Emergency Contacts</Link>
                    <Link href={'/'} className='rounded-full'><Image height={44} width={44} src={'/images/up.png'} alt='user photo' /></Link>
                </div>
            </div>
        </div>
    );
};

export default NavbarLight;