'use client';

import AddHotelForm from '@/app/(Admin)/_components/form/AddHotelForm';
import { ChevronRight, MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Page() {
  const pathname = usePathname();
  const sPath = pathname.split('/').filter(Boolean); // remove empty strings

  return (
    <div className="flex flex-col gap-6 max-h-[calc(100vh-100px)] border border-[#E2E8F0] shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)] rounded-[12px] p-5 bg-white w-full">
      <div>
        <div className="flex gap-4 items-center">
          {/* Back Button */}
          <Link href="/dashboard/hotel" className="rounded-full border border-borderColor p-2 text-[#737373]">
            <MoveLeft />
          </Link>

          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            {sPath.map((path, index) => {
              const fullPath = '/' + sPath.slice(0, index + 1).join('/');
              const isLast = index === sPath.length - 1;

              return (
                <div key={index} className="flex items-center gap-1">
                  {!isLast ? (
                    <>
                      <Link href={fullPath} className=" capitalize">{path}</Link>
                      <ChevronRight  className="w-4 h-4 text-[#737373]" />
                    </>
                  ) : (
                    <span className="capitalize text-[#737373] font-medium">{path}</span>
                  )}
                </div>
              );
            })}
           
          </div>
        </div>
         <div>
                <h4 className=' text-2xl font-medium text-[#232323] !font-[Poppins] mt-4'>Add Hotel</h4>
            </div>
      </div>

      {/* Hotel Form */}
      <AddHotelForm />
    </div>
  );
}

export default Page;
