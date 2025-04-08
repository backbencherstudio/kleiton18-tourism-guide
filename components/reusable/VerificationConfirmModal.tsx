import tik from '@/public/images/tik.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogContent } from '../ui/dialog'
function VerificationConfirmModal({isDialogOpen,setIsDialogOpen,title,description}:any) {
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] py-15">
          <div className="flex flex-col items-center justify-center bg-white px-4">
            <Image src={tik} alt="tik" width={101} height={101} />
            <p className="text-base font-semibold text-[#1E1F24] mt-4 mb-1">
              {title}
            </p>
            <p className="text-base text-[#525B66] mb-6 text-center">
              {description}
            </p>
            <div className="text-center w-full">
              <Link
                href="/login"
                className="w-full block cursor-pointer bg-primaryColor text-white lg:py-4 py-2 px-4 text-sm lg:text-base rounded-md  transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default VerificationConfirmModal
