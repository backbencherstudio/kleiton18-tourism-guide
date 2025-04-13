"use client"

import VerificationConfirmModal from "@/components/reusable/VerificationConfirmModal"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"


type FormValues = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError]=useState("")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()

  const password = watch("password")

  const onSubmit = async (data: FormValues) => {
    console.log("update password",data);
    
}
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:space-y-4 space-y-3">
       
        <div>
          <label htmlFor="password" className="block lg:text-base text-sm font-medium text-[#1D1F2C] lg:mb-4 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full lg:px-4 px-2 text-neutral-400   lg:py-4 py-2 border border-[#EDEDED] rounded-md  bg-[#FAFAFA]  outline-0 text-sm"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="lg:h-6 h-4 lg:w-6 text-gray-400" />
              ) : (
                <Eye className="lg:h-6 h-4 lg:w-6 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-base text-red-600">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block lg:text-base text-sm font-medium text-[#1D1F2C] lg:mb-4 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full lg:px-4 px-2 text-neutral-400  lg:py-4 py-2 border border-[#EDEDED] rounded-md  bg-[#FAFAFA]  outline-0 text-sm"
              placeholder="********"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="lg:h-6 h-4 lg:w-6 text-gray-400" />
              ) : (
                <Eye className="lg:h-6 h-4 lg:w-6 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-base text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

       
        {errors.agreeToTerms && <p className="mt-1 text-base text-red-600">{errors.agreeToTerms.message}</p>}
        {error && <p className="text-base text-primaryColor py-2 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full cursor-pointer bg-primaryColor text-white lg:py-4 py-2 lg:px-4 px-2 text-sm lg:text-base rounded-md  transition-colors"
        >
          Sign Up
        </button>

       

     
      </form>
      {isDialogOpen && <VerificationConfirmModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} title="Account Created" description="Your account has been created successfully" />}
    </div>
  )
}

export default UpdatePassword

