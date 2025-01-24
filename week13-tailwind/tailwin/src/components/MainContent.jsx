import React from 'react'
import { Calender } from './icons/Calender'
import { ChevronDown } from './icons/ChevronDown'
import { LeftArrow, RightArrow } from './icons/Arrows'
import { Camera } from './icons/Camera'

function MainContent({ sidebarOpen }) {
  return (
    <div className='w-full'>
      <img className='h-32 w-full object-cover hidden md:block' src='https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg' />
      <div className='gap-4 grid grid-cols-12 p-4'>
        <div className='xl:h-96 col-span-11 bg-white -translate-y-16 rounded-lg shadow-lg hidden md:block md:col-span-2 outline outline-gray-100'>
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
        <div className='col-span-11 outline outline-gray-100 bg-white rounded-lg shadow-lg md:col-span-6'>
          <div className='m-6 bg-slate-200 rounded-sm p-2 flex justify-between'>
            <div className='group cursor-pointer'>
              <div className='flex group-hover:-translate-y-1 transition-all duration-300 object-contain'>
                <Calender />
                <div className='ml-4 font-medium text-lg'>
                  Friday, 25 January 2025
                </div>
                <div className='ml-3 text-gray-500'>
                  <ChevronDown />
                </div>
              </div>
            </div>
            <div className='flex text-gray-500'>
              <div className='cursor-pointer group'>
                <div className="group-hover:-translate-y-1 transition-all duration-300 object-contain" >
                  <LeftArrow />
                </div>
              </div>
              <div className='cursor-pointer group'>
                <div className='group-hover:-translate-y-1 transition-all duration-300 object-contain'>
                  <RightArrow />
                </div>
              </div>
            </div>
          </div>
          <div className='flex ml-6 m-4'>
            <div className=''>
              <div className='text-xl font-medium'>
                11:30 AM
              </div>
              <div className='mt-1 text-gray-500 text-sm'>
                11.30 AM
              </div>
            </div>
            <div className='mx-4'>
              <div className='border-r-2 border-green-400'>
                <div className='h-12'>
                </div>
              </div>
            </div>
            <div className=''>
              <div className='flex'>
                <div className='pt-1 text-gray-500 text-sm mr-3'>
                  Live
                </div>
                <div className='text-red-500'>
                  <Camera />
                </div>
              </div>
              <div className='font-medium text-lg'>
                UX Webinar
              </div>
            </div>
          </div>
          <div className='ml-6 mr-6'>
            <div className='border-t-2 border-gray-300'>
            </div>
          </div>
                    <div className='flex ml-6 m-4'>
            <div className=''>
              <div className='text-xl font-medium'>
                11:30 AM
              </div>
              <div className='mt-1 text-gray-500 text-sm'>
                11.30 AM
              </div>
            </div>
            <div className='mx-4'>
              <div className='border-r-2 border-green-400'>
                <div className='h-12'>
                </div>
              </div>
            </div>
            <div className=''>
              <div className='flex'>
                <div className='pt-1 text-gray-500 font-medium text-sm mr-3'>
                  Upcoming
                </div>
                <div className='text-blue-500'>
                  <Camera />
                </div>
              </div>
              <div className='font-medium text-lg'>
                My First Webinar
              </div>
            </div>
          </div>
          <div className='ml-6 mr-6'>
            <div className='border-t-2 border-gray-300'>
            </div>
          </div>
                    <div className='flex ml-6 m-4'>
            <div className=''>
              <div className='text-xl font-medium'>
                11:30 AM
              </div>
              <div className='mt-1 text-gray-500 text-sm'>
                11.30 AM
              </div>
            </div>
            <div className='mx-4'>
              <div className='border-r-2 border-green-400'>
                <div className='h-12'>
                </div>
              </div>
            </div>
            <div className=''>
              <div className='flex'>
                <div className='pt-1 text-gray-500 font-medium text-sm mr-3'>
                  Upcoming
                </div>
                <div className='text-blue-500'>
                  <Camera />
                </div>
              </div>
              <div className='font-medium text-lg'>
                Developer Support
              </div>
            </div>
          </div>
          <div className='ml-6 mr-6'>
            <div className='border-t-2 border-gray-300'>
            </div>
          </div>
                    <div className='flex ml-6 m-4'>
            <div className=''>
              <div className='text-xl font-medium'>
                11:30 AM
              </div>
              <div className='mt-1 text-gray-500 text-sm'>
                11.30 AM
              </div>
            </div>
            <div className='mx-4'>
              <div className='border-r-2 border-green-400'>
                <div className='h-12'>
                </div>
              </div>
            </div>
            <div className=''>
              <div className='flex'>
                <div className='pt-1 text-gray-500 font-medium text-sm mr-3'>
                  Upcoming
                </div>
                <div className='text-blue-500'>
                  <Camera />
                </div>
              </div>
              <div className='font-medium text-lg'>
                Important Webinar
              </div>
            </div>
          </div>
        </div>
        <div className='h-56 col-span-11 bg-yellow-300 rounded-lg shadow-lg md:col-span-4'>
        </div>
      </div>
    </div>
  )
}
export default MainContent