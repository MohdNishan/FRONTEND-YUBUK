import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
    const navigate = useNavigate();


    const toLogin = () => {
        navigate('/login')
    }

  return (
    <div className='grid justify-items-center mt-32'>
        <img src='/Images/bookings.png' alt='' className='h-16'/>
        <h1 className='text-5xl font-bold text-green-800'>
            YUBUK
        </h1>
        <p className='font-bold text-xl mt-3'>
            Explore the nearby bookings
        </p>
        <div className='bg-gray-500 h-32 w-36 mr-24 mt-4'>
        <div className='bg-gray-300 h-32 w-36 ml-14 mt-7'></div>


        </div>
        <button onClick={toLogin} className='bg-blue-500 text-white mt-20 w-40 h-7 rounded-lg font-serif font-semibold'>Get Started</button>
    </div>
  )
}

export default Landingpage