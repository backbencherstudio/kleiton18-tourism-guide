"use client"

import { UserService } from "@/service/user/user.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  const { forgotEmail } = UserService
  const router = useRouter()
  const [error, setError] = useState("")

  const onSubmit = async (data: FormValues) => {
    // Handle OTP sending logic here
    console.log("Sending OTP to:", data.email)
     try {
                const res = await forgotEmail({ email: data?.email })
                console.log("otpe-send",res);
                
               
                 router.push("/confirm-otp")

            } catch (error) {
                if (error.response.status === 400) {
                    setError(error.response.data.message)
                }
                console.error("Registration failed:", error);
                // Optionally show error to user
            }
    // Simulate API call
  

  }

  return (
   <section className="flex justify-center items-center min-h-screen mx-auto max-w-[700px] px-4">
      <div className="w-full mx-auto">
        <div>
          <div className="text-center mb-10">
            <h1 className="lg:text-2xl text-xl font-medium text-[#1D1F2C]">Create your account</h1>
            <p className="lg:text-base text-sm leading-[160%] text-[#4A4C56] font-[Poppins] mt-1 tracking-wider">
              sign up now and personalized your tour
            </p>
          </div>
          <div className="w-full bg-white rounded-lg p-8 border border-borderColor">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="lg;space-y-6 space-y-4 lg:mb-6 mb-4">
            <label htmlFor="email" className="block lg:text-base text-sm font-medium text-[#1D1F2C] lg:mb-4 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full lg:px-4 px-2 text-neutral-400  lg:py-4 py-2 border border-[#EDEDED] rounded-md  bg-[#FAFAFA]  outline-0 text-sm"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="mt-1 text-xs text-primaryColor">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full block cursor-pointer bg-primaryColor text-white lg:py-4 py-2 px-4 text-sm lg:text-base rounded-md  transition-colors"
          >
            {isSubmitting ? "Sending..." : "Send OTP"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="inline-flex items-center text-base lg:text-lg text-[#212121]">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Log in
          </Link>
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}
