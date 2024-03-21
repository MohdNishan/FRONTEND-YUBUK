import React, { useState } from 'react';
import api from '../../api';

const UserProfile = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Mobile_Number, setMobileNumber] = useState('');
    const [Address, setAddress] = useState('');
    const [Date_of_Birth, setDOB] = useState('');
    const [created, setcreated] = useState(false);
    const [exist, setexist] = useState(false);
    
    
    const handlesubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post(
                '/user',
                {
                    Name,
                    Email,
                    Mobile_Number, 
                    Address,
                    Date_of_Birth
                }, 
            );
            setcreated(true)
            console.log(response);
        } catch (error) {
            console.error({ message: 'Error', error_message: error });
            setexist(true)
        }
    };

    return (
        <div>
            <h1>Create Your Profile</h1>
            <form onSubmit={handlesubmit}>
                <label>Name : </label>
                <input
                    type="text"     
                    placeholder="Enter your name"
                    value={Name}
                    onChange={(event) => setName(event.target.value)}
                />
                <br />
                <label>Email : </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={Email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <br />
                <label>Mobile Number : </label>
                <input
                    type="text"
                    placeholder="Enter your mobile number"
                    value={Mobile_Number}
                    onChange={(event) => setMobileNumber(event.target.value)}
                />
                <br />
                <label>Address : </label>
                <input
                    type="address"
                    placeholder="Enter your address"
                    value={Address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <br />
                <label>Date of Birth : </label>
                <input
                    type="text"
                    placeholder="Enter your DOB"
                    value={Date_of_Birth}
                    onChange={(event) => setDOB(event.target.value)}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {created && <i><p style={{ color: 'green' }}> "Profile Created" </p></i>}
            {exist && <i><p style={{ color: 'red' }}> "Profile Already Exist" </p></i>}

        </div>
    );
};

export default UserProfile;
