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
    <div className='text-center border h-screen flex flex-col justify-center items-center'>
        <h1 className='font-sans font-bold text-2xl'>
            OTP Verification
        </h1>
        <p className='font-sans font-semibold text-lg mt-3 italic'>Enter the otp sent to "{no}"</p>
        <form onSubmit={handlesubmit}>
            <input 
                type='text' 
                placeholder='Enter your OTP'
                value={OTP}
                onChange={(v) => setotp (v.target.value)}
                className=' border border-black rounded-sm font-semibold mt-5 h-8 px-2'
            />
            <br/>
            <p className='font-semibold'>Didn't receive the OTP? <button onClick={handleresendotp} 
                className='underline text-red-600 mt-4 font-semibold'>Resed OTP</button></p>
            <br/>
            <button className='bg-purple-800 h-9 w-56 text-white font-semibold'>Verify and Proceed</button>
            {invalidOTP && <p className='text-red-700'>"Invalid OTP"</p>}
        </form>
    </div>
  ) 
}

export default Verify;
