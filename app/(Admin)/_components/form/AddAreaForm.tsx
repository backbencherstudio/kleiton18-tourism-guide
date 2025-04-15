'use client';
import { useToken } from '@/hooks/useToken';
import { UserService } from '@/service/user/user.service';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type VisitAreaInputs = {
  name: string;
  location: string;
  description: string; 
  image: FileList;
  detailsLink: string;
};

export default function AddAreaForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VisitAreaInputs>();

  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: VisitAreaInputs) => {
    setLoading(true);
    setError("");

    try {
      if (!token) throw new Error("User token not found. Please login again.");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);
      formData.append("description", String(data.description));
      formData.append("detailsLink", data.detailsLink);
      formData.append("image", data.image[0]); // one file only

      const response = await UserService.addVisitedAerea(formData, token);
      if (response.status === 201) {
        toast.success("New Area Added Successfully");
        reset();
      }

    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 rounded-lg bg-white border border-gray-200 space-y-4 lg:space-y-6">
        <h2 className="md:text-xl text-lg text-[#232323] font-medium">General Information</h2>

        <div className="grid md:grid-cols-2 grid-cols-2 gap-4 w-full">
          {/* Visit Area Name */}
          <div className="col-span-2">
            <label className="block text-sm text-[#212121] mb-2">Visit Area Name</label>
            <input
              {...register('name', { required: 'Visit name is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md outline-0 text-sm"
            />
            {errors.name && <p className="text-primaryColor text-xs mt-1">{errors.name.message}</p>}
          </div>
          {/* Location */}
          <div className="col-span-2">
            <label className="block text-sm text-[#212121] mb-2">Location</label>
            <input
              {...register('location', { required: 'Location is required' })}
              placeholder="Type"
              className="w-full p-3 border rounded-md outline-0 text-sm"
            />
            {errors.location && <p className="text-primaryColor text-xs mt-1">{errors.location.message}</p>}
          </div>

          <div className="col-span-2 grid lg:grid-cols-3 gap-4">
            {/* Description */}
            <div>
              <label className="block text-sm text-[#212121] mb-2">Description</label>
              <input
                type="text"
                {...register('description', { required: 'description count is required' })}
                placeholder="Type"
                className="w-full p-3 border rounded-md outline-0 text-sm"
              />
              {errors.description && <p className="text-primaryColor text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm text-[#212121] font-normal mb-2">Image</label>
              <div className="flex items-center border rounded-md p-3">
                <input
                  type="file"
                  accept="image/*"
                  {...register('image', { required: 'Image is required' })}
                  className="w-full cursor-pointer outline-0 text-sm"
                />
              </div>
              {errors.image && <p className="text-primaryColor text-xs mt-1">{errors.image.message}</p>}
            </div>

            {/* Booking Link */}
            <div>
              <label className="block text-sm text-[#212121] mb-2">Details Link</label>
              <input
                {...register('detailsLink', { required: 'detailsLink link is required' })}
                placeholder="Attach"
                className="w-full p-3 border rounded-md outline-0 text-sm"
              />
              {errors.detailsLink && (
                <p className="text-primaryColor text-xs mt-1">{errors.detailsLink.message}</p>
              )}
            </div>
          </div>

          {error && (
            <p className="text-center text-base py-2 text-primaryColor">{error}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center md:justify-end gap-3 mt-5">
        <button
          type="button"
          onClick={() => reset()}
          className="lg:px-6 lg:py-3 px-3 py-2 rounded-md border bg-borderColor text-[#111]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="lg:px-6 lg:py-3 px-3 py-2 cursor-pointer text-base rounded-md bg-primaryColor text-white hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Add Location"}
        </button>
      </div>
    </form>
  );
}
