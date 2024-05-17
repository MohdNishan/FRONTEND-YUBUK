import React, { useEffect, useState } from 'react'
import api from '../../api';
import {useNavigate} from 'react-router-dom';
import { ImProfile } from "react-icons/im";
import { FaAngleRight } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { IoBusiness } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import Profileview from '../Business/businessview';

const Userprofileedit = () => {

    const [userdata, setuserdata] = useState({
        Name: '',
        Email: '',
        Address: '',
        Date_of_Birth: ''
    })
    const [updatesuccess, setupdatesuccess] = useState(false);
    const [updatefail, setupdatefail] = useState(false);
    const [profileData, setProfileData] = useState();
    const navigate = useNavigate();


        const [DP, setDP] = useState(null);
    

        const handleImageChange = (event) => {
            const file = event.target.files[0];
            setDP(file);
        }
        const   handleButtonClick = () => {
            const fileInput = document.getElementById('fileInput');
            fileInput.click();
        };
    

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

    useEffect (() => {
        fetchUserProfile()
    },[])

    const fetchUserProfile = async () => {
        try {
            const response = await api.get('/authme')
            setuserdata(response.data[0]);
            console.log(response)
        }
        catch (error) {
            console.error(error)    
        }
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{

            const formData = new FormData()
            formData.append('Name', userdata.Name)
            formData.append('Address', userdata.Address)
            formData.append('Email', userdata.Email)
            formData.append('Date_of_Birth', userdata.Date_of_Birth)
            formData.append('DP', DP)

            const response = await api.put('/user',formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            setupdatesuccess(true)
            setupdatefail(false)
            console.log(response);
            navigate('/user/view')
        }  catch (error) {
            console.error({ message: 'Error', error_message: error });
            setupdatesuccess(false)
            setupdatefail(true)
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setuserdata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignout = () => {
        navigate('/login')
    }

    const handleView = () => {
        navigate('/user/view')
    }

    const handlebusiness = () => {
        navigate(`/business/list/${profileData.id}`)
    }

  return (
    <div className='flex'>
            <div className='bg-white h-full w-96'>
                <h1 className='text-4xl font-bold ml-28 mt-16'>
                    YJ
                </h1>
                <div className='mt-24 flex h-20'>
                    <ImProfile className='ml-6 mt-7 text-2xl'/> 
                    <a href="" onClick={handleView} className='ml-4 mt-7 font-normal text-xl font-serif'> My Profile </a>
                    <div className='size-16 bg-white rounded-full ml-[72px] mt-2'>
                    <FaAngleRight className='text-2xl mt-5 ml-5'/>
                    </div>
                </div>
                <div className='mt-3 flex h-20 bg-gray-300 rounded-r-full'>
                    <FaUserEdit className='ml-6 mt-7 text-2xl'/> 
                    <a href="" className='ml-3 mt-7 font-semibold text-xl font-serif'> Edit Profile</a>
                    <div className='size-16 bg-white rounded-full ml-12 mt-2'>
                    <FaAngleRight className='text-2xl mt-5 ml-5'/>
                    </div>
                </div>
                <div className=' flex h-20'>
                    <IoBusiness className='ml-6 mt-7 text-2xl'/> 
                    <a href="" onClick={handlebusiness} className='ml-5 mt-7 font-medium text-xl font-serif'>My Business</a>
                    <div className='size-16 bg-white rounded-full ml-10 mt-2'>
                    <FaAngleRight className='text-2xl mt-5 ml-6'/>
                    </div>
                </div>
                <button className='border border-black flex h-14 w-44 mt-14 ml-10 text-xl rounded-2xl justify-evenly items-center font-serif' onClick={handleSignout}>
                    Sign Out
                    <PiSignOut  className='text-3xl font-'/>
                </button>
            </div>
            <div className='bg-rose-50 w-full ml-2 h-screen'>
                <div className='bg-white w-full h-12 border-b-2'></div>
                    <h1 className='font-semibold text-blue-950 text-xl mt-12 ml-10'>
                        Edit Profile
                    </h1>
                    <hr className=' border-1 border-gray-400 mt-2 ml-7 w-32'/>
                    <div className='flex mt-10 ml-10'>
                        <img src={profileData?.DP} alt='DP' width="100px" className='rounded-full border-[6px] border-white'/>
                        <div className='ml-6 mt-7 text-blue-950 flex'>
                            <div>
                                {profileData && <p className='text-3xl font-serif font-semibold'>{profileData.Name}</p>}
                                {profileData && <p className='text-lg'>+91-{profileData.Mobile_Number}</p>}
                            </div>
                            <input
                                type='file'
                                id='fileInput'
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                className='w-52 mt-1'
                            />  
                            <button onClick={handleButtonClick} className='mt-4 ml-44 bg-blue-950 text-white text-sm font-semibold h-11 w-44 rounded-lg '>Upload New Photo</button>
                            {DP && <p className='mt-5'>{DP.name}</p>}
                        </div>
                    </div>
                <hr className='border-1 border-gray-400 w-[1020px] mt-10 ml-7'/>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex ml-10 mt-10 text-blue-950'>
                            <div className='grid'>
                                <label className='font-bold'>Full Name </label>
                                <input
                                    type="text" 
                                    name='Name'
                                    value={userdata.Name || ''}
                                    onChange={handleChange}
                                    className='border-2 border-gray-400 rounded-lg h-11 w-96 p-3 mt-4'
                                />
                            </div>
                            <div className='grid ml-16'>
                                <label className='font-bold'>Address </label>
                                <input
                                    type="text" 
                                    name='Address'
                                    value={userdata.Address || ''}
                                    onChange={handleChange}
                                    className='border-2 border-gray-400 rounded-lg h-11 w-96 p-3 mt-4'
                                />
                            </div>
                        </div>
                        <div className='flex ml-10 mt-7 text-blue-950'>
                            <div className='grid'>
                                <label className='font-bold'>Email </label>
                                <div className='relative'>
                                <input
                                    type="text"
                                    name='Email'
                                    value={userdata.Email || ''}
                                    onChange={handleChange}
                                    className='border-2 border-gray-400 rounded-lg h-11 w-96 p-3 mt-4 pl-9'
                                />
                                <MdEmail className="absolute left-2 top-6 text-gray-400 pointer-events-none size-7" />
                                </div>
                            </div>
                            <div className='grid ml-16'>
                                <label className='font-bold'>Date of birth </label>
                                <input
                                    type="text" 
                                    name='Date_of_Birth'
                                    value={userdata.Date_of_Birth || ''}
                                    onChange={handleChange}
                                    className='border-2 border-gray-400 rounded-lg h-11 w-96 p-3 mt-4'
                                />
                            </div>
                        </div>
                        <div className='font-semibold flex justify-center mt-8 ml-72'>
                            <button onClick={handleView} className='bg-white text-blue-950 text-sm h-10 w-36 rounded-lg border-2 border-blue-950'>
                                Cancel
                            </button>
                            <button type='submit' className=' ml-8 bg-blue-950 text-white text-sm h-10 w-36 rounded-lg'>
                                Save Changes
                            </button>
                        </div>
                    </form>
                    {updatesuccess && <p className='text-green-600 font-semibold italic ml-14 -mt-7'>"Profile Updated Successfully"</p>}
                </div>
            </div>
    </div>  
  )
}

export default Userprofileedit