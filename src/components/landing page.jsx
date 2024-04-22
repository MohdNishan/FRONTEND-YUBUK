import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
    const navigate = useNavigate();


    const toLogin = () => {
        navigate('/login')
    }

  return (
    <div>
        <p className='text-2xl font-bold font-serif ml-4 mt-5'>YUBUK</p>
        <div className='flex'>
        <div className='mt-28 '>
            <h1 className='text-5xl font-serif ml-9 leading-tight'>
                Explore the nearby <br></br> bookings with <br></br> YUBUK
            </h1>
            <p className='mt-5 ml-9 font-serif leading-7'>
            Welcome to YUBUK - your gateway to a seamless booking experience across a <br></br> diverse range of businesses! Explore our intuitive platform designed to streamline <br></br> your reservation process for various services and appointments.
            </p>
            <div className='flex'>
            <button onClick={toLogin} className='bg-black font-serif text-white w-40 ml-9 mt-9 h-9 rounded-2xl'>
                Get Stared
                <div className='bg-white '>

                </div>
            </button>
            </div>
        </div>
        <div className='grid justify-end ml-28 mt-16'>
            <img src='/Images/landing image.webp' alt='' width="620px" className='rounded-2xl'/>
        </div>
        </div>
    </div>
  )
}

export default Landingpage