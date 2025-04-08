import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';

const Navbar = () => {
  return (
    <div className="absolute z-50 top-0 left-0 right-0 bg-[#FFFFFF1A] backdrop-blur-xs p-4">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between">
        <Link href={'/'} className='text-[40px] font-medium leading-[140%] text-white'>
          <h1>Logo</h1>
        </Link>
        <div className="flex items-center gap-4 lg:hidden">
          <Link href={'/'} className='rounded-full'>
            <Image height={44} width={44} src={'/images/up.png'} alt='user photo' />
          </Link>
          <Sheet>
            <SheetTrigger>
              <Menu className='text-white' />
            </SheetTrigger>
            <SheetContent className='bg-white p-6 w-[280px]'>
              <div className='flex flex-col gap-6'>
                <Link href={'/'} className='text-[#111] text-lg'>Home</Link>
                <Link href={'/hotel'} className='text-[#111] text-lg'>Hotel</Link>
                <Link href={'/restaurant'} className='text-[#111] text-lg'>Restaurant</Link>
                <Link href={'/favorites'} className='text-[#111] text-lg'>Favorites</Link>
                <Link href={'/'} className='px-[23px] py-[9px] border border-[#EDEDED] rounded-[8px] text-[#111] text-[16px] font-medium leading-[130%]'>Emergency Contacts</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex items-center justify-center gap-8">
          <Link href={'/'} className='text-white'>Home</Link>
          <Link href={'/hotel'} className='text-white'>Hotel</Link>
          <Link href={'/restaurant'} className='text-white'>Restaurant</Link>
          <Link href={'/favorites'} className='text-white'>Favorites</Link>
        </div>
        <div className="hidden lg:flex items-center justify-center gap-8">
          <Link href={'/'} className='px-[23px] py-[9px] border border-[#EDEDED] rounded-[8px] text-white text-[16px] font-medium leading-[130%]'>Emergency Contacts</Link>
          <Link href={'/'} className='rounded-full'>
            <Image height={44} width={44} src={'/images/up.png'} alt='user photo' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
