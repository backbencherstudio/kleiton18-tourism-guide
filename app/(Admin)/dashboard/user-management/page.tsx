'use client'
import React, { useState } from 'react';
import ThreeColTable from '../../_components/threecoltable';
import Image from 'next/image';
import eye from '@/public/dashboard/icon/eye.svg';
import { useRouter } from 'next/navigation';

// Dummy data
const dummyUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: '3', name: 'Michael Johnson', email: 'michael.johnson@example.com' },
  { id: '4', name: 'Emily Williams', email: 'emily.williams@example.com' },
  { id: '5', name: 'David Brown', email: 'david.brown@example.com' },
  { id: '6', name: 'Sarah Davis', email: 'sarah.davis@example.com' },
  { id: '7', name: 'Robert Wilson', email: 'robert.wilson@example.com' },
  { id: '8', name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com' },
  { id: '9', name: 'William Martinez', email: 'william.martinez@example.com' },
  { id: '10', name: 'Amanda Anderson', email: 'amanda.anderson@example.com' },
  { id: '11', name: 'Thomas Thomas', email: 'thomas.thomas@example.com' },
  { id: '12', name: 'Jessica Jackson', email: 'jessica.jackson@example.com' },
  { id: '13', name: 'Daniel White', email: 'daniel.white@example.com' },
  { id: '14', name: 'Lisa Harris', email: 'lisa.harris@example.com' },
  { id: '15', name: 'Christopher Clark', email: 'christopher.clark@example.com' },
  { id: '16', name: 'Emily Williams', email: 'emily.williams@example.com' },
  { id: '17', name: 'David Brown', email: 'david.brown@example.com' },
  { id: '18', name: 'Sarah Davis', email: 'sarah.davis@example.com' },
  { id: '19', name: 'Robert Wilson', email: 'robert.wilson@example.com' },
  { id: '20', name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com' },
  { id: '21', name: 'William Martinez', email: 'william.martinez@example.com' },
  { id: '22', name: 'Amanda Anderson', email: 'amanda.anderson@example.com' },
  { id: '23', name: 'Thomas Thomas', email: 'thomas.thomas@example.com' },
  { id: '24', name: 'Jessica Jackson', email: 'jessica.jackson@example.com' },
  { id: '25', name: 'Emily Williams', email: 'emily.williams@example.com' },
  { id: '26', name: 'David Brown', email: 'david.brown@example.com' },
  { id: '27', name: 'Sarah Davis', email: 'sarah.davis@example.com' },
  { id: '28', name: 'Robert Wilson', email: 'robert.wilson@example.com' },
  { id: '29', name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com' },
  { id: '30', name: 'William Martinez', email: 'william.martinez@example.com' },
  { id: '31', name: 'Amanda Anderson', email: 'amanda.anderson@example.com' },
  { id: '32', name: 'Thomas Thomas', email: 'thomas.thomas@example.com' },
  { id: '33', name: 'Jessica Jackson', email: 'jessica.jackson@example.com' },
  { id: '34', name: 'Emily Williams', email: 'emily.williams@example.com' },
  { id: '35', name: 'David Brown', email: 'david.brown@example.com' },
  { id: '36', name: 'Sarah Davis', email: 'sarah.davis@example.com' },
  { id: '37', name: 'Robert Wilson', email: 'robert.wilson@example.com' },
  { id: '38', name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com' },
  { id: '39', name: 'William Martinez', email: 'william.martinez@example.com' },
  { id: '40', name: 'Amanda Anderson', email: 'amanda.anderson@example.com' },
  { id: '41', name: 'Thomas Thomas', email: 'thomas.thomas@example.com' },
  { id: '42', name: 'Jessica Jackson', email: 'jessica.jackson@example.com' },
  { id: '43', name: 'Emily Williams', email: 'emily.williams@example.com' },
  { id: '44', name: 'David Brown', email: 'david.brown@example.com' },
  { id: '45', name: 'Sarah Davis', email: 'sarah.davis@example.com' },
  { id: '46', name: 'Robert Wilson', email: 'robert.wilson@example.com' },
  { id: '47', name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com' },
  { id: '48', name: 'William Martinez', email: 'william.martinez@example.com' },
  { id: '49', name: 'Amanda Anderson', email: 'amanda.anderson@example.com' },
  { id: '50', name: 'Thomas Thomas', email: 'thomas.thomas@example.com' },
  { id: '51', name: 'Jessica Jackson', email: 'jessica.jackson@example.com' },
  { id: '52', name: 'Daniel White', email: 'daniel.white@example.com' },
  { id: '53', name: 'Lisa Harris', email: 'lisa.harris@example.com' },
  { id: '54', name: 'Christopher Clark', email: 'christopher.clark@example.com' },
];

export default function UserManagement() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  
  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dummyUsers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(dummyUsers.length / recordsPerPage);
  
  // View user action
  const handleViewUser = (user: any) => {
    router.push(`/dashboard/user-management/details/${user.id}`);
  };
  
  // Create action component with only eye button
  const ActionComponent = ({ item }: { item: any }) => (
    <div className="flex justify-center">
      <button 
        onClick={() => handleViewUser(item)}
        className="w-6 h-6 p-[3.60px] bg-[#d2d2d5] rounded-[4.80px] flex justify-center items-center hover:bg-[#c2c2c5] transition-colors"
      >
        <Image src={eye} alt="View" width={16} height={16} />
      </button>
    </div>
  );
  
  return (
    <div className="p-6 flex justify-center">
      <div className="inline-flex flex-col justify-start items-center gap-10">
        <ThreeColTable 
          data={currentRecords.map(user => ({
            ...user,
            action: <ActionComponent item={user} />
          }))}
          title="User Management"
          showViewAll={false}
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="inline-flex justify-center items-center gap-2">
            <div className="h-8 px-1 py-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
              <div 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={`justify-start text-${currentPage === 1 ? '[#a5a5ab]' : '[#1d1f2c]'} text-base font-medium leading-relaxed tracking-tight cursor-pointer`}
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
                className={`justify-start ${currentPage === totalPages ? '[#a5a5ab]' : '[#1d1f2c]'} text-base font-medium leading-relaxed tracking-tight cursor-pointer`}
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
