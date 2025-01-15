import React from 'react'

function Landing() {
    return (
        <div className='h-screen bg-slate-200'>
            <div className='container w-3/4 mx-auto'>
                <div className='flex flex-col items-center'>
                    <button>
                        <img className='mt-10' src='https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_avif,q_auto/v1735193113/lzr1da9bphky3dihpohi.png?_upload_ref=ic_img_tool&__ar__=18.40' />
                    </button>
                    <div className='container m-10 inline-flex justify-between' >
                        <div className='left m-2'>
                            <div className='m-1 text-4xl font-semibold'>
                                Online coaching that delivers results
                            </div>
                            <div className='antialiased text-lg font-semibold text-gray-600 mt-14'>
                                Explore our online courses
                            </div>
                            
                            <div className='mt-5 inline-flex space-x-2'>
                                <button className='border-2 border-blue-700 rounded-3xl p-2 px-4 font-semibold hover:bg-gray-300'>
                                    NEET
                                </button>
                                <button className='border-2 border-blue-700 rounded-3xl p-2 px-4 font-semibold hover:bg-gray-300'>
                                    JEE
                                </button>
                                <button className='border-2 border-blue-700 rounded-3xl p-2 px-4 font-semibold hover:bg-gray-300'>
                                    Class 6-10
                                </button>
                                <button className='border-2 border-blue-700 rounded-3xl p-2 px-4 font-semibold hover:bg-gray-300'>
                                    CUET
                                </button>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='justify-items-end mr-32'>
                                <img className='size-2/3' src='https://res.cloudinary.com/dpzpn3dkw/image/upload/w_800,f_avif,q_auto/v1733911179/m6l4kbtrdldjtbbzuyrk.webp?_upload_ref=ic_img_tool&__ar__=1.78' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-14 container justify-items-start'>
                        <div className='text-3xl font-semibold'>Win up to 90% scholarship | ALLEN Online Scholarship Test (AOSAT)</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Landing