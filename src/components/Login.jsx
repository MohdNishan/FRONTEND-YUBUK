import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
    const [mobile_number, setMobileNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        if ( !mobile_number || mobile_number.length < 10 ) {
            return alert("Enter a valid mobile number")
        }
        e.preventDefault();
        try {
            const response = await api.post('/login', {
                mobilenumber: mobile_number 
            });
            console.log("//",response);
            setOtpSent(true);
            navigate(`/verify?no=${mobile_number}`);
        } catch (error) {
            console.error({ message: 'Error:', error_message: error });
        }
    };

    return (
        <div className='flex'>
            <div className='ml-44'>
            <p className='mt-72 text-gray-600'>
                Welcome! Please login to your account
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={mobile_number}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Mobile No."
                    className=' border-2 border-gray-500 rounded-sm font-semibold mt-14 h-8 px-3 w-64'
                />
                <br />
                <button type="submit" className="bg-sky-500 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-lg mt-8 ml-14">Generate OTP</button>
            </form>
            </div>
            <div className='ml-80 '>
                <img src="/Images/login.jpg" alt="" width="655px"/>
            </div>
            {otpSent && <p>OTP Sent successfully</p>}
        </div>
    );
};
 
export default Login;