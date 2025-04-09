import DashbordHeader from "../_components/dashboard/DashbordHeader";
import RecentUserTable from "../_components/dashboard/RecentUsers";


export default function Page() {

  
  return (
    <>
    <div className="flex flex-col gap-6  min-h-[calc(100vh-100px)] border border-[#E2E8F0] shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
        rounded-[12px] p-5  bg-white w-full">

    <DashbordHeader/>
    <div>
      <RecentUserTable/>
    </div>
    </div>
    </>
  )
}