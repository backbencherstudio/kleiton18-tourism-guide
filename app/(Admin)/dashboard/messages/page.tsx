'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import eye from "@/public/dashboard/icon/eye.svg"
import MessageDetailsModal from '@/app/(Admin Dashboard)/_components/messagebox';

// Updated dummy messages data with unique messages
const dummyMessages = [
  { 
    id: '1', 
    name: 'Ronald Richards', 
    email: 'jackson.graham@example.com', 
    subject: 'I am a DJ and would like to get featured',
    message: "Hello, I am a professional DJ with 5 years of experience. I would love to be featured on your platform. I specialize in house and techno music and have played at several major clubs in the city. Could you please provide more information about the featuring process?"
  },
  { 
    id: '2', 
    name: 'Jacob Jones', 
    email: 'felicia.reid@example.com', 
    subject: 'I am a DJ and would like to get featured',
    message: "I have been DJing for over 8 years and have played at major clubs across Europe. My specialty is progressive house and trance. I have a strong social media following and would love to collaborate with your platform."
  },
  { 
    id: '3', 
    name: 'Kathryn Murphy', 
    email: 'tanya.hill@example.com', 
    subject: 'General Inquiry / Feedback',
    message: "Your platform has been amazing for discovering new DJs. However, I think the search functionality could be improved. It would be great if we could filter DJs by music genre and location. Also, adding a rating system would help users make better choices."
  },
  { 
    id: '4', 
    name: 'Arlene McCoy', 
    email: 'willie.jennings@example.com', 
    subject: 'I am a DJ and would like to get featured',
    message: "Hi there, I'm an up-and-coming DJ in the EDM scene. I've been producing my own tracks and have gained a decent following on SoundCloud. I believe being featured on your platform would help me reach a wider audience."
  },
  { 
    id: '5', 
    name: 'Jenny Wilson', 
    email: 'nevaeh.simmons@example.com', 
    subject: 'I am a DJ and would like to get featured',
    message: "I specialize in hip-hop and R&B mixing. With 6 years of experience and regular gigs at top venues, I think I'd be a great addition to your platform. I can provide references from venue owners and event organizers."
  },
  { 
    id: '6', 
    name: 'Darrell Steward', 
    email: 'tim.jennings@example.com', 
    subject: 'Other',
    message: "I represent a major nightclub chain and would like to discuss a potential partnership. We're interested in using your platform to find and book DJs for our venues. Please let me know when we can schedule a call to discuss this further."
  },
  { 
    id: '7', 
    name: 'Cameron Williamson', 
    email: 'kenzi.lawson@example.com', 
    subject: 'General Inquiry / Feedback',
    message: "The recent updates to the platform have been great! The new booking system is much more efficient. One suggestion: it would be helpful to have a calendar integration feature for DJs to mark their availability."
  },
  { 
    id: '8', 
    name: 'Robert Fox', 
    email: 'sara.cruz@example.com', 
    subject: 'General Inquiry / Feedback',
    message: "Could you provide more information about your verification process for DJs? I'm interested in understanding how you ensure the quality and reliability of the DJs featured on your platform."
  },
  { 
    id: '9', 
    name: 'Devon Lane', 
    email: 'curtis.weaver@example.com', 
    subject: 'General Inquiry / Feedback',
    message: "I'm organizing a major music festival and would like to connect with some of your featured DJs. Do you have a specific process for event organizers to browse and contact multiple DJs at once?"
  },
  { 
    id: '10', 
    name: 'Ralph Edwards', 
    email: 'georgia.young@example.com', 
    subject: 'I am a DJ and would like to get featured',
    message: "With 10+ years of experience in the industry, I believe I would be a great addition to your platform. I've performed at major festivals and have my own radio show. I can bring a unique perspective and valuable experience to your community."
  },
  { 
    id: '11', 
    name: 'Eleanor Pena', 
    email: 'bill.sanders@example.com', 
    subject: 'Other',
    message: "I represent an independent record label focusing on electronic music. We're interested in exploring collaboration opportunities with your platform and your featured DJs. Would love to discuss potential synergies."
  },
  { 
    id: '12', 
    name: 'Brooklyn Simmons', 
    email: 'dolores.chambers@example.com', 
    subject: 'Other',
    message: "We're a major event production company looking to advertise on your platform. Could you send information about your advertising packages and rates? We're particularly interested in reaching DJs and event organizers."
  },
  { 
    id: '13', 
    name: 'Leslie Alexander', 
    email: 'leslie.alexander@example.com', 
    subject: 'I am a DJ and would like to get featured',
    message: "I focus on underground electronic music and have a strong following in the local scene. I run my own monthly event series and would love to expand my reach through your platform."
  },
  { 
    id: '14', 
    name: 'Guy Hawkins', 
    email: 'guy.hawkins@example.com', 
    subject: 'General Inquiry / Feedback',
    message: "The DJ profiles are great, but I think adding more filtering options would be helpful. Specifically, being able to filter by music genre, years of experience, and location would make it easier to find the right DJ for specific events."
  },
  // More data for pagination
  { id: '15', name: 'Cody Fisher', email: 'cody.fisher@example.com', subject: 'Other' },
  { id: '16', name: 'Theresa Webb', email: 'theresa.webb@example.com', subject: 'I am a DJ and would like to get featured' },
  { id: '17', name: 'Bessie Cooper', email: 'bessie.cooper@example.com', subject: 'General Inquiry / Feedback' },
  { id: '18', name: 'Annette Black', email: 'annette.black@example.com', subject: 'Other' },
  { id: '19', name: 'Marvin McKinney', email: 'marvin.mckinney@example.com', subject: 'I am a DJ and would like to get featured' },
  { id: '20', name: 'Esther Howard', email: 'esther.howard@example.com', subject: 'General Inquiry / Feedback' },
  { id: '21', name: 'Albert Flores', email: 'albert.flores@example.com', subject: 'Other' },
  { id: '22', name: 'Darlene Robertson', email: 'darlene.robertson@example.com', subject: 'I am a DJ and would like to get featured' },
  { id: '23', name: 'Savannah Nguyen', email: 'savannah.nguyen@example.com', subject: 'General Inquiry / Feedback' },
  { id: '24', name: 'Jerome Bell', email: 'jerome.bell@example.com', subject: 'Other' },
];

