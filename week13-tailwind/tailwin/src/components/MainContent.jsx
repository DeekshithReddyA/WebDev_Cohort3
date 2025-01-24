import React from 'react'

function MainContent({ sidebarOpen }) {
  return (
    <div className='w-full'>
      <img className='h-32 w-full object-cover hidden md:block' src='https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg' />
      <div className='gap-4 grid grid-cols-12 p-4'>
        <div className='xl:h-96 col-span-11 bg-white -translate-y-16 rounded-lg shadow-lg hidden md:block md:col-span-2'>
          <div className='flex-col justify-items-center'>
            <div className='xl:h-36 xl:w-36 m-10 md:h-20 md:w-20'>
              <img className='rounded rounded-full' src='https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg' />
            </div>
            <div className='font-semibold text-xl'>
              Harkirat Singh
            </div>
            <div className='md:text-xs xl:text-lg mt-2 text-gray-600'>
              kirat@gmail.com
            </div>
            <div className='md:text-xs xl:text-lg text-gray-600'>
              6969696969
            </div>
            <div className='md:text-xs xl:text-lg m-4 text-gray-600'>
              Delhi, India
            </div>
          </div>
        </div>
        <div className='h-48 col-span-11 bg-green-300 rounded-lg shadow-lg md:col-span-6'>
        </div>
        <div className='h-56 col-span-11 bg-yellow-300 rounded-lg shadow-lg md:col-span-4'>
        </div>
      </div>
    </div>
  )
}
export default MainContent