import React, { useState } from 'react';
import api from '../../api';

const UserProfile = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Mobile_Number, setMobileNumber] = useState('');
    const [DP , setDP] = useState(null)
    const [Address, setAddress] = useState('');
    const [Date_of_Birth, setDOB] = useState('');
    const [created, setcreated] = useState(false);
    const [exist, setexist] = useState(false);
    
    
    const handlesubmit = async (event) => {
        event.preventDefault();
        try {

            const formData = new FormData();
            formData.append('Name', Name)
            formData.append('Email', Email)
            formData.append('Mobile_Number', Mobile_Number)
            formData.append('DP', DP)
            formData.append('Address', Address)
            formData.append('Date_of_Birth', Date_of_Birth)

            const response = await api.post('/user',formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            );
            setcreated(true)
            console.log(response);
        } catch (error) {
            console.error({ message: 'Error', error_message: error });
            setexist(true)
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setDP(file)
    }

    return (
        <div className='w-80'>
            <h1 className='text-2xl font-serif font-semibold'>Create Your Profile</h1>
            <form onSubmit={handlesubmit}>
                <div className='flex justify-between'>
                <label>Name : </label>
                <input
                    type="text"     
                    placeholder="Enter your name"
                    value={Name}
                    onChange={(event) => setName(event.target.value)}
                    className='border-2 border-gray-400 rounded-sm'
                />
                </div>
                <div className='flex justify-between'>
                <label>Email : </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={Email}
                    onChange={(event) => setEmail(event.target.value)}
                    className='border-2 border-gray-400 rounded-sm mt-1'
                />
                </div>
                <div className='flex justify-between'>
                <label>Mobile Number : </label>
                <input
                    type="text"
                    placeholder="Enter mobile number"
                    value={Mobile_Number}
                    onChange={(event) => setMobileNumber(event.target.value)}
                    className='border-2 border-gray-400 rounded-sm mt-1'
                />
                </div>
                <div className='flex justify-between'>
                <label>DP : </label>
                <input
                    type="file"
                    accept='image/*'
                    onChange={handleImageChange}
                    className='w-52 mt-1'
                />
                </div>
                <div className='flex justify-between'>
                <label>Address : </label>
                <input
                    type="address"  
                    placeholder="Enter your address"
                    value={Address}
                    onChange={(event) => setAddress(event.target.value)}
                    className='border-2 border-gray-400 rounded-sm mt-1'
                />
                </div>
                <div className='flex justify-between'>
                <label>Date of Birth : </label>
                <input
                    type="text"
                    placeholder="Enter your DOB"
                    value={Date_of_Birth}
                    onChange={(event) => setDOB(event.target.value)}
                    className='border-2 border-gray-400 rounded-sm mt-1'
                />
                </div>
                <button type="submit" className='bg-purple-800 rounded-md text-white h-7 w-20 mt-1'>Submit</button>
            </form>
            {created && <i><p className='text-green-500'> "Profile Created" </p></i>}
            {exist && <i><p className='text-red-700'> "Profile Already Exist" </p></i>}

        </div>
    );
};

export default UserProfile;