export default function Messages() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  
  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dummyMessages.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(dummyMessages.length / recordsPerPage);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  
  // Update view details handler
  const handleViewDetails = (message: any) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-6 flex justify-center">
        <div className="inline-flex flex-col justify-start items-center gap-10">
          <div className="flex flex-col justify-start items-start gap-8">
            <div className="self-stretch justify-start text-[#07080b] text-2xl font-semibold font-['Montserrat'] leading-[31.20px] tracking-tight">Messages</div>
            <div className="self-stretch rounded-3xl inline-flex justify-start items-start">
              {/* Name Column */}
              <div className="w-[236px] inline-flex flex-col justify-start items-start">
                <div className="self-stretch p-4 bg-[#07080b] rounded-tl-lg border-l border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
                  <div className="flex-1 h-5 justify-start text-white text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Name</div>
                </div>
                
                {currentRecords.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`self-stretch px-4 py-3.5 ${index % 2 !== 0 ? 'bg-[#eceff3]' : ''} border-l border-t border-[#a5a5ab] ${index === currentRecords.length - 1 ? 'rounded-bl-lg border-b' : ''} inline-flex justify-start items-center gap-2.5`}
                  >
                    <div className="flex-1 h-5 justify-start text-[#07080b] text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">{message.name}</div>
                  </div>
                ))}
              </div>
              
              {/* Email Column */}
              <div className="w-[310px] inline-flex flex-col justify-start items-start">
                <div className="self-stretch p-4 bg-[#07080b] border-l border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
                  <div className="flex-1 h-5 justify-start text-white text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Email</div>
                </div>
                
                {currentRecords.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`self-stretch px-4 py-3.5 ${index % 2 !== 0 ? 'bg-[#eceff3]' : ''} border-l border-t border-[#a5a5ab] ${index === currentRecords.length - 1 ? 'border-b' : ''} inline-flex justify-start items-center gap-2.5`}
                  >
                    <div className="w-[277px] h-5 justify-start text-[#07080b] text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">{message.email}</div>
                  </div>
                ))}
              </div>
              
              {/* Subject Column */}
              <div className="w-[379px] inline-flex flex-col justify-start items-start">
                <div className="self-stretch p-4 bg-[#07080b] border-l border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
                  <div className="flex-1 h-5 justify-start text-white text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Subject</div>
                </div>
                
                {currentRecords.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`self-stretch px-4 py-3.5 ${index % 2 !== 0 ? 'bg-[#eceff3]' : ''} border-l border-t border-[#a5a5ab] ${index === currentRecords.length - 1 ? 'border-b' : ''} inline-flex justify-start items-center gap-2.5`}
                  >
                    <div className="flex-1 h-5 justify-start text-[#07080b] text-base font-normal font-['Montserrat'] leading-relaxed tracking-tight">{message.subject}</div>
                  </div>
                ))}
              </div>
              
              {/* Details Column */}
              <div className="w-[123px] inline-flex flex-col justify-start items-start">
                <div className="self-stretch p-4 bg-[#07080b] rounded-tr-lg border-l border-r border-t border-[#07080b] inline-flex justify-start items-center gap-2.5">
                  <div className="flex-1 h-5 justify-start text-white text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">Details</div>
                </div>
                
                {currentRecords.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`self-stretch px-4 py-3 ${index % 2 !== 0 ? 'bg-[#eceff3]' : ''} border-l border-r border-t ${index === currentRecords.length - 1 ? 'rounded-br-lg border-b' : ''} border-[#a5a5ab] inline-flex justify-start items-center gap-2.5`}
                  >
                    <button 
                      onClick={() => handleViewDetails(message)}
                      className="w-6 h-6 p-[3.60px] bg-[#d2d2d5] rounded-[4.80px] flex justify-center items-center hover:bg-[#c2c2c5] transition-colors"
                    >
                      <Image src={eye} alt="View" width={16} height={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="inline-flex justify-center items-center gap-2">
              <div className="h-8 px-1 py-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                <div 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={`justify-start ${currentPage === 1 ? 'text-[#a5a5ab]' : 'text-[#1d1f2c]'} text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight cursor-pointer`}
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
                          : 'bg-white outline outline-1 outline-offset-[-1px] outline-[#f1f1f1]'
                        } rounded-lg inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer`}
                      >
                        <div className={`justify-start ${
                          currentPage === i + 1
                          ? 'text-white'
                          : 'text-[#1d1f2c]'
                        } text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight`}>
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
                          : 'bg-white outline outline-1 outline-offset-[-1px] outline-[#f1f1f1]'
                        } rounded-lg inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer`}
                      >
                        <div className={`justify-start ${
                          currentPage === i + 1
                          ? 'text-white'
                          : 'text-[#1d1f2c]'
                        } text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight`}>
                          {i + 1}
                        </div>
                      </div>
                    );
                  }
                  
                  // Show ellipsis after first page (if needed)
                  if (i === 1 && currentPage > 3) {
                    return (
                      <div key={i} className="w-8 h-8 p-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                        <div className="justify-center text-[#1d1f2c] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">...</div>
                      </div>
                    );
                  }
                  
                  // Show ellipsis before last page (if needed)
                  if (i === totalPages - 2 && currentPage < totalPages - 2) {
                    return (
                      <div key={i} className="w-8 h-8 p-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                        <div className="justify-center text-[#1d1f2c] text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight">...</div>
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
                        } text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight`}>
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
                      } text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight`}>
                        {i + 1}
                      </div>
                    </div>
                  );
                }
              })}
              
              <div className="h-8 px-1 py-2.5 bg-white rounded-lg inline-flex flex-col justify-center items-center gap-2.5">
                <div 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={`justify-start ${currentPage === totalPages ? 'text-[#a5a5ab]' : 'text-[#1d1f2c]'} text-base font-medium font-['Montserrat'] leading-relaxed tracking-tight cursor-pointer`}
                >
                  Next
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Modal */}
      {isModalOpen && selectedMessage && (
        <MessageDetailsModal
          message={selectedMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
