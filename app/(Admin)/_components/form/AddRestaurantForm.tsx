'use client';
import { useForm } from 'react-hook-form';

type RestaurantFormInputs = {
  name: string;
  location: string;
  reviews: number;
  rating: number;
  openTime: string;
  closeTime: string;
  details: string;
  image: FileList;
  bookingLink: string;
};

export default function AddRestaurantForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RestaurantFormInputs>();

  const onSubmit = (data: RestaurantFormInputs) => {
    console.log('Restaurant Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 rounded-lg bg-white border border-gray-200 space-y-6">
        <h2 className="text-xl text-[#232323] font-[Poppins] font-medium">General Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Restaurant Name */}
          <div>
            <label className="block text-sm text-[#212121] mb-2">Restaurant Name</label>
            <input
              {...register('name', { required: 'Restaurant name is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.name && <p className="text-primaryColor text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-[#212121] mb-2">Location</label>
            <input
              {...register('location', { required: 'Location is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.location && <p className="text-primaryColor text-xs mt-1">{errors.location.message}</p>}
          </div>

          {/* Number of Reviews */}
          <div>
            <label className="block text-sm text-[#212121] mb-2">Number of Review</label>
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
            <label className="block text-sm text-[#212121] mb-2">Rating</label>
            <input
              type="number"
              step="0.1"
              {...register('rating', { required: 'Rating is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.rating && <p className="text-primaryColor text-xs mt-1">{errors.rating.message}</p>}
          </div>

          {/* Open Time */}
          <div>
            <label className="block text-sm text-[#212121] mb-2">Open Time</label>
            <input
              type="time"
              {...register('openTime', { required: 'Open time is required' })}
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.openTime && <p className="text-primaryColor text-xs mt-1">{errors.openTime.message}</p>}
          </div>

          {/* Close Time */}
          <div>
            <label className="block text-sm text-[#212121] mb-2">Close Time</label>
            <input
              type="time"
              {...register('closeTime', { required: 'Close time is required' })}
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.closeTime && <p className="text-primaryColor text-xs mt-1">{errors.closeTime.message}</p>}
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm text-[#212121] mb-2">Details</label>
            <textarea
              {...register('details', { required: 'Details are required' })}
              placeholder="Type"
              rows={3}
              className="w-full p-3 border rounded-md text-sm resize-none"
            />
            {errors.details && <p className="text-primaryColor text-xs mt-1">{errors.details.message}</p>}
          </div>

          {/* Booking Link */}
          <div>
            <label className="block text-sm text-[#212121] mb-2">Booking Link</label>
            <input
              {...register('bookingLink', { required: 'Booking link is required' })}
              placeholder="Attach"
              className="w-full p-3 border rounded-md text-sm"
            />
            {errors.bookingLink && (
              <p className="text-primaryColor text-xs mt-1">{errors.bookingLink.message}</p>
            )}
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm text-[#212121] mb-2">Image</label>
            <div className="flex items-center border rounded-md p-3">
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: 'Image is required' })}
                className="w-full cursor-pointer text-sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
              >
                <path
                  d="M4.29497 4.90677H5.9142V9.59304C5.9142 10.0685 6.30934 10.4535 6.79619 10.4535H9.20365C9.69046 10.4535 10.0856 10.0685 10.0856 9.59304V4.90677H11.7043C11.9725 4.90677 12.2135 4.74925 12.3166 4.50748C12.4187 4.2667 12.3619 3.98835 12.1724 3.80351L8.46795 0.188934C8.20921 -0.062978 7.79007 -0.062978 7.53078 0.188934L3.82691 3.80351C3.73425 3.89381 3.67113 4.0089 3.64556 4.13422C3.61998 4.25954 3.63309 4.38944 3.68323 4.50748C3.78627 4.74877 4.02681 4.90677 4.29497 4.90677Z"
                  fill="#737373"
                />
                <path
                  d="M15.2044 6.66406C14.7655 6.66406 14.4094 7.01152 14.4094 7.4402V10.6855C14.4094 11.6577 13.5982 12.4485 12.6017 12.4485H3.39824C2.40172 12.4485 1.59108 11.6577 1.59108 10.6855V7.4402C1.59108 7.01152 1.23445 6.66406 0.79554 6.66406C0.356109 6.66406 0 7.01152 0 7.44023V10.6855C0 12.5136 1.52442 14.0009 3.39824 14.0009H12.6017C14.4755 14.0009 16 12.5136 16 10.6855V7.44023C16 7.01152 15.6439 6.66406 15.2044 6.66406Z"
                  fill="#737373"
                />
              </svg>
            </div>
            {errors.image && <p className="text-primaryColor text-xs mt-1">{errors.image.message}</p>}
          </div>
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
          Add Restaurant
        </button>
      </div>
    </form>
  );
}
