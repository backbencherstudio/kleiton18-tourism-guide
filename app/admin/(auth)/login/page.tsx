import LogInForm from "@/components/allForm/LogInForm";

export default function SignupForm() {
    
    return (
        <section className="flex justify-center items-center min-h-screen mx-auto max-w-[700px] px-4">
            <div className=" w-full mx-auto ">
            <div>
                <div className="text-center mb-10">
                    <h1 className="lg:text-2xl text-xl font-medium text-[#1D1F2C]">Log in to Your Account</h1>
                    <p className="lg:text-base text-sm leading-[160%] text-[#4A4C56] font-[Poppins] mt-1 tracking-wider">Log in now and personalized your tour </p>
                </div>
                <div className="w-full  bg-white rounded-lg p-8 border border-borderColor">
                   <LogInForm admin={true}/>
                </div>
            </div>


        </div>
        </section>
        
    )
}
