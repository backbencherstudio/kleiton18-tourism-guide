import DJAdminProfileEditForm from '@/components/AllForm/DJAdminProfileEditForm'

function DJAdminProfile() {
  return (
    <div className="w-full max-w-5xl mx-auto">
        <div className='py-8'>
           <h3 className=' text-2xl text-blackColor font-bold'>Profile</h3>
        </div>
        <DJAdminProfileEditForm/>
    </div>
  )
}

export default DJAdminProfile
