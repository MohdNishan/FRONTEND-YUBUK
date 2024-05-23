import React, { useState } from 'react';
import api from '../../api';
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Mobile_Number, setMobileNumber] = useState('');
    const [DP , setDP] = useState(null)
    const [Address, setAddress] = useState('');
    const [Date_of_Birth, setDOB] = useState('');
    const [created, setcreated] = useState(false);
    const [exist, setexist] = useState(false);
    const navigate = useNavigate()
    
    
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

            const response = await api.post('/user',formData
            ); 
            setcreated(true)
            console.log(response);
            navigate('/user/view')
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
        <div className='bg-rose-50 w-full h-full flex'>
        <div>
            <img src="/Images/unnamed.jpg" alt="" width="500px" className='rounded-r-3xl h-[500px] -ml-12 mt-20'/>
        </div>
        <div>
            <h1 className='font-semibold text-blue-950 text-xl mt-20 ml-10'>
                Create Your Profile
            </h1>
            <hr className='border-1 border-gray-400 w-[900px] mt-3 '/>
            <div className='flex mt-7 ml-10'>
        </div>
            <div>
                <form onSubmit={handlesubmit}>
                    <div className='flex ml-10 mt-9 text-blue-950'>
                        <div className='grid'>
                            <label className='font-semibold'>Name </label>
                            <input
                                type='text'
                                placeholder='Enter Your Name'
                                value={Name}
                                onChange={(event) => setName(event.target.value)}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                        <div className='grid ml-16'>
                            <label className='font-semibold'>Email  </label>
                            <div className='relative'>
                                <input
                                    type='email'
                                    placeholder='Enter Your Email'
                                    value={Email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1 pl-9'
                                />
                                <MdEmail className="absolute left-2 top-3 text-gray-400 pointer-events-none size-6" />
                                    
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-10 mt-5 text-blue-950'>
                        <div className='grid'>
                            <label className='font-semibold'> 
                                Mobile Number  
                            </label>
                            <input
                                type='text'
                                value={Mobile_Number}
                                onChange={(event) => setMobileNumber(event.target.value)}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                        <div className='grid ml-16'>
                            <label className='font-semibold'>Address  </label>
                            <input
                                type='address'
                                placeholder='Enter Your Address'
                                value={Address}
                                onChange={(event) => setAddress(event.target.value)}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                    </div>
                    <div className='flex ml-10 mt-5 text-blue-950'>
                        <div className='grid'>
                            <label className='font-semibold'>Date of Birth  </label>
                            <input
                                type='text'
                                value={Date_of_Birth}
                                placeholder='Enter Your DOB'
                                onChange={(event) => setDOB(event.target.value)}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                    </div>
                    <div className='grid ml-10 mt-5 text-blue-950'>
                    <label className='font-semibold'>DP : </label>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='w-52 mt-1'
                        />  
                    </div>
                    <div className='flex justify-end mr-36'>
                        <button type='submit' className='bg-blue-950 font-semibold text-sm h-9 w-36 text-white rounded-md hover:bg-sky-800 mt-1 '>Submit</button>
                    </div>
                </form>
                {created && <p className='text-green-800 italic'>{created}</p>}
                {exist && <p className='text-red-700 italic'>{exist}</p>}
            </div>
        </div>
    </div>
    );
};

export default UserProfile;