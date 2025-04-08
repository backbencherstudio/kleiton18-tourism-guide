'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import eye from '@/public/dashboard/icon/eye.svg';

interface TableData {
  id?: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  lastLogin?: string;
  action?: React.ReactNode;
}

interface ThreeColTableProps {
  data: TableData[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  actionComponent?: React.ReactNode;
  onViewClick?: (item: TableData) => void;
}

const ThreeColTable: React.FC<ThreeColTableProps> = ({ 
  data, 
  title = "User Management",
  showViewAll = true,
  viewAllLink = "/admin/users",
  actionComponent,
  onViewClick
}) => {

  const DefaultActionComponent = ({ item }: { item: TableData }) => (
    <div className="flex gap-2">
      <button 
        onClick={() => onViewClick && onViewClick(item)}
        className="w-6 h-6 p-[3.60px] bg-[#d2d2d5] rounded-[4.80px] flex justify-center items-center hover:bg-[#c2c2c5] transition-colors"
      >
        <Image src={eye} alt="View" width={16} height={16} />
      </button>
    </div>
  );

  return (
    <div className="inline-flex flex-col justify-start items-start gap-8">
      {/* Header */}
      {title && (
        <div className="w-full inline-flex justify-between items-end gap-2.5">
          <div className="flex-1 justify-start text-[#07080b] text-2xl font-semibold leading-[31.20px] tracking-tight">
            {title}
          </div>
          {showViewAll && (
            <Link href={viewAllLink} className="justify-center text-[#0f1016] text-base font-semibold underline leading-normal">
              View All
            </Link>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-3xl inline-flex justify-start items-start">
        {/* Name Column */}
        <div className="w-[356px] inline-flex flex-col justify-start items-start">
          <div className="self-stretch p-4 bg-[#07080b] rounded-tl-lg border-l border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 h-5 justify-start text-white text-base font-medium leading-relaxed tracking-tight">
              Name
            </div>
          </div>
          {data.map((item, index) => (
            <div
              key={`name-${item.id || index}`}
              className={`self-stretch px-4 py-3.5 border-l border-t border-[#a5a5ab] inline-flex justify-start items-center gap-2.5 ${
                index % 2 === 1 ? 'bg-[#eceff3]' : ''
              } ${index === data.length - 1 ? 'rounded-bl-lg border-b' : ''}`}
            >
              <div className="flex-1 h-5 justify-start text-[#07080b] text-base font-normal leading-relaxed tracking-tight">
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* Email Column */}
        <div className="w-[484px] inline-flex flex-col justify-start items-start">
          <div className="self-stretch p-4 bg-[#07080b] border-l border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 h-5 justify-start text-white text-base font-medium leading-relaxed tracking-tight">
              Email
            </div>
          </div>
          {data.map((item, index) => (
            <div
              key={`email-${item.id || index}`}
              className={`self-stretch px-4 py-3.5 border-l border-t border-[#a5a5ab] inline-flex justify-start items-center gap-2.5 ${
                index % 2 === 1 ? 'bg-[#eceff3]' : ''
              } ${index === data.length - 1 ? 'border-b' : ''}`}
            >
              <div className="flex-1 h-5 justify-start text-[#07080b] text-base font-normal leading-relaxed tracking-tight">
                {item.email}
              </div>
            </div>
          ))}
        </div>

        {/* Actions Column */}
        <div className="w-[123px] inline-flex flex-col justify-start items-start">
          <div className="self-stretch p-4 bg-[#07080b] rounded-tr-lg border-l border-r border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 h-5 justify-start text-white text-base font-medium leading-relaxed tracking-tight">
              Actions
            </div>
          </div>
          {data.map((item, index) => (
            <div
              key={`action-${item.id || index}`}
              className={`self-stretch px-4 py-3 border-l border-r border-t border-[#a5a5ab] inline-flex justify-start items-center gap-2.5 ${
                index % 2 === 1 ? 'bg-[#eceff3]' : ''
              } ${index === data.length - 1 ? 'rounded-br-lg border-b' : ''}`}
            >
              {item.action || actionComponent || <DefaultActionComponent item={item} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeColTable;
