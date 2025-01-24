import React from 'react'
import { SidebarToggle } from './icons/SidebarToggle'
import { Computer } from './icons/Computer';
import { Home } from './icons/Home';
import { UserGroup } from './icons/UserGroup';
import { CreditCard } from './icons/CreditCard';
import { UserManagement } from './icons/UserManagement';
import { Settings } from './icons/Settings';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`${sidebarOpen ? 'md:w-80 w-64 absolute' : 'w-14'} bg-white outline outline-gray-200 transition-all duration-300 h-screen md:relative`}>
      <div className='flex justify-between m-4'>
        <div className='group cursor-pointer' onClick={() => {
          setSidebarOpen(val => !val);
        }}>
          <div className='group-hover:-translate-y-1 transition-all duration-300 object-contain pt-1'>
            <SidebarToggle />
          </div>
        </div>
        <div className={`${sidebarOpen ? 'visible' : 'invisible'} transiton-all delay-100`}>
          <div className='bg-blue-1000 ml-6 p-1 rounded-lg shadow-lg'>
            <div className='flex justify-between'>
              <div className='text-white'>
                <Computer />
              </div>
              <div className='pl-1 font-semibold text-white text-lg'>Webinar</div>
              <div className='text-lg text-white text-green-1000 font-semibold'>.gg</div>
            </div>
          </div>
        </div>
        <div className='ml-6 h-9 w-10'>

         <img className='rounded rounded-full size-fit' src='https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg' />
        </div>
      </div>
      <div className='mt-12 mr-4 ml-2 group cursor-pointer'>
          <div className={`flex justify-between hover:bg-slate-200 p-1 py-2 hover:rounded-lg group-hover:-translate-y-1 transition-all duration-300 object-contain`}>
            <div className={`${sidebarOpen ? 'visible' : 'hidden'}`}>
              Home
            </div>
            <div>
              <Home />
            </div>
          </div>
      </div>
            <div className='mt-4 mr-4 ml-2 group cursor-pointer'>
          <div className={`flex justify-between hover:bg-slate-200 p-1 py-2 hover:rounded-lg group-hover:-translate-y-1 transition-all duration-300 object-contain`}>
            <div className={`${sidebarOpen ? 'visible' : 'hidden'}`}>
              Webinars
            </div>
            <div>
              <UserGroup />
            </div>
          </div>
      </div>
            <div className='mt-4 mr-4 ml-2 group cursor-pointer'>
          <div className={`flex justify-between hover:bg-slate-200 p-1 py-2 hover:rounded-lg group-hover:-translate-y-1 transition-all duration-300 object-contain`}>
            <div className={`${sidebarOpen ? 'visible' : 'hidden'}`}>
              Billing
            </div>
            <div>
              <CreditCard />
            </div>
          </div>
      </div>
            <div className='mt-4 mr-4 ml-2 group cursor-pointer'>
          <div className={`flex justify-between hover:bg-slate-200 p-1 py-2 hover:rounded-lg group-hover:-translate-y-1 transition-all duration-300 object-contain`}>
            <div className={`${sidebarOpen ? 'visible' : 'hidden'}`}>
              User Management
            </div>
            <div>
              <UserManagement />
            </div>
          </div>
      </div>
            <div className='mt-4 mr-4 ml-2 group cursor-pointer'>
          <div className={`flex justify-between hover:bg-slate-200 p-1 py-2 hover:rounded-lg group-hover:-translate-y-1 transition-all duration-300 object-contain`}>
            <div className={`${sidebarOpen ? 'visible' : 'hidden'}`}>
              Settings
            </div>
            <div>
              <Settings />
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default Sidebar