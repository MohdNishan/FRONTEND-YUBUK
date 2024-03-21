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
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Mobile Number : </label>
                <input
                    type="text"
                    value={mobile_number}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                />
                <br />
                <br />
                <button type="submit">Generate OTP</button>
            </form>
            {otpSent && <p>OTP Sent successfully</p>}
        </div>
    );
};
 
export default Login;
