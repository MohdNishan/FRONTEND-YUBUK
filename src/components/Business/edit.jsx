import React, { useEffect, useState } from 'react'
import api from '../../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Businessedit = () => {

    const [businessdata, setbusinessdata] = useState({
        Business_Name: '',
        Email: '',
        Website: '',
        Opening_hours: '',
        Location: '',
        Image: '',
        Contact_Number: ''
    });
    
    const [updatesuccess, setupdatesuccess] = useState("");
    const [updatefail, setupdatefail] = useState("");
    const [profileData, setProfileData] = useState('')
    const { business_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchbusinessprofile()
    },[business_id])

    const fetchbusinessprofile = async () => {
        try {
            const response = await api.get(`/businessview/${business_id}`)
            setbusinessdata(response.data[0])
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchuserprofile()
    },[])

    const fetchuserprofile = async () => {
        try{
            const response = await api.get('/authme')
            setProfileData(response.data[0])
        } catch(error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.put(`/business/${business_id}`,businessdata)
            setupdatesuccess(response.data)
            setupdatefail("")
            console.log(response)
        } catch (error) {
            console.log({ message: 'Error', error_messge: error})
            setupdatesuccess("")
            setupdatefail(error.response.data)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setbusinessdata(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setImage(file)
    }

    const Backtoview = () => {
        navigate(`/business/view/${business_id}`)
    }


  return (
    <div className='bg-rose-50 w-full h-screen flex'>
        <div>
            <img src="/Images/unnamed.jpg" alt="" width="500px" className='rounded-r-3xl h-[500px] -ml-12 mt-20'/>
        </div>
        <div>
            <h1 className='font-semibold text-blue-950 text-xl mt-20 ml-10'>
                Business Edit
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
                                name='Business_Name'
                                value={businessdata.Business_Name || ''}
                                onChange={handleChange}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                        <div className='grid ml-16'>
                            <label className='font-semibold'>Email  </label>
                            <input 
                                type='email'
                                name='Email'
                                value={businessdata.Email || ''}
                                onChange={handleChange}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                    </div>
                    <div className='flex ml-10 mt-5 text-blue-950'>
                        <div className='grid'>
                            <label className='font-semibold'>Website  </label>
                            <input
                                type='text'
                                name='Website'
                                value={businessdata.Website || ''}
                                onChange={handleChange}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                        <div className='grid ml-16'>
                            <label className='font-semibold'>Operating Hours  </label>
                            <input 
                                type='text'
                                name='Opening_hours'
                                value={businessdata.Opening_hours || ''}
                                onChange={handleChange}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                    </div>
                    <div className='flex ml-10 mt-5 text-blue-950'>
                        <div className='grid'>
                            <label className='font-semibold'>Location  </label>
                            <input
                                type='text'
                                name='Location'
                                value={businessdata.Location || ''}
                                onChange={handleChange}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
                        </div>
                        <div className='grid ml-16'>
                            <label className='font-semibold'>Contact Number </label>
                            <input
                               type='text'
                               name='Contact_Number'
                               value={businessdata.Contact_Number || ''}
                               onChange={handleChange}
                                className='border-2 border-gray-400 rounded-lg h-10 w-80 p-3 mt-1'
                            />
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
                          <button type='submit' className='bg-blue-950 font-semibold text-sm h-9 w-36 text-white rounded-md hover:bg-sky-800 mt-1 '>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div> 
    </div>
  )
}

export default Businessedit