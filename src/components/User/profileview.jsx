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
            <h1>User Profile</h1>
            {error && <p>{error}</p>}
            {!profileData && <p>User Not found</p>}
            {profileData && ( 
                <div>
                    <p>Name : {profileData.Name}</p>
                    <p>Email : {profileData.Email}</p>
                    <p>Mobile Number : {profileData.Mobile_Number}</p>
                    <p>Address : {profileData.Address}</p>
                    <p>Date of Birth : {profileData.Date_of_Birth}</p>
                </div>
            )}
            {profileData && <button onClick={handleEdit}>Edit Profile</button>}
            {!profileData && <button onClick={handleCreate}>Create Profile</button>}
            {profileData && <button onClick={handlebusiness}>View My Business</button>}
        </div>
    );
};

export default Userprofileview;
