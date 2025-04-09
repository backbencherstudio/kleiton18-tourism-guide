import { dashbordSummaryCards } from '@/demoApi/dashbordTotalList'
import Image from 'next/image'

function DashbordHeader() {
  return (
    <div>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {dashbordSummaryCards.map((item, index) => (
        <div
          key={index}
         className="flex flex-col items-start p-5 gap-3  rounded-[16px] bg-white shadow-[0px_-0.3px_20px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-center justify-between w-full">
            <div>
              <h4 className="text-xl !font-[Poppins] font-semibold text-[#4A4A4A]">{item.title}</h4>
              
            </div>
            <div className="p-3 flex-shrink-0 rounded-[8px] bg-white shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)] flex items-center justify-center">
              <Image src={item.icon} alt={item.title} width={28} height={28} className=' w-full h-full' />
            </div>
          </div>
          <div className=' flex justify-between items-center w-full'>
            <p className="text-base text-[#4A4A4A]">{item.subtitle}</p>
            <p className=' text-[#1D1F2C] text-2xl font-medium'> ({item.value})</p>
          </div>
          
        </div>
      ))}
    </div>
    </div>
  )
}

export default DashbordHeader
