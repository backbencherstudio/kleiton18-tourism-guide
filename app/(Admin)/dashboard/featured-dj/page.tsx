'use client'
import React, { useState } from 'react'
import FourColTable from '../../_components/fourcoltable';
import Image from 'next/image';
import eye from '@/public/dashboard/icon/eye.svg';
import save from '@/public/dashboard/icon/save.svg';
import { useRouter } from 'next/navigation';

// Dummy data
const dummyDJs = [
  { id: '1', name: 'DJ Avicii', email: 'avicii@example.com', instagramLink: '@avicii' },
  { id: '2', name: 'DJ Calvin Harris', email: 'calvin@example.com', instagramLink: '@calvinharris' },
  { id: '3', name: 'DJ David Guetta', email: 'david@example.com', instagramLink: '@davidguetta' },
  { id: '4', name: 'DJ Tiesto', email: 'tiesto@example.com', instagramLink: '@tiesto' },
  { id: '5', name: 'DJ Martin Garrix', email: 'martin@example.com', instagramLink: '@martingarrix' },
  { id: '6', name: 'DJ Skrillex', email: 'skrillex@example.com', instagramLink: '@skrillex' },
  { id: '7', name: 'DJ Marshmello', email: 'marshmello@example.com', instagramLink: '@marshmello' },
  { id: '8', name: 'DJ Deadmau5', email: 'deadmau5@example.com', instagramLink: '@deadmau5' },
  { id: '9', name: 'DJ Zedd', email: 'zedd@example.com', instagramLink: '@zedd' },
  { id: '10', name: 'DJ Diplo', email: 'diplo@example.com', instagramLink: '@diplo' },
  { id: '11', name: 'DJ Steve Aoki', email: 'steve@example.com', instagramLink: '@steveaoki' },
  { id: '12', name: 'DJ Afrojack', email: 'afrojack@example.com', instagramLink: '@afrojack' },
  { id: '13', name: 'DJ Hardwell', email: 'hardwell@example.com', instagramLink: '@hardwell' },
  { id: '14', name: 'DJ Armin van Buuren', email: 'armin@example.com', instagramLink: '@arminvanbuuren' },
  { id: '15', name: 'DJ Kygo', email: 'kygo@example.com', instagramLink: '@kygo' },
  { id: '16', name: 'DJ Don Diablo', email: 'don@example.com', instagramLink: '@dondiablo' },
  { id: '17', name: 'DJ Alesso', email: 'alesso@example.com', instagramLink: '@alesso' },
  { id: '18', name: 'DJ R3hab', email: 'r3hab@example.com', instagramLink: '@r3hab' },
  { id: '19', name: 'DJ Above & Beyond', email: 'aboveandbeyond@example.com', instagramLink: '@aboveandbeyond' },
  { id: '20', name: 'DJ Kaskade', email: 'kaskade@example.com', instagramLink: '@kaskade' },
  { id: '21', name: 'DJ Porter Robinson', email: 'porter@example.com', instagramLink: '@porterrobinson' },
  { id: '22', name: 'DJ Alan Walker', email: 'alan@example.com', instagramLink: '@alanwalker' },
  { id: '23', name: 'DJ Dillon Francis', email: 'dillon@example.com', instagramLink: '@dillonfrancis' },
  { id: '24', name: 'DJ Nicky Romero', email: 'nicky@example.com', instagramLink: '@nickyromero' },
  { id: '25', name: 'DJ Yellow Claw', email: 'yellowclaw@example.com', instagramLink: '@yellowclaw' },
];

