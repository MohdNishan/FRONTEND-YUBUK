import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api';

const Verify = () => {
    const [OTP, setotp] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const no =  searchParams.get("no")
    const [invalidOTP, setInvalidOTP] = useState(false);
    const navigate = useNavigate();

    const handlesubmit = async (v) => {
        v.preventDefault();
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
    <div>
        <h1>
            Verify
        </h1>
        <p> <i>Enter the otp sent "{no}"</i> </p>
        <form onSubmit={handlesubmit}>
            <input 
                type='text'
                placeholder='Enter your OTP'
                value={OTP}
                onChange={(v) => setotp (v.target.value)}
            />
            <br/>
            <button>Verify OTP</button>
            {invalidOTP && <p style={{ color: 'red' }}>Invalid OTP</p>}
        </form>
    </div>
  ) 
}

export default Verify;
