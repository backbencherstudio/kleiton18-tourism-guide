"use client"

import { CookieHelper } from "@/helper/cookie.helper"
import { UserService } from "@/service/user/user.service"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { useForm } from "react-hook-form"
type FormValues = {
    email: string
    password: string
}
function LogInForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const { login } = UserService
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const onSubmit = async (data: FormValues) => {
        console.log(data)
        try {
            const res = await login({ email: data?.email, password: data?.password })
            const tokenNumber = res.data.token
            CookieHelper.set({
                key: "token",
                value: tokenNumber,
            });
            console.log(tokenNumber);
            console.log("ter-------------", res);

            router.push("/")
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.message)
            }
            console.error("Registration failed:", error);
            // Optionally show error to user
        }
        // Handle form submission
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="lg:space-y-4 space-y-3">
                <div>
                    <label htmlFor="email" className="block lg:text-base text-sm font-medium text-[#1D1F2C] lg:mb-4 mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full lg:px-4 px-2 text-neutral-400  lg:py-4 py-2 border border-[#EDEDED] rounded-md  bg-[#FAFAFA]  outline-0 text-sm"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && <p className="mt-1 lg:text-base text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block lg:text-base text-sm font-medium text-[#1D1F2C] lg:mb-4 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="w-full lg:px-4 px-2  text-neutral-400 lg:py-4 py-2 border border-[#EDEDED] rounded-md  bg-[#FAFAFA]  outline-0 text-sm"
                            placeholder="********"
                            {...register("password", {
                                required: "Password is required",

                            })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="lg:h-6 h-4 lg:w-6 w-4 text-gray-400" />
                            ) : (
                                <Eye className="lg:h-6 h-4 lg:w-6 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {errors.password && <p className="mt-1 lg:text-base text-sm text-red-600">{errors.password.message}</p>}
                    <div className="flex justify-end lg:my-6 my-2">
                        <Link href="/forgot-password" className="lg:text-base text-sm text-[#777980] underline ">
                            Forgot your Password
                        </Link>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer bg-primaryColor text-white lg:py-4 py-2 lg:px-4 px-2 text-sm lg:text-base rounded-md  transition-colors"
                >
                    Log In
                </button>
                <div className="text-center">
                    <span className=" text-sm text-[#252525] font-medium ">Don’t have any account? <Link href="/signup" className="text-primaryColor">Sign Up</Link> </span>
                </div>

                {/* 
                        <div className="space-y-3">
                            <button
                                type="button"
                                className="w-full cursor-pointer flex items-center justify-center gap-2 border border-borderColor rounded-md lg:py-4 py-2 lg:px-4 px-2 lg:text-base text-sm text-[#212121]  transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </button>
                            <button
                                type="button"
                                className="w-full cursor-pointer flex items-center justify-center gap-2 border border-borderColor rounded-md lg:py-4 py-2 lg:px-4 px-2 lg:text-base text-sm text-[#212121]  transition-colors"
                            >
                                <FaApple size={16} />
                                Continue with Apple
                            </button>
                        </div> */}
            </form>
        </div>
    )
}

export default LogInForm
