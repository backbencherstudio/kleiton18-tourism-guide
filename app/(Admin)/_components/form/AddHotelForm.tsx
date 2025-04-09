'use client';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

type HotelFormInputs = {
  name: string;
  location: string;
  reviews: number;
  rating: string;
  image: FileList;
  bookingLink: string;
  amenities: string[];
};

const amenitiesOptions = [{image:"/images/icons/pool.png" ,title:"Pool"},{image:"/images/icons/restaurant.png" ,title:"Restaurant"}, {image:"/images/icons/wifi.png" ,title:"Free Wifi"}, {image:"/images/icons/spa.png" ,title:"Spa"}];

export default function AddHotelForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<HotelFormInputs>();

  const onSubmit = (data: HotelFormInputs) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 rounded-lg bg-white border border-gray-200 space-y-6">
        <h2 className="text-xl text-[#232323] !font-[Poppins]  font-medium">General Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Hotel Name */}
          <div>
            <label className="block text-sm text-[#212121] font-normal mb-2">Hotel Name</label>
            <input
              {...register('name', { required: 'Hotel Name is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.name && <p className="text-primaryColor text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-[#212121] font-normal mb-2">Location</label>
            <input
              {...register('location', { required: 'Location is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.location && <p className="text-primaryColor text-xs mt-1">{errors.location.message}</p>}
          </div>

          {/* Number of Reviews */}
          <div>
            <label className="block text-sm text-[#212121] font-normal mb-2">Number of Review</label>
            <input
              type="number"
              {...register('reviews', { required: 'Review count is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.reviews && <p className="text-primaryColor text-xs mt-1">{errors.reviews.message}</p>}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm text-[#212121] font-normal mb-2">Rating</label>
            <input
              type="number"
              {...register('reviews', { required: 'Rating count is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.rating && <p className="text-primaryColor text-xs mt-1">{errors.rating.message}</p>}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm text-[#212121] font-normal mb-2">Image</label>
            <div className="flex items-center border rounded-md p-3">
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: 'Image is required' })}
                className="w-full cursor-pointer text-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
<path d="M4.29497 4.90677H5.9142V9.59304C5.9142 10.0685 6.30934 10.4535 6.79619 10.4535H9.20365C9.69046 10.4535 10.0856 10.0685 10.0856 9.59304V4.90677H11.7043C11.9725 4.90677 12.2135 4.74925 12.3166 4.50748C12.4187 4.2667 12.3619 3.98835 12.1724 3.80351L8.46795 0.188934C8.20921 -0.062978 7.79007 -0.062978 7.53078 0.188934L3.82691 3.80351C3.73425 3.89381 3.67113 4.0089 3.64556 4.13422C3.61998 4.25954 3.63309 4.38944 3.68323 4.50748C3.78627 4.74877 4.02681 4.90677 4.29497 4.90677Z" fill="#737373"/>
<path d="M15.2044 6.66406C14.7655 6.66406 14.4094 7.01152 14.4094 7.4402V10.6855C14.4094 11.6577 13.5982 12.4485 12.6017 12.4485H3.39824C2.40172 12.4485 1.59108 11.6577 1.59108 10.6855V7.4402C1.59108 7.01152 1.23445 6.66406 0.79554 6.66406C0.356109 6.66406 0 7.01152 0 7.44023V10.6855C0 12.5136 1.52442 14.0009 3.39824 14.0009H12.6017C14.4755 14.0009 16 12.5136 16 10.6855V7.44023C16 7.01152 15.6439 6.66406 15.2044 6.66406Z" fill="#737373"/>
</svg>
            </div>
            {errors.image && <p className="text-primaryColor text-xs mt-1">{errors.image.message}</p>}
          </div>

          {/* Booking Link */}
          <div>
            <label className="block text-sm text-[#212121] font-normal mb-2">Booking Link</label>
            <input
              {...register('bookingLink', { required: 'Booking link is required' })}
              placeholder="Attach"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.bookingLink && (
              <p className="text-primaryColor text-xs mt-1">{errors.bookingLink.message}</p>
            )}
          </div>
        </div>

        {/* Amenities */}
        <div>
            <div>
                <h4 className=' text-2xl text-[#232323] !font-[Poppins] font-medium my-4'>Amenities</h4>
            </div>
          <p className="text-sm text-[#212121] font-normal mb-2">Amenities</p>
          <div className="border rounded-md p-4 space-y-2">
            {amenitiesOptions.map((item) => (
              <label key={item.title} className="flex items-center space-x-4 text-sm">
                <input
                  type="checkbox"
                  value={item.title}
                  {...register('amenities', {
                    required: 'Please select at least one amenity',
                  })}
                  className="w-4 h-4 accent-[#D9D9D9] border-[#EDEDED] bg-[#EDEDED] rounded hover:accent-[#D9D9D9]"
                />
                <span className='text-md text-[#111111] gap-1 items-center  flex'><Image src={item?.image} width={16} height={16} alt={item?.title}/>{item.title}</span>
              </label>
            ))}
          </div>
          {errors.amenities && (
            <p className="text-primaryColor text-xs mt-1">{errors.amenities.message}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 rounded-md border bg-borderColor text-[#111]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 rounded-md bg-primaryColor text-white hover:bg-red-600"
        >
          Add Hotel
        </button>
      </div>
    </form>
  );
}
