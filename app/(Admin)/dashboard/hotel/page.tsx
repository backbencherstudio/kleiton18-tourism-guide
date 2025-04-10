import HotelListTable from '../../_components/hotel/HotelTable'

function HotelPage() {
  return (
    <div className='flex  flex-col justify-between  md:min-h-screen  lg:min-h-[calc(100vh-100px)] lg:border border-[#E2E8F0] shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
        rounded-[12px] md:p-5  bg-white w-full'>
      <HotelListTable/>
    </div>
  )
}

export default HotelPage
