import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api';

const Verify = () => {
    const [OTP, setotp] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const no =  searchParams.get("no")
    const [invalidOTP, setInvalidOTP] = useState(false);
    const navigate = useNavigate();



    const handleresendotp = async (resend) => {
        resend.preventDefault();
        try {
            const response = await api.post('/login',{
                mobilenumber: no
            });
            const { token } = response.data
            localStorage.setItem('jwt_token', token)
        } catch(error){
            console.error({message :'Error', error_message : error});

        }   
    }


    const handlesubmit = async (verify) => {
        verify.preventDefault();
        try {
            const response = await api.post('/verify',{
                otp: OTP,
                mobilenumber: no
            });
            const { token } = response.data
            localStorage.setItem('jwt_token', token)
 
            setInvalidOTP(false);
            console.log(response)
            navigate('/user/view')
        } catch(error){
            console.error({message :'Error', error_message : error});

            setInvalidOTP(true);
        }   
    };

  return (
    <div className='mt-32 ml-32'>
        <img src='/Images/otp.png' alt='' className='h-32 ml-5' />
        <p className='font-serif text-lg mt-3 ml-5'>Enter the otp sent to <br></br> "+91-{no}"</p>
        <form onSubmit={handlesubmit}>
            <input 
                type='text' 
                placeholder='Enter your OTP'
                value={OTP}
                onChange={(v) => setotp (v.target.value)}
                className=' border border-black rounded-sm font-semibold mt-5 h-8 px-2'
            />
            <br/>
            <p className='font-normal -ml-3'>Didn't receive the OTP? <button onClick={handleresendotp} 
                className='underline mt-4 font-normal'>Resed OTP</button></p>
            <br/>
            <button className='bg-sky-500 h-7 w-48 text-white  rounded-md ml-3'>Verify and Proceed</button>
            {invalidOTP && <p className='text-red-700'>"Invalid OTP"</p>}
        </form>
    </div>
  )
}

export default Verify;
