import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api';
import OtpInput from 'react-otp-input';

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
    <div className='grid grid-cols-2'>
        <div className='mt-32 ml-52'>
            <img src='/Images/otp.png' alt='' className='h-40 ml-3' />
            <p className='font-serif text-lg mt-3 ml-5'>Enter the otp sent to <br></br> "+91-{no}"</p>
            <form onSubmit={handlesubmit}>
            <div className='mt-5'>           
            <OtpInput
                value={OTP}
                onChange={setotp}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} 
                style={{width:"28px"}}
                className='border border-gray-400 bg-gray-300 rounded-md h-10 ml-1.5 text-center'
                />}
            />
            </div>
                <br/>
                <p className='font-normal mt-4'>Didn't receive the OTP? <button onClick={handleresendotp} 
                    className='underline font-normal'>Resed OTP</button></p>
                <br/>
                <button className='bg-sky-500 h-7 w-48 text-white  rounded-md ml-3'>Verify and Proceed</button>
                {invalidOTP && <p className='text-red-700'>"Invalid OTP"</p>}
            </form>
        </div>
        <div className='ml-12'> 
            <img src="/Images/verify.jpg" alt="" width="660px"/>
        </div>
    </div>
  )
}

export default Verify;