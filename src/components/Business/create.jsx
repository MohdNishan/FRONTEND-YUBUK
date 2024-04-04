import React, { useState } from 'react'
import api from '../../api';
import { useParams } from 'react-router-dom';


const Businessprofile = () => {
    const { profile_id } = useParams();

    const [Business_Name, setBusinessName] = useState('');
    const [Email, setemail] = useState('');
    const [Website, setWebsite] = useState('');
    const [Opening_hours, setOpeninghours] = useState('');
    const [Location, setLocation] = useState('');
    const [Image, setImage] = useState('');
    const [Contact_Number, setContactnumber] = useState('');
    
    const [created, setcreated] = useState("");
    const [exist, setexist] = useState("");
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await api.post(
                '/business',
                { Business_Name,Email,Website,Opening_hours,Location,Image,Contact_Number,user_id:profile_id },
            )
            setcreated(response.data)
            setexist("")
            console.log(response)
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

  return (
    <div className='w-80'>
        <h1 className='text-2xl font-serif font-bold'>
            Create Business
        </h1>
        <form onSubmit={handleSubmit}>
            <div className='flex justify-between'>
            <label>Business Name : </label>
            <input 
                type='text'
                value={Business_Name}
                onChange={(event) => setBusinessName(event.target.value) }
                className='border-2 border-gray-500 mt-1 rounded-sm'
            />
            </div>
            <div className='flex justify-between'>
            <label>Email : </label>
            <input 
                type='email'
                value={Email}
                onChange={(event) => setemail(event.target.value)}
                className='border-2 border-gray-500 mt-1 rounded-sm'
            /> 
            </div>
            <div className='flex justify-between'>
            <label>Website : </label>
            <input 
                type='text'
                value={Website}
                onChange={(event) => setWebsite(event.target.value)}
                className='border-2 border-gray-500 mt-1 rounded-sm'
            />
            </div>
            <div className='flex justify-between'>
            <label>Operating Hours : </label>
            <input 
                type='text'
                value={Opening_hours}
                onChange={(event) => setOpeninghours(event.target.value)}
                className='border-2 border-gray-500 mt-1 rounded-sm'
            />
            </div>
            <div className='flex justify-between'>
            <label>Location : </label>
            <input 
                type='text'
                value={Location}
                onChange={(event) => setLocation(event.target.value)}
                className='border-2 border-gray-500 mt-1 rounded-sm'
            />
            </div>
            <div className='flex justify-between'>
            <label>Image : </label>
            <input 
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='w-52 mt-1'
            />
            </div>
            <div className='flex justify-between'>
            <label>Contact Number : </label>
            <input 
                type='text'
                value={Contact_Number}
                onChange={(event) => setContactnumber(event.target.value)}
                className='border-2 border-gray-50 rounded-sm mt-1'
            />
            </div>
            <button className='bg-purple-800 rounded-md text-white h-7 w-20 mt-1'>Submit</button>
        </form>
        {created && <p className='text-green-800 italic'>{created}</p>}
        {exist && <p className='text-red-700 italic'>{exist}</p>}
    </div>
    )
}

export default Businessprofile 