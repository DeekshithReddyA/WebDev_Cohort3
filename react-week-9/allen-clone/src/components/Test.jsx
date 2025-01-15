import React from 'react'

function Landing() {
  return (
    <div className='h-screen bg-slate-200'>
        <div className='flex justify-center'>
            <img className='mt-5 size-3/4' src='https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_avif,q_auto/v1735193113/lzr1da9bphky3dihpohi.png?_upload_ref=ic_img_tool&__ar__=18.40' />
        </div>
        <div className='flex justify-center'>
            <div className='inline-flex' >
            <div className='mt-20'>
                <div className='text-3xl font-semibold'>
                    Online coaching that delivers
                </div>
                <div className="text-3xl font-semibold">results</div>
                <div className='mt-10'>
                    Explore our online courses
                </div>
            </div>
            <div className='mt-20'>
                <div>
                    photos
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}