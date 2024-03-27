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
        <div>
            <h1 className='text-2xl font-bold font-serif'>My Account</h1>
            {/* {error && <p>{error}</p>} */}
            {!profileData && <p>User Not found</p>}
            {profileData && ( 
                <div>
                    <p>Name : {profileData.Name}</p>
                    <p>Email : {profileData.Email}</p>
                    <p>Mobile Number : {profileData.Mobile_Number}</p>
                    <p>Address : {profileData.Address}</p>
                    <p>Date of Birth : {profileData.Date_of_Birth}</p>
                    {/* {!profileData.DP && <img src={profileData.DP} alt='DP'/>} */}
                </div>
            )}
            {profileData && <button onClick={handleEdit} className="bg-purple-800 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-md mt-2">Edit Profile</button>}
            {!profileData && <button onClick={handleCreate} className="bg-purple-800 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-md mt-2">Create Profile</button>}
            {profileData && <button onClick={handlebusiness} className="bg-purple-800 px-4 py-2 text-white hover:bg-sky-800 sm:px-5 sm:py-1 rounded-md mt-2 ml-1">View My Business</button>}
        </div>
    );
};

export default Userprofileview;
