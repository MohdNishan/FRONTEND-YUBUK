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
        <div className='text-center border h-screen flex flex-col justify-center items-center'>
            <h1 className=' text-3xl font-mono font-semibold'>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={mobile_number}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Mobile Number"
                    className=' border-2 border-black rounded-sm font-semibold mt-5 h-8 px-2'
                />
                
                <br />
                <button type="submit" className="bg-purple-800 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-lg mt-5">Generate OTP</button>
            </form>
            {otpSent && <p>OTP Sent successfully</p>}
        </div>
    );
};
 
export default Login;
