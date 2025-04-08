'use client'
import React from 'react'
import Image from 'next/image'
import fans from '@/public/dashboard/icon/fans.svg'
import dj from '@/public/dashboard/icon/totaldj.svg'
import featured from '@/public/dashboard/icon/totalfeatured.svg'
import ThreeColTable from '../_components/threecoltable'
import FourColTable from '../_components/fourcoltable'
import { useRouter } from 'next/navigation'
import eye from '@/public/dashboard/icon/eye.svg'
import save from '@/public/dashboard/icon/save.svg'

export default function Page() {
  const router = useRouter();

  // Handle view user action
  const handleViewUser = (user: any) => {
    router.push(`/dashboard/user-management/details/${user.id}`);
  };

  // Create action component with only eye button for users
  const UserActionComponent = ({ item }: { item: any }) => (
    <div className="flex justify-center">
      <button 
        onClick={() => handleViewUser(item)}
        className="w-6 h-6 p-[3.60px] bg-[#d2d2d5] rounded-[4.80px] flex justify-center items-center hover:bg-[#c2c2c5] transition-colors"
      >
        <Image src={eye} alt="View" width={16} height={16} />
      </button>
    </div>
  );

  // Sample user data for the editable table
  const userData = [
    { id: '1', name: 'Ronald Richards', email: 'jackson.graham@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jacob Jones', email: 'felicia.reid@example.com', role: 'User', status: 'Active' },
    { id: '3', name: 'Kathryn Murphy', email: 'tanya.hill@example.com', role: 'Moderator', status: 'Inactive' },
    { id: '4', name: 'Arlene McCoy', email: 'willie.jennings@example.com', role: 'User', status: 'Active' },
    { id: '5', name: 'Jenny Wilson', email: 'nevaeh.simmons@example.com', role: 'User', status: 'Active' },
    { id: '6', name: 'Brooklyn Simmons', email: 'dolores.chambers@example.com', role: 'Moderator', status: 'Active' }
  ].map(user => ({
    ...user,
    action: <UserActionComponent item={user} />
  }));

  // Handle view DJ action
  const handleViewDJ = (dj: any) => {
    router.push(`/dashboard/dj-management/details?id=${dj.id}`);
  };

  // Handle save DJ action
  const handleSaveDJ = (dj: any) => {
    console.log('Save DJ:', dj);
    // Implement save DJ functionality
  };

  // Create DJ action component with both eye and save buttons
  const DJActionComponent = ({ item }: { item: any }) => (
    <div className="flex justify-start items-center gap-4">
      <button 
        onClick={() => handleViewDJ(item)}
        className="w-6 h-6 p-[3.60px] bg-[#d2d2d5] rounded-[4.80px] flex justify-center items-center hover:bg-[#c2c2c5] transition-colors"
      >
        <Image src={eye} alt="View" width={16} height={16} />
      </button>
      <button 
        onClick={() => handleSaveDJ(item)}
        className="w-6 h-6 p-[3.60px] bg-[#d2d2d5] rounded-[4.80px] flex justify-center items-center hover:bg-[#c2c2c5] transition-colors"
      >
        <Image src={save} alt="Save" width={16} height={16} />
      </button>
    </div>
  );

  // Sample DJ data for the four column table
  const djData = [
    { id: '1', name: 'Ronald Richards', email: 'jackson.graham@example.com', instagramLink: '@ronald_dj' },
    { id: '2', name: 'Jacob Jones', email: 'felicia.reid@example.com', instagramLink: '@jacob_beats' },
    { id: '3', name: 'Kathryn Murphy', email: 'tanya.hill@example.com', instagramLink: '@kathy_music' },
    { id: '4', name: 'Arlene McCoy', email: 'willie.jennings@example.com', instagramLink: '@arlene_mix' },
    { id: '5', name: 'Jenny Wilson', email: 'nevaeh.simmons@example.com', instagramLink: '@jenny_tracks' },
    { id: '6', name: 'Brooklyn Simmons', email: 'dolores.chambers@example.com', instagramLink: '@brooklyn_dj' }
  ].map(dj => ({
    ...dj,
    action: <DJActionComponent item={dj} />
  }));

  return (
    <>
      <div className="p-6 flex justify-center">
        <div className="inline-flex justify-start items-center gap-8">
          <div className="w-[300px] h-[168px] p-6 relative bg-[#dfe1e6] rounded-xl inline-flex flex-col justify-start items-start gap-2.5">
            <div className="w-[236px] flex flex-col justify-start items-center gap-10">
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="justify-start text-[#07080b] text-xl font-normal leading-relaxed tracking-tight">Total Fans</div>
              </div>
              <div className="self-stretch justify-center text-[#07080b] text-5xl font-semibold uppercase leading-[48px]">1234</div>
            </div>
            <div className="w-[60px] h-[60px] p-[18px] left-[228px] top-[12px] absolute bg-white rounded-3xl inline-flex justify-center items-center gap-2.5">
              <Image src={fans} alt="Fans Icon" width={24} height={24} />
            </div>
          </div>
          <div className="w-[300px] h-[168px] p-6 relative bg-[#fee3ff] rounded-xl inline-flex flex-col justify-start items-start gap-2.5">
            <div className="w-[236px] flex flex-col justify-start items-center gap-10">
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="justify-start text-[#07080b] text-xl font-normal leading-relaxed tracking-tight">Total DJ</div>
              </div>
              <div className="self-stretch justify-center text-[#07080b] text-5xl font-semibold uppercase leading-[48px]">1234</div>
            </div>
            <div className="w-[60px] h-[60px] p-[18px] left-[228px] top-[12px] absolute bg-white rounded-3xl inline-flex justify-center items-center gap-2.5">
              <Image src={dj} alt="DJ Icon" width={24} height={24} />
            </div>
          </div>
          <div className="w-[300px] p-6 relative bg-[#fef4cf] rounded-xl inline-flex flex-col justify-start items-start gap-2.5">
            <div className="w-[236px] flex flex-col justify-start items-center gap-10">
              <div className="self-stretch inline-flex justify-start items-center gap-[5px]">
                <div className="justify-start text-[#07080b] text-xl font-normal leading-relaxed tracking-tight">Total Featured</div>
                <div className="w-8 h-8 relative" />
              </div>
              <div className="self-stretch justify-center text-[#07080b] text-5xl font-semibold uppercase leading-[48px]">6</div>
            </div>
            <div className="w-[60px] h-[60px] p-[18px] left-[228px] top-[12px] absolute bg-white rounded-3xl inline-flex justify-center items-center gap-2.5">
              <Image src={featured} alt="Featured Icon" width={24} height={24} />
            </div>
          </div>
        </div>
      </div>

      {/* User Management Section with Editable Table */}
      <div className="p-6 flex justify-center">
        <ThreeColTable 
          data={userData} 
          title="User Management"
          showViewAll={true}
          viewAllLink="/admin/users"
        />
      </div>

      {/* Four Column Table Section */}
      <div className="p-6 flex justify-center">
        <FourColTable 
          data={djData}
          title="DJ Management" 
          showViewAll={true}
          viewAllLink="/admin/djs"
        />
      </div>
    </>
  )
}