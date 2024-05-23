import React, { useEffect, useState } from 'react'
import api from '../../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { LuClock10 } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";


const Businessprofile = () => {
    const { profile_id } = useParams();
    const [profileData, setProfileData] = useState('')
    const [Business_Name, setBusinessName] = useState('');
    const [Email, setemail] = useState('');
    const [Website, setWebsite] = useState('');
    const [Opening_hours, setOpeninghours] = useState('');
    const [Location, setLocation] = useState('');
    const [Image, setImage] = useState('');
    const [Contact_Number, setContactnumber] = useState('');
    
    const [created, setcreated] = useState("");
    const [exist, setexist] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try{
                const response = await api.get('/authme');
                if(!response.data.message){
                    setProfileData(response.data[0])
                }
                console.log(response)
            } catch (error) {
                setError(error.message)
            }
        };
        fetchUserProfile();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const formData = new FormData();
            formData.append('Business_Name', Business_Name)
            formData.append('Email', Email)
            formData.append('Website', Website)
            formData.append('Opening_hours', Opening_hours)
            formData.append('Location', Location)
            formData.append('Image', Image)
            formData.append('Contact_Number', Contact_Number)
            formData.append('user_id', profile_id)

            const response = await api.post('/business',formData,
            {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }
            );
            setcreated(response.data)
            setexist("")
            console.log(response)
            navigate(`/business/list/${profile_id}`)
        } catch (error) {
            setexist(error.response.data)
            setcreated("")
            console.log({ message : 'Error', error_message : error })
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setImage(file)
    }

    // const handlesuccess = () => {
    //     navigate(`/business/list/${profile_id}`)
    // }

  return (
    <div className='bg-rose-50 w-full h-full flex'>
        <div>
            <img src="/Images/unnamed.jpg" alt="" width="500px" className='rounded-r-3xl h-[500px] -ml-12 mt-20'/>
        </div>
        <div>
            <h1 className='font-semibold text-blue-950 text-xl mt-20 ml-10'>
                Add Business
            </h1>
            <hr className='border-1 border-gray-400 w-[900px] mt-3 '/>
            <div className='flex mt-7 ml-10'>
                <img src={profileData?.DP} alt='DP' width="100px" className='rounded-full border-[6px] border-white'/>
                <div className='ml-6 mt-7 text-blue-950 flex'>
                    <div>
                        {profileData && <p className='text-3xl font-serif font-semibold'>{profileData.Name}</p>}
                        {profileData && <p className='text-lg'>+91-{profileData.Mobile_Number}</p>}
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='flex ml-10 mt-9 text-blue-950'>
                        <div className='grid'>
                            <label className='font-semibold'>Business Name  </label>
                            <input
                                type='text'
                                value={Business_Name}
                                onChange={(event) => setBusinessName(event.target.value)}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                        <div className='grid ml-16'>
                            <label className='font-semibold'>Email  </label>
                            <div className='relative'>
                                <input 
                                    type='email'
                                    value={Email}
                                    onChange={(event) => setemail(event.target.value)}
                                    className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1 pl-9'
                                />
                                <MdEmail className="absolute left-2 top-3 text-gray-400 pointer-events-none size-6" />
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-10 mt-5 text-blue-950'>
                        <div className='grid'>
                            <label className='font-semibold'>Website  </label>
                            <input
                                type='text'
                                value={Website}
                                onChange={(event) => setWebsite(event.target.value)}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                        <div className='grid ml-16'>
                            <label className='font-semibold'>Operating Hours  </label>
                            <div className='relative'>
                                <input 
                                    type='text'
                                    value={Opening_hours}
                                    onChange={(event) => setOpeninghours(event.target.value)}
                                    className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1 pl-8'
                                />
                                <LuClock10 className="absolute left-2 top-4 text-gray-500 pointer-events-none size-5" />
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-10 mt-5 text-blue-950'>
                        <div className='grid'>
                            <label className='font-semibold'>Location  </label>
                            <div className='relative'>
                                <input
                                    type='text'
                                    value={Location}
                                    onChange={(event) => setLocation(event.target.value)}
                                    className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1 pl-7'
                                />
                                <FaLocationDot className="absolute left-2 top-3 text-gray-500 pointer-events-none size-5"/>
                            </div>
                        </div>
                        <div className='grid ml-16'>
                            <label className='font-semibold'>Contact Number </label>
                            <div className='relative'>
                                <input
                                   type='text'
                                   value={Contact_Number}
                                   onChange={(event) => setContactnumber(event.target.value)} 
                                    className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1 pl-9'
                                />
                                <FaPhone className="absolute left-3 top-4 text-gray-500 pointer-events-none size-5"/>
                            </div>
                        </div>
                    </div>
                    <div className='grid ml-10 mt-5 text-blue-950'>
                    <label className='font-semibold'>Image : </label>
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
                {/* {created && <p className='text-green-800 italic'>{created}</p>}
                {exist && <p className='text-red-700 italic'>{exist}</p>} */}
            </div>
        </div>
    </div>
    )
}

export default Businessprofile 