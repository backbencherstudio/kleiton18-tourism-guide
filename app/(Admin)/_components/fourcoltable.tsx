'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import save from '@/public/dashboard/icon/save.svg';
import eye from '@/public/dashboard/icon/eye.svg';

interface TableData {
  id?: string;
  name: string;
  email: string;
  instagramLink: string;
  action?: React.ReactNode;
}

interface FourColTableProps {
  data: TableData[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  actionComponent?: React.ReactNode;
}

const FourColTable: React.FC<FourColTableProps> = ({
  data,
  title = "DJ Management",
  showViewAll = true,
  viewAllLink = "/admin/djs",
  actionComponent
}) => {
  // Process the data to ensure all items have IDs
  const processedData = data.map((item, index) => ({
    ...item,
    id: item.id || `item-${index}`
  }));

  const handleViewClick = (item: TableData) => {
    // Just log or perform a non-editing action
    console.log('Viewing item:', item);
    // You could add any viewing logic here
  };

  const handleSaveClick = (item: TableData) => {
    // Just log or perform a save action without editing
    console.log('Saving item:', item);
    // You could add any saving logic here
  };

  const EyeIcon = () => (
    <div className="w-4 h-4 relative overflow-hidden">
      <div className="w-1 h-1 left-[6px] top-[6px] absolute outline outline-[1.05px] outline-offset-[-0.53px] outline-[#07080b]" />
      <div className="w-[12.82px] h-[9.33px] left-[1.59px] top-[3.33px] absolute outline outline-[1.05px] outline-offset-[-0.53px] outline-[#07080b]" />
    </div>
  );

  const DeleteIcon = () => (
    <div className="w-4 h-4 relative overflow-hidden">
      <div className="w-[5.49px] h-[5.22px] left-[5.26px] top-[4.09px] absolute bg-[#1d1f2c]" />
      <div className="w-[12.19px] h-4 left-[1.91px] top-0 absolute bg-[#1d1f2c]" />
    </div>
  );

  const DefaultActionComponent = ({ item }: { item: TableData }) => (
    <div className="flex justify-start items-center gap-4">
      <button
        onClick={() => handleViewClick(item)}
        className="w-6 h-6 p-[3.60px] bg-[#d2d2d5] rounded-[4.80px] flex justify-center items-center gap-3 hover:bg-[#c2c2c5] transition-colors cursor-pointer"
      >
        <Image src={eye} alt="View" width={16} height={16} />
      </button>
      <button
        onClick={() => handleSaveClick(item)}
        className="w-6 h-6 p-[3.60px] bg-[#d2d2d5] rounded-[4.80px] flex justify-center items-center gap-3 hover:bg-[#c2c2c5] transition-colors cursor-pointer"
      >
        <Image src={save} alt="Save" width={16} height={16} />
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
        <div className="w-[236px] inline-flex flex-col justify-start items-start">
          <div className="self-stretch p-4 bg-[#07080b] rounded-tl-lg border-l border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 h-5 justify-start text-white text-base font-medium leading-relaxed tracking-tight">Name</div>
          </div>
          {processedData.map((item, index) => (
            <div
              key={`name-${item.id || index}`}
              className={`self-stretch px-4 py-3.5 ${index % 2 === 1 ? 'bg-[#eceff3]' : ''} border-l border-t border-[#a5a5ab] inline-flex justify-start items-center gap-2.5 ${
                index === processedData.length - 1 ? 'rounded-bl-lg border-b' : ''
              }`}
            >
              <div className="flex-1 h-5 justify-start text-[#07080b] text-base font-normal leading-relaxed tracking-tight">
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* Email Column */}
        <div className="w-[298px] inline-flex flex-col justify-start items-start">
          <div className="self-stretch p-4 bg-[#07080b] border-l border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 h-5 justify-start text-white text-base font-medium leading-relaxed tracking-tight">Email</div>
          </div>
          {processedData.map((item, index) => (
            <div
              key={`email-${item.id || index}`}
              className={`self-stretch px-4 py-3.5 ${index % 2 === 1 ? 'bg-[#eceff3]' : ''} border-l border-t border-[#a5a5ab] inline-flex justify-start items-center gap-2.5 ${
                index === processedData.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="w-full h-5 justify-start text-[#07080b] text-base font-normal leading-relaxed tracking-tight">
                {item.email}
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Link Column */}
        <div className="w-[317px] inline-flex flex-col justify-start items-start">
          <div className="self-stretch p-4 bg-[#07080b] border-l border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 h-5 justify-start text-white text-base font-medium leading-relaxed tracking-tight">Instagram Link</div>
          </div>
          {processedData.map((item, index) => (
            <div
              key={`instagram-${item.id || index}`}
              className={`self-stretch px-4 py-3.5 ${index % 2 === 1 ? 'bg-[#eceff3]' : ''} border-l border-t border-[#a5a5ab] inline-flex justify-start items-center gap-2.5 ${
                index === processedData.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="flex-1 h-5 justify-start text-[#07080b] text-base font-normal leading-relaxed tracking-tight">
                {item.instagramLink}
              </div>
            </div>
          ))}
        </div>

        {/* Actions Column */}
        <div className="w-28 inline-flex flex-col justify-start items-start">
          <div className="self-stretch p-4 bg-[#07080b] rounded-tr-lg border-l border-r border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
            <div className="flex-1 h-5 justify-start text-white text-base font-medium leading-relaxed tracking-tight">Actions</div>
          </div>
          {processedData.map((item, index) => (
            <div
              key={`action-${item.id || index}`}
              className={`self-stretch px-4 py-3 ${index % 2 === 1 ? 'bg-[#eceff3]' : ''} border-l border-r border-t border-[#a5a5ab] inline-flex justify-start items-center gap-2.5 ${
                index === processedData.length - 1 ? 'rounded-br-lg border-b' : ''
              }`}
            >
              {item.action || actionComponent || <DefaultActionComponent item={item} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FourColTable;