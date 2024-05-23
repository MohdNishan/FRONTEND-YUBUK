import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ImProfile } from "react-icons/im";
import { FaAngleRight } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { IoBusiness } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { LoginSignout } from '../calendar';


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

    const handleSignout = () => {
        navigate('/login')
    }

    const bookbusiness = () => {
        navigate(`/user/business/view`)
    }

    return (
        <div className='md:flex'>
            <div className='bg-white h-full w-96'>
                <h1 className='text-4xl font-bold ml-28 mt-16'>
                    YJ
                </h1>
                <div className='mt-24 bg-gray-300 flex h-20 rounded-r-full'>
                    <ImProfile className='ml-6 mt-7 text-2xl'/> 
                    <p className='ml-4 mt-7 font-semibold text-xl font-serif'> My Profile</p>
                    <div className='size-16 bg-white rounded-full ml-[57px] mt-2'>
                    <FaAngleRight className='text-2xl mt-5 ml-5'/>
                    </div>
                </div>
                <div className='mt-4 flex h-20'>
                    <FaUserEdit className='ml-6 mt-7 text-2xl'/> 
                    <a href="" onClick={handleEdit} className='ml-4 mt-7 font-medium text-xl font-serif'> Edit Profile</a>
                    <div className='size-16 bg-white rounded-full ml-10 mt-2'>
                    <FaAngleRight className='text-2xl mt-5 ml-10'/>
                    </div>
                </div>
                <div className=' flex h-20'>
                    <IoBusiness className='ml-6 mt-7 text-2xl'/> 
                    <a href="" onClick={handlebusiness} className='ml-5 mt-7 font-medium text-xl font-serif'> My Business</a>
                    <div className='size-16 bg-white rounded-full ml-10 mt-2'>
                    <FaAngleRight className='text-2xl mt-5 ml-6'/>
                    </div>
                </div>
                <button className='border border-black flex h-14 w-44 mt-14 ml-10 text-xl rounded-2xl justify-evenly items-center font-serif' onClick={handleSignout}>
                    Sign Out 
                    <PiSignOut className='text-3xl font-'/>
                </button>
            </div>
            <div className='bg-rose-50 w-full ml-2 h-screen'>
            <div className='bg-white w-full h-12 border-b-2'></div>
                <h1 className='font-semibold text-blue-950 text-xl mt-12 ml-10'>
                    User Profile
                </h1>
                <hr className=' border-1 border-gray-400 mt-2 ml-7 w-32'/>
                {!profileData && <p className='text-base font-semibold text-blue-950 mt-5 ml-5 italic'>"You seems to be new to the platform"</p>}
                {profileData && 
                <>
                <div className='flex mt-10 ml-10'>
                    <img src={profileData?.DP} alt='DP' width="100px" className='rounded-full border-[6px] border-white'/>
                    <div className='ml-6 mt-7 text-blue-950'>
                        {profileData && <p className='text-3xl font-serif font-semibold'>{profileData.Name}</p>}
                        {profileData && <p className='text-lg'>+91-{profileData.Mobile_Number}</p>}
                    </div>
                </div>
                <hr className='border-1 border-gray-400 w-[1020px] mt-10 ml-7'/>
                <div className='ml-14 mt-10'>
                    <table className='text-sm font-semibold text-blue-950'>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td className='font-extrabold profile-td'>:</td>
                                <td className='profile-td'>{profileData?.Email}</td>
                            </tr>
                            <tr>
                                <td>Date of birth</td>
                                <td className='font-extrabold profile-td'>:</td>
                                <td className='profile-td'>{profileData?.Date_of_Birth}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td className='font-extrabold profile-td'>:</td>
                                <td className='profile-td'>{profileData?.Address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button onClick={handleEdit} className='mt-4 ml-14 bg-blue-950 text-white font-semibold h-8 w-36 rounded-lg'>
                    Edit Profile
                </button>
                </>}
                {!profileData && <button onClick={handleCreate}  className=' ml-8 bg-blue-950 text-white text-sm h-8 w-36 font-semibold rounded-lg mt-5'>
                    Create Your Profile
                </button>}
                <br/>
                { profileData && 
                <button onClick={bookbusiness} className='ml-14 bg-green-700 text-white text-sm h-8 w-36 font-semibold rounded-lg mt-3'>
                    Book a Business
                </button>}
                {/* <LoginSignout/> */}
            </div>
        </div>
    );
};

export default Userprofileview;
