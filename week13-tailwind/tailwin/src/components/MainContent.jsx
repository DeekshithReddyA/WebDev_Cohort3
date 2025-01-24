import React from 'react'
import { CalendarDateRange, Calender } from './icons/Calender'
import { ChevronDown } from './icons/ChevronDown'
import { LeftArrow, RightArrow } from './icons/Arrows'
import { Camera } from './icons/Camera'

function MainContent({ sidebarOpen }) {
  return (
    <div className='w-full'>
      <img className='h-32 w-full object-cover hidden md:block' src='https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg' />
      <div className='gap-10 grid grid-cols-11 p-4'>
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
        <div className='h-36 col-span-11 outline outline-gray-100 rounded-lg shadow-lg md:col-span-3 md:h-72'>
          <div className='grid grid-cols-6 mt-6'>
            <div className='flex-col justify-items-center md:col-start-1 md:col-span-3 col-span-2 group cursor-pointer'>
            <div className='rounded-lg bg-green-1000 h-16 w-16 flex justify-center group-hover:-translate-y-1 transition-all duration-300 object-contain' >
              <div className='pt-4'>
                <img className='h-8 w-8' src='https://media-hosting.imagekit.io//39a7f17e6d834830/calendar-clock.png?Expires=1832336208&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=rb~WFDA1mfCWeXZP~alYuZYl40gd8Hdqf~mb7BBce13C8W3dRdpPTIVTrzvaSOY8lXj6uh3J8ZYOPQQ4SGqgduwH05pfEsZ9xq00Rfbc5b4EQJmYXqwtnMKY0QV6FW99qPZeQY1cYEBx4utwMt8aQ4XBNPL08aYpTddBRTQpKGMf7zXiqJq1gtCT2D3dsARMCO2raFGpC4II9g31HEJ1USjenNAdG6c0pvVp8HG1YkFUGSv-Ym9c2OuHDxfESkjkJNegJm4-03dpcN91-ksj1GlPWVO57FErAL0pVxUxYHvf4IsQnYUjUIkHXbUcqv-VoEZdK9pWkhy~70FPS1U6VA__' />
              </div>
            </div>
            <div className='font-medium text-sm mt-2'>
              Schedule a Webinar
            </div>
            </div>
            <div className='flex-col justify-items-center md:col-span-3 col-span-2 group cursor-pointer'>
            <div className='rounded-lg bg-green-1000 h-16 w-16 flex justify-center group-hover:-translate-y-1 transition-all duration-300 object-contain' >
              <div className='p-4'>
                <img className='h-8 w-8' src='https://media-hosting.imagekit.io//7deba6e5633140ab/plus.png?Expires=1832336418&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DRD-oOuqFXOQPDRZ4n2VVyjJlDwpn9Ab4uqzJ57kchIOFkVfzY9tCEKuIlitbxuTnmNixq-qLwpv8LcR~MobxqNVAaDdpsIaJSa8Tar2LoEJcAWP9ZzhqpdP2jJM4HtQNYgkCcoCTuz7Kv1RWbTdxKdCx64FxC4zFPDd0yeZjq8jm5NKw4zAS7QhqO-XScOWHEavfNfoMx9eiJsZK9HIW7vt5z1KH981hnFcElkhunQDdHvQaoi8ZC~cyWF8O04rjOFpYg4FKh9QHkl~BECvqo3qPw4z6NVO2KhXAsy9AZZ~e2Ko~4tX~C8qRS4WM0G~XZkywRZou~Dr4xBxIRMv9A__' />
              </div>
            </div>
            <div className='font-medium text-sm mt-2'>
              Join a Webinar
            </div>
            </div>
              <div className='flex-col md:mt-8 justify-items-center md:col-start-1 md:col-span-3 col-span-2 group cursor-pointer'>
            <div className='rounded-lg bg-green-1000 h-16 w-16 flex justify-center group-hover:-translate-y-1 transition-all duration-300 object-contain' >
              <div className='pt-4'>
                <img className='h-8 w-8' src='https://media-hosting.imagekit.io//3164a11c75224047/archive.png?Expires=1832337232&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=JTYqJZxKBHR6v~EBYi~KzMB2TVaSi1Ltn0sMp~V-lMxaV9IpA4yVNhGQq0QYnt-6dEgxavvW~isYfaK6ISahivqxubwnP5h2JW0ZSgz5oOkbcqlcAOqbwmrZkDu0o-z5M6nyblCHu1A47UUAPMTCypDZ10Ym8NdVcztl9u6dYqvAfyRwv48i8wYFUCv5sYuXfR7SoG3GZI1mvpZqSRw~LSA2Jvc11OS2Kw7IvaAWUdnt4bDIWhNnS6Lre9VDwDXOXJHfnx4PfjFO7Iy9EMTnzFNeLVuFSQlZ3WjZlKnVxk0qqzjcfGDqGncUcrALff2aunxKAUsxhCO5cwR~JGM6zg__' />
              </div>
            </div>
            <div className='font-medium text-sm mt-2'>
              Open Recordings
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
export default MainContent