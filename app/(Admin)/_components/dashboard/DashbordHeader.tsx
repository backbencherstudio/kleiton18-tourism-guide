"use client"
import { useDataFetch } from '@/hooks/useDataFetch';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

function DashbordHeader() {
const { count: userCount, } = useDataFetch({
  url: "/users/all",
  page: 1,
  limit: 10,
});
const { count: hotelCount } = useDataFetch({
  url: "/hotel/get",
  page: 1,
  limit: 10,
});
const { count: dishCount } = useDataFetch({
  url: "/traditional-dish/get",
  page: 1,
  limit: 10,
});
const { count: restaurantCount } = useDataFetch({
  url: "/restaurant/get",
  page: 1,
  limit: 10,
});
const { count: areaCount } = useDataFetch({
  url: "/visit-area/get",
  page: 1,
  limit: 10,
});

  const dashbordSummaryCards = [
  {
    icon: '/images/dashboard/user.png',
    title: 'User',
    subtitle: 'Total User',
    href: '/dashboard/user',
    value: userCount,
  },
  {
    icon: '/images/dashboard/hotel.png',
    title: 'Hotel',
    href: '/dashboard/hotel',
    subtitle: 'Listed Hotel',
    value: hotelCount,
  },
  {
    icon: '/images/dashboard/restaurant.png',
    title: 'Restaurant',
    subtitle: 'Restaurant',
    value: restaurantCount,
    href: '/dashboard/restaurant'
  },
  {
    icon: '/images/dashboard/dish.png',
    title: 'Dish',
    subtitle: 'Total Dish',
    value:dishCount,
    href: '/dashboard/dish'
  },
  {
    icon: '/images/dashboard/location.png',
    title: 'Area',
    subtitle: 'Total Area',
    value: areaCount,
    href: '/dashboard/visited'
  },
];
  return (
    <div>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {dashbordSummaryCards.map((item, index) => (
        <Link href={item?.href}
          key={index}
         className="flex flex-col items-start p-2 lg:p-5 gap-3  rounded-[16px] bg-white shadow-[0px_-0.3px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center justify-between w-full">
            <div>
              <h4 className="lg:text-xl text-base  !font-[Poppins] font-semibold text-[#4A4A4A]">{item.title}</h4>
              
            </div>
            <div className="p-3 flex-shrink-0 rounded-[8px] bg-white shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)] flex items-center justify-center">
              <Image src={item.icon} alt={item.title} width={28} height={28} className=' w-4 h-4 lg:w-[30px] lg:h-[30px]' />
            </div>
          </div>
          <div className=' flex justify-between items-center w-full'>
            <p className="md:text-base text-xs text-[#4A4A4A]">{item.subtitle}</p>
            <p className=' text-[#1D1F2C] text-lg lg:text-2xl font-medium'> ({formatNumber(item.value) })</p>
          </div>
          
        </Link>
      ))}
    </div>
    </div>
  )
}

export default DashbordHeader
