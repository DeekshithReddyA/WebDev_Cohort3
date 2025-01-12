import React from 'react'
import { Link } from 'react-router-dom'
import {PhoneCall} from 'lucide-react'


function Navbar() {
  return (
    <>
    <div className=''>
        <div className='flex justify-between pl-36 pr-48'>
            <div className="m-6 flex justify-evenly space-x-10">
                <div>
                <Link to="/" >
                <img className='h-7 w-22' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/ALLEN_Career_Institute_logo.svg/2560px-ALLEN_Career_Institute_logo.svg.png' />
                </Link>
                </div>
                <div className='pt-0.5'>

                <Link to="/courses" >Courses</Link>
                </div>
                <div className='pt-0.5'>
                    <Link to='/test-series'>Test Series</Link>
                </div>
                                <div className='pt-0.5'>
                    <Link to='/scholarships'>Scholarships</Link>
                </div>
                                <div className='pt-0.5'>
                    <Link to='/results'>Results</Link>
                </div>
                                <div className='pt-0.5'>
                    <Link to='/study-materials'>Study Materials</Link>
                </div>
                                <div className='pt-0.5'>
                    <Link to='/about-us'>About Us</Link>
                </div>
            </div>
            <div className='m-4 flex justify-evenly space-x-4'>
                <Link to="/talk-to-us">
                    <button className='pl-4 pr-4 pt-2.5 pb-2.5 text-white box-border rounded-full bg-blue-600 hover:bg-blue-700 inline-flex space-x-2 hover:text-gray-200 hover:bg-blue-700'>
                        <PhoneCall className='mt-0.5 h-4 w-4 font-medium'/>
                        <div className='text-sm font-medium'>Talk to us</div>
                    </button>
                </Link>
                <Link to="/login">
                    <button className='pl-4 pr-4 pt-2 pb-2 box-border border-2 border-blue-600 rounded-full hover:bg-gray-300 text-sm font-medium'>Login</button>
                </Link>
            </div>
        </div>

    </div>
        </>
  )
}

export default Navbar