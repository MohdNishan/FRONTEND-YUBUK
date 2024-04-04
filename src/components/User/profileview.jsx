import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Userprofileview = () => {
    const [profileData, setProfileData] = useState();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/authme');  
                if(!response.data.message){
                    setProfileData(response.data[0]);
                }
                console.log(response)
            } catch (error) {
                setError(error.message);
            }  
            
        };
        fetchUserProfile();
    },[]);

    const handleEdit = () => {
        navigate('/user/edit');
    };

    const handleCreate = () => {
        navigate("/user/create")
    }
        

    const handlebusiness = () => {
        navigate(`/business/list/${profileData.id}`)
    }

    return (
        <div className= 'fill-inherit'>
            <h1 className='text-5xl font-bold font-serif mt-16 ml-7'>My Account</h1>
                <div className= 'grid justify-end'>
                    <div className='bg-amber-900 mr-7 h-11 rounded-full'>
                        <img src={profileData?.DP} alt='DP'/>
                    </div>
                </div>
            {/* {error && <p>{error}</p>} */}
            {!profileData && <p className='text-lg font-semibold'>User Not found</p>}
            {profileData && (
                <div className='grid justify-center mt-28 font-serif font-semibold text-xl gap-2'>
                    <p>Name : {profileData.Name}</p>
                    <p>Email : {profileData.Email}</p>
                    <p>Mobile Number : {profileData.Mobile_Number}</p>
                    <p>Address : {profileData.Address}</p>
                    <p>Date of Birth : {profileData.Date_of_Birth}</p>
                </div>
            )}
            <div className='flex justify-center mt-2'>
                {profileData && <button onClick={handleEdit} className="bg-purple-800 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-md mt-2">Edit Profile</button>}
                {profileData && <button onClick={handlebusiness} className="bg-purple-800 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-md mt-2 ml-1">View My Business</button>}
            </div>
            <div className='flex justify-center'>
                {profileData && <button onClick={handlebusiness} className="bg-purple-800 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-md mt-2 ml-1 w-52">Book a Business </button>}
            </div>
                {!profileData && <button onClick={handleCreate} className="bg-purple-800 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-md mt-2">Create Profile</button>}
        </div>
    );
};

export default Userprofileview;