export default function FeaturedDj() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  
  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dummyDJs.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(dummyDJs.length / recordsPerPage);
  
  // Updated View DJ action
  const handleViewDJ = (dj: any) => {
    router.push(`/dashboard/featured-dj/details?id=${dj.id}`);
  };
  
  // Save DJ action
  const handleSaveDJ = (dj: any) => {
    console.log('Save DJ:', dj);
    // Implement save DJ functionality
  };
  
  // Create action component with eye and save buttons
  const ActionComponent = ({ item }: { item: any }) => (
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
  
  return (
    <div className="p-6 flex justify-center">
      <div className="inline-flex flex-col justify-start items-center gap-10">
        <FourColTable 
          data={currentRecords.map(dj => ({
            ...dj,
            action: <ActionComponent item={dj} />
          }))}
          title="Featured DJ"
          showViewAll={false}
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="inline-flex justify-center items-center gap-2">
            <div className="h-8 px-1 py-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
              <div 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={`justify-start ${currentPage === 1 ? 'text-[#a5a5ab]' : 'text-[#1d1f2c]'} text-base font-medium leading-relaxed tracking-tight cursor-pointer`}
              >
                Prev
              </div>
            </div>
            
            {[...Array(totalPages)].map((_, i) => {
              // Show ellipsis for many pages
              if (totalPages > 5) {
                // Always show first page
                if (i === 0) {
                  return (
                    <div 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 p-2.5 ${
                        currentPage === i + 1
                        ? 'bg-[#a601aa]'
                        : 'bg-white outline-1 outline-offset-[-1px] outline-[#f1f1f1]'
                      } rounded-lg inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer`}
                    >
                      <div className={`justify-start ${
                        currentPage === i + 1
                        ? 'text-white'
                        : 'text-[#1d1f2c]'
                      } text-base font-medium leading-relaxed tracking-tight`}>
                        {i + 1}
                      </div>
                    </div>
                  );
                }
                
                // Always show current page and adjacent pages
                if (i + 1 === currentPage || i === currentPage || i + 2 === currentPage) {
                  return (
                    <div 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 p-2.5 ${
                        currentPage === i + 1
                        ? 'bg-[#a601aa]'
                        : 'bg-white outline-1 outline-offset-[-1px] outline-[#f1f1f1]'
                      } rounded-lg inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer`}
                    >
                      <div className={`justify-start ${
                        currentPage === i + 1
                        ? 'text-white'
                        : 'text-[#1d1f2c]'
                      } text-base font-medium leading-relaxed tracking-tight`}>
                        {i + 1}
                      </div>
                    </div>
                  );
                }
                
                // Show ellipsis after first page (if needed)
                if (i === 1 && currentPage > 3) {
                  return (
                    <div key={i} className="w-8 h-8 p-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                      <div className="justify-center text-[#1d1f2c] text-base font-medium leading-relaxed tracking-tight">...</div>
                    </div>
                  );
                }
                
                // Show ellipsis before last page (if needed)
                if (i === totalPages - 2 && currentPage < totalPages - 2) {
                  return (
                    <div key={i} className="w-8 h-8 p-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                      <div className="justify-center text-[#1d1f2c] text-base font-medium leading-relaxed tracking-tight">...</div>
                    </div>
                  );
                }
                
                // Always show last page
                if (i === totalPages - 1) {
                  return (
                    <div 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 p-2.5 ${
                        currentPage === i + 1
                        ? 'bg-[#a601aa]'
                        : 'bg-white outline outline-1 outline-offset-[-1px] outline-[#f1f1f1]'
                      } rounded-lg inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer`}
                    >
                      <div className={`justify-start ${
                        currentPage === i + 1
                        ? 'text-white'
                        : 'text-[#1d1f2c]'
                      } text-base font-medium leading-relaxed tracking-tight`}>
                        {i + 1}
                      </div>
                    </div>
                  );
                }
                
                return null;
              } else {
                return (
                  <div 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 p-2.5 ${
                      currentPage === i + 1
                      ? 'bg-[#a601aa]'
                      : 'bg-white outline outline-1 outline-offset-[-1px] outline-[#f1f1f1]'
                    } rounded-lg inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer`}
                  >
                    <div className={`justify-start ${
                      currentPage === i + 1
                      ? 'text-white'
                      : 'text-[#1d1f2c]'
                    } text-base font-medium leading-relaxed tracking-tight`}>
                      {i + 1}
                    </div>
                  </div>
                );
              }
            })}
            
            <div className="h-8 px-1 py-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
              <div 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={`justify-start ${currentPage === totalPages ? 'text-[#a5a5ab]' : 'text-[#1d1f2c]'} text-base font-medium leading-relaxed tracking-tight cursor-pointer`}
              >
                Next
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
