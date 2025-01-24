import React from 'react'
import { Button } from './Buttons'

function Landing() {
    const handleOnClick = () => {
        console.log("clicked");
    }
  return (
    <div className='h-screen bg-blue-1000'>
        <div className='flex flex-col items-center'>
            <div className='m-4'>
                Webinar
            </div>
            <div>
               Verify Your Age 
            </div>
            <div>
                Please confirm your birth year. This data will not be stored.
            </div>
            <div>
            <input placeholder='Your Birth Year'>
            </input>
            </div>
            <div>
                <Button disabled={true} children={"Confirm"} onClick={handleOnClick}/>
            </div>
        </div>
    </div>
  )
}

export default Landing