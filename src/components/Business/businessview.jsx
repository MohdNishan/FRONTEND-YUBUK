import React, { useEffect, useState } from 'react'
import api from '../../api'
import { useNavigate, useParams } from 'react-router-dom';

const Profileview = () => {
    const [businessdata, setbusinessdata] = useState();
    const { business_id } = useParams();
    const [profileData, setProfileData] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile()
    },[])

    useEffect(() => {
        fetchbusinessprofile()
    },[])

    const fetchUserProfile = async () => {
        try{
            const response = await api.get(`/authme`)
            if(!response.data.message){
                setProfileData(response.data[0])
            }
        } catch (error)   {
           setError(error.message)
        }
    }

    const fetchbusinessprofile = async () => {
        try {
            const response = await api.get(`/businessview/${business_id}`);  
            if(!response.data.message){
                setbusinessdata(response.data[0]);
                console.log(response.data)
            }
            console.log(response.data[0].id);
        } catch (error) {
            console.error(error);
        }
    }


    const handleDelete = async (event) => {
        event.preventDefault()
        try {
            const response = await api.delete(`/business/${business_id}`)
            if(response.status === 200){
            alert('Business Deleted Successfully')
            navigate(`/business/list/${response.data.user_id}`)    
            console.log(response)
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    const handleEdit = () => {
        navigate(`/business/edit/${business_id}`)
    }


  return (
    <div className='bg-rose-50 w-full h-screen flex'>
        <div>
            <img src="/Images/unnamed.jpg" alt="" width="500px" className='rounded-r-3xl h-[500px] -ml-12 mt-20'/>
        </div>
        <div>
            <h1 className='font-semibold text-blue-950 text-xl mt-20 ml-10'>
                Business Profile
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
            <hr className='border-1 border-gray-400 w-[900px] mt-7 '/>
            <div className='ml-14 mt-10'>
                <table className='text-sm font-semibold text-blue-950'>
                    <tbody>
                        <tr>
                            <td>Business Name</td>
                            <td className='font-extrabold profile-td'>:</td>
                            <td className='profile-td'>{businessdata?.Business_Name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td className='font-extrabold profile-td'>:</td>
                            <td className='profile-td'>{businessdata?.Email}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td className='font-extrabold profile-td'>:</td>
                            <td className='profile-td'>{businessdata?.Website}</td>
                        </tr>
                        <tr>
                            <td>Opening Hours</td>
                            <td className='font-extrabold profile-td'>:</td>
                            <td className='profile-td'>{businessdata?.Opening_hours}</td>
                        </tr>
                        <tr>
                            <td>Location</td>
                            <td className='font-extrabold profile-td'>:</td>
                            <td className='profile-td'>{businessdata?.Location}</td>
                        </tr>
                        <tr>
                            <td>Contact Number</td>
                            <td className='font-extrabold profile-td'>:</td>
                            <td className='profile-td'>{businessdata?.Contact_Number}</td>
                        </tr>
                        <tr>
                            <td>Image</td>
                            <td className='font-extrabold profile-td'>:</td>
                            <td className='profile-td'>{businessdata?.Image}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleEdit} className=' bg-blue-950 text-white text-sm h-8 w-32 font-semibold rounded-lg mt-5'>Edit Business</button>
            </div>
        </div>
    </div>
  )
}

export default Profileview