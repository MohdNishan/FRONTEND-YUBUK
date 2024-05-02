import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginSignout } from '../calendar';
import { ImProfile } from "react-icons/im";
import { FaAngleRight } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { IoBusiness } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const { profile_id } = useParams();
  const [profileData, setProfileData] = useState()  
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



  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get(`/businesses/${profile_id}`);
        setBusinesses(response.data);
      } catch (error) {
        console.error({message:'Error fetching businesses', error_message: error});
      } 
    };

    fetchBusinesses();
  },[profile_id]);


  const handlebusiness = () => {
    navigate(`/business/create/${profile_id}`)
  }

  const handleSignout = () => {
    navigate('/login')
  }

  const handleView = () => {
    navigate('/user/view')
}

const handleEdit = () => {
  navigate('/user/edit');
};

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
                <div className='mt-3 flex h-20'>
                    <FaUserEdit className='ml-6 mt-7 text-2xl'/> 
                    <a href="" onClick={handleEdit} className='ml-4 mt-7 font-normal text-lg font-serif'> Edit Profile</a>
                    <div className='size-16 bg-white rounded-full ml-16 mt-2'>
                    <FaAngleRight className='text-2xl mt-5 ml-7'/>
                    </div>
                </div>
                <div className=' mt-3 flex h-20 bg-gray-300 rounded-r-full'>
                    <IoBusiness className='ml-6 mt-7 text-2xl'/> 
                    <a href="" className='ml-5 mt-7 font-semibold text-lg font-serif'>My Business</a>
                    <div className='size-16 bg-white rounded-full ml-10 mt-2'>
                    <FaAngleRight className='text-2xl mt-5 ml-5'/>
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
                          My Business
                    </h1>
                    <hr className=' border-1 border-gray-400 mt-2 ml-8 w-32'/>
                    <div className='flex mt-10 ml-10'>
                        <img src={profileData?.DP} alt='DP' width="100px" className='rounded-full border-[6px] border-white'/>
                        <div className='ml-6 mt-7 text-blue-950 flex'>
                            <div>
                                {profileData && <p className='text-3xl font-serif font-semibold'>{profileData.Name}</p>}
                                {profileData && <p className='text-lg'>+91-{profileData.Mobile_Number}</p>}
                            </div>
                        </div>
                    </div>
                    <hr className='border-1 border-gray-400 w-[1020px] mt-10 ml-7'/>
                    <div className='ml-14 mt-8'>
                      {businesses.length === 0 && <p className='text-lg font-semibold text-blue-950'>"No Business Found"</p>}
                      
                        {businesses.map((business,i) => (
                          <div className=' text-blue-950 grid text-lg font-semibold pb-4' key={i}>
                            {business.Business_Name}
                            <div>
                              <button onClick={()=>navigate(`/business/view/${business.id}`)} className='bg-blue-950 text-white text-xs font-semibold h-5 w-16 rounded-full'>
                                View</button>
                            </div>
                            <hr className='border-1 border-gray-400 w-[980px] mt-4 '/>
                          </div> 
                        ))}
                        <div className='flex justify-end mr-20'>
                          <button onClick={handlebusiness} className='bg-blue-950 font-semibold text-sm h-9 w-36 text-white rounded-md hover:bg-sky-800 mt-1 '>Add Business</button>
                        </div>
                    </div>
          </div>
  </div>
  );    
};

export default BusinessList;
